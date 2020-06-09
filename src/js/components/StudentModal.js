import firebaseInstance from "../../../firebase_config";
import $ from 'jquery';

const StudentModal = () => {

  const modalHTML = () => {
    return `
      <form class="modal fade" id="directory-new-student-modal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add Student</h5>
              <button type="button" class="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <label for="first-name" class="font-weight-bold new-student-titles mb-0">First Name</label>
              <input id="first-name" name="first-name" type="text" class="form-control new-student-inputs mt-0" />
              <label for="last-name" class="font-weight-bold new-student-titles mb-0 mt-3">Last Name</label>
              <input id="last-name" name="last-name" type="text" class="form-control new-student-inputs mt-0" />
              <label for="email" class="font-weight-bold new-student-titles mb-0 mt-3">Email</label>
              <input id="email" name="email" type="email" class="form-control new-student-inputs mt-0" />
              <label for="avatar-link" class="font-weight-bold new-student-titles mb-0 mt-3">Avatar Link</label>
              <input id="avatar-link" name="avatar-link" type="text" class="form-control new-student-inputs mt-0" />
              <label for="city" class="font-weight-bold new-student-titles mb-0 mt-3">City</label>
              <input id="city" name="city" type="text" class="form-control new-student-inputs mt-0" />
              <label for="state" class="font-weight-bold new-student-titles mb-0 mt-3">State</label>
              <input id="state" name="state" type="text" class="form-control new-student-inputs mt-0" />
            </div>
            <div class="modal-footer">
              <a type="button" class="btn btn-secondary" data-dismiss="modal">Close</a>
              <button id="save-student" type="submit" class="btn btn-primary">Save Student</button>
            </div>
          </div>
        </div>
      </form><!--/ #directory-new-student-modal -->
    `;
  };

  document.querySelector('#app').innerHTML += modalHTML();

  const newStudentModal = document.querySelector('#directory-new-student-modal');

  newStudentModal.addEventListener('submit', (e) => {
    e.preventDefault();

    const newStudent = {
      firstName : document.querySelector('#first-name').value,
      lastName  : document.querySelector('#last-name').value,
      email     : document.querySelector('#email').value,
      avatar    : document.querySelector('#avatar-link').value,
      city      : document.querySelector('#city').value,
      state     : document.querySelector('#state').value,
    };

    // Create (POST) new student in 'student' table
    firebaseInstance.ref('students').push(newStudent)
    .then(()=> {
      // On successful ADD/POST operation
      newStudentModal.reset(); // reset form field
      $('#directory-new-student-modal').modal('hide');
    })
    .catch(() => {
      // On failed ADD/POST operation
      console.error('Error adding new student into firebaseInstance');
    });
  });
};

export default StudentModal;