import AddStudentModal from "../components/AddStudentModal";
import firebaseInstance from "../../../firebase_config";
import StudentCard from "../components/StudentCard";
import Pagination from "../components/Pagination";
import BuildLists from "../components/BuildLists";
import ChunkLists from "../components/ChunkLists";
import Search from "../components/Search";

const ViewStudents = () => {

  const directoryWrapperHTML = () => {
    return `
      <div class="container directory-wrapper mt-5">
        <header class="directory-header mb-3">
          <div class="row row-cols-1">
            <div class="col">
              <h2>Student Directory</h2>
              <a href="#" id="add-student" data-target="#directory-new-student-modal" data-toggle="modal">Add student +</a>
              <div class="directory-search input-group mt-3 row no-gutters"></div><!--/ .directory-search -->
            </div>
          </div>
        </header><!--/ .directory-header -->
        
        <main class="directory-list"></main><!--/ .directory-list -->
  
        <nav class="directory-pagination mt-4 mb-5" aria-label="Page Navigation"></nav><!--/ .directory-pagination -->
      </div><!--/ .directory-wrapper -->
    `;
  };

  document.querySelector('#app').innerHTML = directoryWrapperHTML();

  // Call search component
  Search();

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

  // set READ/GET operation to get existing Students from the 'students' table
  firebaseInstance.ref('students').on('value', (results) => {
    const resultsObj = results.val();

    let primaryListOfStudents = [];

    // Loop thru list of Objects
    for (let key in resultsObj) {
      // Populate array with HTML for every single student card
      primaryListOfStudents.push(StudentCard(resultsObj[key], key));
    }

    // 1. Build list for initial page load (no pagination needed)
    document.querySelector('.directory-list').innerHTML = BuildLists(primaryListOfStudents);

    // Listen for select list change event in order to chunk list and update pagination accordingly
    document.querySelector('.filter-select').addEventListener('change', (e) => {

      let chunkedListOfStudents = ChunkLists(primaryListOfStudents, parseInt(e.target.value));

      // Update list container with first index of chunked list
      document.querySelector('.directory-list').innerHTML = BuildLists(chunkedListOfStudents[0]);

      // Update pagination
      Pagination(true, Object.keys(resultsObj).length, parseInt(e.target.value), chunkedListOfStudents);
    });
  });
};

export default ViewStudents;