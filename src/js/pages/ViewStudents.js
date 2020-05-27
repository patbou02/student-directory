import AddStudentModal from "../components/AddStudentModal";
import firebaseInstance from "../../../firebase_config";
import StudentCard from "../components/StudentCard";

const ViewStudents = () => {

  const directoryContainerHTML = () => {
    return `
      <div class="container directory-container mt-5">
        <h2>Student Directory</h2>
        <div class="row mb-3">
          <div class="col-12">
            <a href="#" id="add-student" data-target="#directory-new-student-modal" data-toggle="modal">Add student +</a>
            <input type="text" class="form-control directory-search-input mt-3" placeholder="Search by name" />
          </div>
        </div>
        <div class="directory-contents"></div><!--/ .directory-contents -->
  
        <nav class="row directory-pagination">
          <ul class="pagination col-4 offset-4">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item active"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul><!--/ .pagination -->
        </nav><!--/ .directory-pagination -->
      </div><!--/ .directory-container -->
    `;
  };

  document.querySelector('#app').innerHTML = directoryContainerHTML();

  document.querySelector('#add-student').addEventListener('click', (e) => {
    e.preventDefault();
    AddStudentModal();
  });

  const chunkCardsArray = (arr, size) => {
    let chunkedHTML = '';
    const chunked_arr = [];
    for (let i = 0; i <= arr.length; i++) {
      const last = chunked_arr[chunked_arr.length - 1];
      if (i === 0) {
        chunkedHTML += `<div class="row row-outer mb-3">`;
      } else if (i % size === 0) {
        chunkedHTML += `</div></div><div class="row row-outer mb-3">`;
      }
      if (!last || last.length === size) {
        chunked_arr.push([arr[i]]);
        chunkedHTML += `<div class="col-lg-${Math.floor(12 / size)}">${arr[i]}`;
        chunkedHTML += ((i + 1) % size === 0) ? '</div></div>' : '</div>';
      } else {
        if (i < arr.length) {
          last.push(arr[i]);
          chunkedHTML += `<div class="col-lg-${Math.floor(12 / size)}">${arr[i]}`;
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