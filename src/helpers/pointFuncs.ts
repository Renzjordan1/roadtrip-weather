// Returns array of every X item in array
export const evenlySpacedPoints = (array: any[], n) => {
    const arrayLength = array.length;

    if (arrayLength <= n) {
      return [array[0], array[arrayLength - 1]]
    }
  
    const indices: any[] = [];
    for (let i = 0; i < n; i++) {
      const index = Math.round((arrayLength - 1) * i / (n-1));
      indices.push(array[index]);
    }

    return indices;
}