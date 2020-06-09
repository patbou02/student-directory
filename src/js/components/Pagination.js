import Utilities from "./Utilities";

const Pagination = (filter = false, totalSize, filterBy, arr) => {

  const paginationHTML = (totalSize , filterBySize) => {

    // Calculate number of pages for pagination
    let pages = (totalSize % filterBySize !== 0) ? Math.ceil(totalSize / filterBySize) : Math.floor(totalSize / filterBySize);

    let paginationHTML = '<ul class="pagination">';
    for (let i = 0; i < pages; i++) {
      paginationHTML += `<li class="page-item ${(i === 0) ? 'active': ''}"><a href="#" id="${i}" class="page-link">${i + 1}</a></li>`;
    }
    paginationHTML += '</ul><!--/ .pagination -->';

    return paginationHTML;
  }

  if (filter) {
    document.querySelector('.directory-pagination').innerHTML = paginationHTML(totalSize, filterBy);
  }

  // Resource found here: https://gomakethings.com/how-to-get-all-of-an-elements-siblings-with-vanilla-js/
  const getSiblings = (elem) => {

    // Setup siblings array and get first sibling
    let siblings = [];
    let sibling  = elem.parentNode.firstChild;

    // Loop through each sibling and push to array
    while (sibling) {
      if (sibling.nodeType  === 1 && sibling !== elem) {
        siblings.push(sibling);
      }
      sibling = sibling.nextSibling;
    }
    return siblings;
  };

  document.querySelectorAll('.page-link').forEach((paginationLink) => {
    paginationLink.addEventListener('click', (e) => {
      e.preventDefault();
      let paginationItems = getSiblings(e.target.parentElement);
      // Remove 'active' class from any sibling
      paginationItems.forEach((item) => {
        if (item.classList.contains('active')) {
          item.classList.remove('active');
        }
      });
      // Add 'active' to clicked pagination link
      e.target.parentElement.classList.add('active');

      document.querySelector('.directory-list').innerHTML = Utilities('build', arr[e.target.id]);
    });
  });

};

export default Pagination;