const Utilities = (utility, arr, size) => {

  const build = (arr) => {
    let listHTML = '';
    let listClasses = 'row row-outer mb-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5';

    for (let i = 0; i < arr.length; i++) {
      listHTML += (i === 0) ? `<ul class="${listClasses}">` : '';
      listHTML += `<li class="col">${arr[i]}</li>`;
      listHTML += (i === (arr.length - 1)) ? '</ul>' : '';
    }
    return listHTML;
  };

  const chunk = (arr, size) => {
    let chunked_arr = [];
    if (size !== 0) {
      for (let i = 0; i < arr.length; i++) {
        const last = chunked_arr[chunked_arr.length - 1];
        if (!last || last.length === size) {
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

  let utilityResult;

  switch (utility) {
    case 'build':
      utilityResult = build(arr);
      break;
    case 'chunk':
      utilityResult = chunk(arr, size);
      break;
  }

  return utilityResult;

};

export default Utilities;