export const getLastNItems = (arr: any[], n: number) => {
  if (!arr) return arr;

  console.log(n);
  if (n >= arr.length) {
    return arr.slice(); // Return a copy of the whole array.
  }
  return arr.slice(arr.length - n);
};
