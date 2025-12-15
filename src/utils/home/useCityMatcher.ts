import { useCallback, useMemo } from 'react';
import { useGetGovArEn } from '@/hooks/useGetGovArEn'; // Keep your path

// --- 1. Stronger Normalization for Egyptian Names ---
const normalizeText = (text: string): string => {
  if (!text) return "";
  
  return text
    .toLowerCase()
    // Remove Gov/City words
    .replace(/(?:governorate|city|محافظة|مدينة|center|مركز|قسم)/gi, "")
    
    // REMOVE Egyptian Articles (The Magic Fix)
    // Converts "Kafr Ash Sheyakh" -> "Kafr Sheyakh"
    // Converts "Kafr El Sheikh" -> "Kafr Sheikh"
    .replace(/\b(el|al|ash|ad|az|as|at|an|ar)\s+/g, "") 
    
    // Common mappings
    .replace(/kh/g, "k") 
    .replace(/iy/g, "i")
    
    // Arabic Normalization
    .replace(/[أإآ]/g, "ا") 
    .replace(/ة$/g, "ه")    
    .replace(/[ىي]$/g, "ي") 
    .trim();
};

const levenshteinDistance = (a: string, b: string): number => {
  const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
};

export const useCityMatcher = () => {
  const locationsEn = useGetGovArEn("en");
  const locationsAr = useGetGovArEn("ar");

  // Combine lists
  const allCandidates = useMemo(() => {
    return [...(locationsEn || []), ...(locationsAr || [])];
  }, [locationsEn, locationsAr]);

  const findClosestMatch = useCallback((targetCity: string): string | null => {
    if (!targetCity || allCandidates.length === 0) return null;

    const normalizedTarget = normalizeText(targetCity);
    
    // --- 2. Dynamic Tolerance ---
    // Allow more typos for longer words
    // "Kafr Sheikh" (11 chars) -> Allows ~4 typos
    // "Qena" (4 chars) -> Allows 2 typos
    const allowedDistance = Math.max(2, Math.floor(normalizedTarget.length * 0.4));

    let bestMatch: string | null = null;
    let lowestDistance = Infinity;

    for (const city of allCandidates) {
      const normalizedCity = normalizeText(city);

      // Exact match check
      if (normalizedCity === normalizedTarget) return city;

      const distance = levenshteinDistance(normalizedTarget, normalizedCity);

      if (distance < lowestDistance) {
        lowestDistance = distance;
        bestMatch = city;
      }
    }

    // DEBUGGING: Uncomment this to see why it fails/succeeds in your console
    // console.log(`Checking: ${normalizedTarget} | Found: ${bestMatch} | Dist: ${lowestDistance} | Allowed: ${allowedDistance}`);

    return lowestDistance <= allowedDistance ? bestMatch : null;
  }, [allCandidates]);

  return { findClosestMatch };
};