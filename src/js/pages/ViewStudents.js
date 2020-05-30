import AddStudentModal from "../components/AddStudentModal";
import firebaseInstance from "../../../firebase_config";
import StudentCard from "../components/StudentCard";

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
        
        <ul class="directory-list"></ul><!--/ .directory-list -->
  
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

  const buildListOfCards = (arr, size) => {
    let listHTML = '';
    let listClasses = ` row row-outer mb-3 row-cols-${size/size} row-cols-sm-${size - (size/2)} row-cols-md-${size - (size/size)} row-cols-lg-${size}`;
    for (let i = 0; i < arr.length; i++) {
      listHTML += `<li class="col">${arr[i]}</li>`;
    }
    return [listHTML, listClasses];
  };

  // set READ/GET operation to get existing Students from the 'students' table
  firebaseInstance.ref('students').on('value', (results) => {
    const resultsObj = results.val();

    let studentsList = [];
    const studentsListElem = document.querySelector('.directory-list');

    // Loop thru list of Objects
    for (let key in resultsObj) {
      // Populate array with HTML for every single student card
      studentsList.push(StudentCard(resultsObj[key], key));
    }

    studentsListElem.className += buildListOfCards(studentsList, 4)[1];
    studentsListElem.innerHTML = buildListOfCards(studentsList, 4)[0];

  });
};

export default ViewStudents;