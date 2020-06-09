const ChunkLists = (arr, chunks) => {
  let chunked_arr = [];
  if (chunks !== 0) {
    for (let i = 0; i < arr.length; i++) {
      const last = chunked_arr[chunked_arr.length - 1];
      if (!last || last.length === chunks) {
        chunked_arr.push([arr[i]]);
      } else {
        if (i < arr.length) {
          last.push(arr[i]);
        }
      }
    }
  } else {
    chunked_arr = arr;
  }

  return chunked_arr;
};

export default ChunkLists;