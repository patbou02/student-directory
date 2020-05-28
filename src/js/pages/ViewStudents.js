import AddStudentModal from "../components/AddStudentModal";
import firebaseInstance from "../../../firebase_config";
import StudentCard from "../components/StudentCard";
import EditStudent from "./EditStudent";

const ViewStudents = () => {

  const directoryWrapperHTML = () => {
    return `
      <div class="container directory-wrapper mt-5">
        <header class="directory-header mb-3">
          <div class="row row-cols-1">
            <div class="col">
              <h2>Student Directory</h2>
              <a href="#" id="add-student" data-target="#directory-new-student-modal" data-toggle="modal">Add student +</a>
              <input type="text" class="form-control directory-search-input mt-3" placeholder="Search by name" />
            </div>
          </div>
        </header><!--/ .directory-header -->
        
        <div class="directory-contents"></div><!--/ .directory-contents -->
  
        <footer class="directory-pagination row mt-4 mb-5">
          <nav class="pagination col-4 offset-4">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item active"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </nav><!--/ .pagination -->
        </footer><!--/ .directory-pagination -->
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
  });

  const chunkCardsArray = (arr, size) => {
    let chunkedHTML = '';
    let rowClasses = `row row-outer mb-3 row-cols-${size/size} row-cols-sm-${size - (size/2)} row-cols-md-${size - (size/size)} row-cols-lg-${size}`;
    const chunked_arr = [];
    for (let i = 0; i <= arr.length; i++) {
      const last = chunked_arr[chunked_arr.length - 1];
      if (i === 0) {
        chunkedHTML += `<div class="${rowClasses}">`;
      } else if (i % size === 0) {
        chunkedHTML += `</div></div><div class="${rowClasses}">`;
      }
      if (!last || last.length === size) {
        chunked_arr.push([arr[i]]);
        chunkedHTML += `<div class="col">${arr[i]}`;
        chunkedHTML += ((i + 1) % size === 0) ? '</div></div>' : '</div>';
      } else {
        if (i < arr.length) {
          last.push(arr[i]);
          chunkedHTML += `<div class="col">${arr[i]}`;
        }
        chunkedHTML += ((i + 1) % size === 0) ? '</div></div>' : '</div>';
      }
    }
    return chunkedHTML;
  };

  // set READ/GET operation to get existing Students from the 'students' table
  firebaseInstance.ref('students').on('value', (results) => {
    const resultsObj = results.val();

    let listOfStudents = [];

    // Loop thru list of Objects
    for (let key in resultsObj) {
      // Populate array with HTML for every single student card
      listOfStudents.push(StudentCard(resultsObj[key], key));
    }

    document.querySelector('.directory-contents').innerHTML = chunkCardsArray(listOfStudents, 4);

  });
};

export default ViewStudents;