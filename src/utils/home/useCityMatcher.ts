import { useCallback, useMemo } from 'react';
// Import your existing hook here
import { useGetGovArEn } from '@/hooks/useGetGovArEn'; 

// --- Helper Functions (Keep these outside the hook for performance) ---

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

const normalizeText = (text: string): string => {
  if (!text) return "";
  return text
    .toLowerCase()
    // Remove labels (English & Arabic)
    .replace(/(?:governorate|city|محافظة|مدينة|center|مركز|قسم)/gi, "")
    // Arabic Normalization
    .replace(/[أإآ]/g, "ا")  // Alef
    .replace(/ة$/g, "ه")     // Taa Marbuta
    .replace(/[ىي]$/g, "ي")  // Yaa
    .trim();
};

// --- The Main Hook ---

export const useCityMatcher = () => {
  // 1. Get the data automatically inside the hook
  const locationsEn = useGetGovArEn("en");
  const locationsAr = useGetGovArEn("ar");

  // 2. Combine the lists once (memoized for performance)
  const allCandidates = useMemo(() => {
    return [...(locationsEn || []), ...(locationsAr || [])];
  }, [locationsEn, locationsAr]);

  // 3. Create the search function
  const findClosestMatch = useCallback((targetCity: string): string | null => {
    if (!targetCity) return null;

    const normalizedTarget = normalizeText(targetCity);
    const MAX_ALLOWED_DISTANCE = 3; 

    let bestMatch: string | null = null;
    let lowestDistance = Infinity;

    for (const city of allCandidates) {
      const normalizedCity = normalizeText(city);

      // Exact match - return immediately
      if (normalizedCity === normalizedTarget) {
        return city;
      }

      const distance = levenshteinDistance(normalizedTarget, normalizedCity);

      if (distance < lowestDistance) {
        lowestDistance = distance;
        bestMatch = city;
      }
    }

    return lowestDistance <= MAX_ALLOWED_DISTANCE ? bestMatch : null;
  }, [allCandidates]);

  // Return the function to the component
  return { findClosestMatch };
};