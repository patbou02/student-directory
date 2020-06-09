import firebaseInstance from "../../../firebase_config";
import StudentCard from "./StudentCard";
import Pagination from "./Pagination";
import Utilities from "./Utilities";

const Search = () => {

  const searchHTML = () => {
    return `
      <div class="input-group-prepend col-9">
        <input type="text" class="form-control directory-search-input" placeholder="Search by name" />
      </div>
      <select class="custom-select filter-select dropdown-menu col-3" aria-label="Select to filter by">
        <option class="dropdown-item" selected>Filter by</option>
        <option class="dropdown-item" value="5">5</option>
        <option class="dropdown-item" value="10">10</option>
        <option class="dropdown-item" value="25">25</option>
      </select>
    `;
  };

  document.querySelector('.directory-search').innerHTML = searchHTML();

  const handleSearch = (e) => {
    // 1. Grab user entered text in search input field
    const searchValue = e.target.value;

    const matchesObj = {};

    // 2. Create regex from this dynamically generated variable
    const searchRegex = new RegExp(searchValue, 'gi');

    // 3. Set READ/GET operation to gex existing Students from the 'students' table
    firebaseInstance.ref('students').on('value', (results) => {
      const resultsObj = results.val();

      // 4. Initialize array to store matches
      let searchMatches = [];

      // Loop thru list of Objects
      for (let key in resultsObj) {

        // 5. If search term (regex) matches either firstName or lastName values
        if (resultsObj[key].firstName.match(searchRegex) || resultsObj[key].lastName.match(searchRegex)) {
          // 6. Store matched Student card HTML using StudentCard() into variable
          let matchedStudent = StudentCard(resultsObj[key], key);

          // 7. Push card HTML into array of matches
          searchMatches.push(matchedStudent);

          matchesObj[key] = resultsObj[key];
        }
      }

      // 8. Rebuild directory list with BuildLists() using array or matched results
      document.querySelector('.directory-list').innerHTML = Utilities('build', searchMatches);

      document.querySelector('.filter-select').addEventListener('change', (e) => {
        let chunkedSearchMatches = Utilities('chunk', searchMatches, parseInt(e.target.value));

        // Update list container with first index of chunked list
        document.querySelector('.directory-list').innerHTML = Utilities('build', chunkedSearchMatches[0]);

        // Update pagination
        Pagination(true, Object.keys(matchesObj).length, parseInt(e.target.value), chunkedSearchMatches);
      });
    });

    return matchesObj;
  };

  // Use oninput GlobalEventHandlers as seen in and call handleSearch()
  // https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/oninput
  document.querySelector('.directory-search-input').oninput = handleSearch;
};

export default Search;