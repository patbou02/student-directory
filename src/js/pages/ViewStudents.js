import AddStudentModal from "../components/AddStudentModal";
import firebaseInstance from "../../../firebase_config";
import StudentCard from "../components/StudentCard";
import Pagination from "../components/Pagination";

const ViewStudents = () => {

  const directoryWrapperHTML = () => {
    return `
      <div class="container directory-wrapper mt-5">
        <header class="directory-header mb-3">
          <div class="row row-cols-1">
            <div class="col">
              <h2>Student Directory</h2>
              <a href="#" id="add-student" data-target="#directory-new-student-modal" data-toggle="modal">Add student +</a>
              <div class="input-group mt-3 row no-gutters">
                <div class="input-group-prepend col-9">
                  <input type="text" class="form-control directory-search-input" placeholder="Search by name" />
                </div>
                <select class="custom-select filter-select dropdown-menu" aria-label="Select to filter by">
                  <option class="dropdown-item" selected>Filter by</option>
                  <option class="dropdown-item" value="3">3</option>
                  <option class="dropdown-item" value="5">5</option>
                  <option class="dropdown-item" value="8">8</option>
                </select>
              </div>
            </div>
          </div>
        </header><!--/ .directory-header -->
        
        <main class="directory-list"></main><!--/ .directory-list -->
  
        <nav class="directory-pagination mt-4 mb-5" aria-label="Page Navigation"></nav><!--/ .directory-pagination -->
      </div><!--/ .directory-wrapper -->
    `;
  };

  document.querySelector('#app').innerHTML = directoryWrapperHTML();

  document.querySelector('#add-student').addEventListener('click', (e) => {
    e.preventDefault();
    AddStudentModal();
  });

  // Event Delegation
  document.addEventListener('click', (e) => {
    // Edit button clicks
    if (e.target.hash === '#/edit') {
      // 1. store student ID in localStorage
      window.localStorage.setItem('studentKey', e.target.id);
      // 2. reset hash to /edit and trigger 'hashchange' event handler
      window.location.hash = '/edit';
    }

    // Delete button clicks
    if (e.target.classList.contains('btn-delete')) {
      e.preventDefault();
      let studentId = e.target.id;

      // DELETE operation on single record
      firebaseInstance.ref('students')
      .child(studentId)
      .remove()
      .catch(() => {
        // On failed DELETE operation
        console.error('Error deleting student.');
      });
    }
  });

  const buildListOfCards = (arr, size) => {
    let listHTML = '';
    let listClasses = `row row-outer mb-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5`;
    for (let i = 0; i < arr.length; i++) {
      listHTML += (i === 0) ? `<ul class="${listClasses}">` : '';
      listHTML += `<li class="col">${arr[i]}</li>`;
      listHTML += (i === (arr.length - 1)) ? '</ul>' : '';
    }
    return listHTML;
  };

  // set READ/GET operation to get existing Students from the 'students' table
  firebaseInstance.ref('students').on('value', (results) => {
    const resultsObj = results.val();

    let studentsList = [];

    // Loop thru list of Objects
    for (let key in resultsObj) {
      // Populate array with HTML for every single student card
      studentsList.push(StudentCard(resultsObj[key], key));
    }

    // Build list for initial page load (no pagination needed)
    document.querySelector('.directory-list').innerHTML = buildListOfCards(studentsList, 0);

    // Listen for select list change event and update list of cards and pagination accordingly
    document.querySelector('.filter-select').addEventListener('change', (e) => {

      document.querySelector('.directory-list').innerHTML = buildListOfCards(studentsList, e.target.value);

      Pagination(Object.keys(resultsObj).length, true, e.target.value);
    });
  });
};

export default ViewStudents;