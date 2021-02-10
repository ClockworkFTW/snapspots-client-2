// Pause execution for desired ms
export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Chunk array to desired size
export const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
