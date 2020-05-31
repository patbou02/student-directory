const Pagination = (size, filter = false, filterBy) => {

  const paginationHTML = (totalSize , filterBySize) => {

    console.log(totalSize, '<= total size');
    console.log(filterBySize, '<= filter by');
    console.log(totalSize % filterBySize, '<= modulo is');

    let pages = (totalSize % filterBySize !== 0)
      ? (Math.floor(totalSize / filterBySize) + 1)
      : Math.floor(totalSize / filterBySize);

    let paginationHTML = '<ul class="pagination">';
    for (let i = 0; i < pages; i++) {
      paginationHTML += `<li class="page-item"><a href="#" class="page-link">${i + 1}</a></li>`;
    }
    paginationHTML += '</ul><!--/ .pagination -->';

    /*
      <ul class="pagination col-4 offset-4">
        <li class="page-item"><a class="page-link" aria-label="Previous" href="#"><span aria-hidden="true">&laquo;</span></a></li>
        <li class="page-item active"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" aria-label="Next" href="#"><span aria-hidden="true">&raquo;</span></a></li>
      </ul><!--/ .pagination -->
    * */

    return paginationHTML;
  }

  if (filter) {
    document.querySelector('.directory-pagination').innerHTML = paginationHTML(size, filterBy);
  }

};

export default Pagination;