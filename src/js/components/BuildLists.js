const BuildLists = (arr) => {

    let listHTML = '';
    let listClasses = 'row row-outer mb-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5';

    for (let i = 0; i < arr.length; i++) {
      listHTML += (i === 0) ? `<ul class="${listClasses}">` : '';
      listHTML += `<li class="col">${arr[i]}</li>`;
      listHTML += (i === (arr.length - 1)) ? '</ul>' : '';
    }
    return listHTML;

};

export  default BuildLists;