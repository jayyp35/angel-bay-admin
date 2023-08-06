export function getAllSubstrings(str) {
  const substrings = [];

  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      const substring = str.slice(i, j);
      if (substring !== "") {
        // @ts-ignore
        substrings.push(substring?.toLowerCase());
      }
    }
  }

  return substrings;
}
