// utils/findClosestCity.js

// 1. A standard Levenshtein distance algorithm
// Returns the number of edits (insertions, deletions, substitutions) needed to turn 'a' into 'b'
const levenshteinDistance = (a:string, b:string) => {
  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1,   // insertion
            matrix[i - 1][j] + 1    // deletion
          )
        );
      }
    }
  }

  return matrix[b.length][a.length];
};

// 2. The main function to export
export const findClosestCity = (targetCity:string, cityList:string[]) => {
  if (!targetCity || !cityList || cityList.length === 0) return null;

  // Normalize the input (remove "Governorate", "City", lowercase, etc.)
  // This is crucial for Egypt (e.g., "Cairo Governorate" -> "cairo")
  const normalize = (str:string) => 
    str.toLowerCase()
       .replace('governorate', '')
       .replace('city', '')
       .trim();

  const normalizedTarget = normalize(targetCity);
  
  let bestMatch = null;
  let lowestDistance = Infinity;

  cityList.forEach((city) => {
    // We assume 'city' is a string. If it's an object, use city.name
    const normalizedCityName = normalize(city );
    
    const distance = levenshteinDistance(normalizedTarget, normalizedCityName);

    // Track the lowest edit distance found so far
    if (distance < lowestDistance) {
      lowestDistance = distance;
      bestMatch = city;
    }
  });

  return bestMatch;
};