import firebaseInstance from "../../../firebase_config";

const EditStudent = () => {

  const editStudentHTML = (obj) => {
    return `
      <div class="container student-wrapper mt-5 p-0">
        <header class="student-header mb-3">
          <div class="row row-cols-1">
            <div class="col">
              <h2>Edit ${obj.firstName} ${obj.lastName}</h2>
            </div>
          </div>
        </header><!--/ .student-header -->
        
        <form id="edit-student-form" class="student-content">
          <div class="row">
            <div class="col-md-6 col-xl-8 mb-4 mb-md-0">
              <a href="#/view" type="button" class="btn btn-secondary" style="display: table;">Go Back</a>
              <label for="first-name" class="font-weight-bold new-student-titles mb-0 mt-3">First Name</label>
              <input id="first-name" name="first-name" type="text" class="form-control new-student-inputs mt-0" placeholder="First Name" value="${obj.firstName}" />
              <label for="last-name" class="font-weight-bold new-student-titles mb-0 mt-3">Last Name</label>
              <input id="last-name" name="last-name" type="text" class="form-control new-student-inputs mt-0" placeholder="Last Name" value="${obj.lastName}" />
              <label for="email" class="font-weight-bold new-student-titles mb-0 mt-3">Email</label>
              <input id="email" name="email" type="email" class="form-control new-student-inputs mt-0" placeholder="Email" value="${obj.email}" />
              <label for="city" class="font-weight-bold new-student-titles mb-0 mt-3">City</label>
              <input id="city" name="city" type="text" class="form-control new-student-inputs mt-0" placeholder="City" value="${obj.city}" />
              <label for="state" class="font-weight-bold new-student-titles mb-0 mt-3">State</label>
              <input id="state" name="state" type="text" class="form-control new-student-inputs mt-0" placeholder="State" value="${obj.state}" />
            </div>
            <div class="col-md-6 col-xl-4">
              <div class="card">
                <img src="${obj.avatar}" alt="Avatar for ${obj.firstName} ${obj.lastName}" style="width: 100%;" />
                <div class="card-body">
                  <label for="avatar-link" class="font-weight-bold new-student-titles mb-0">Avatar Link</label>
                  <input id="avatar-link" name="avatar-link" type="text" class="form-control new-student-inputs mt-0" placeholder="Path to Avatar" value="${obj.avatar}" />
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col">
              <a href="#/view" type="button" class="btn btn-secondary">Go Back</a>
              <button id="save-changes" type="submit" class="btn btn-primary">Save Changes</button>
            </div>
          </div>
        </form><!--/ .student-content -->
      </div><!--/ .student-wrapper -->
    `;
  };

  const studentKey = window.localStorage.getItem('studentKey');

  // READ operation on individual record using child() method.
  firebaseInstance.ref('students')
  .child(studentKey)
  .on('value', (result) => {
    const studentObj = result.val();
    document.querySelector('#app').innerHTML = editStudentHTML(studentObj);
  });

  // Event Delegation for 'submit' edit student form
  document.addEventListener('submit', (e) => {
    if (e.target.id === 'edit-student-form') {
      e.preventDefault();

      // Store updated values
      const updatedStudent = {
        avatar    : document.querySelector('#avatar-link').value,
        firstName : document.querySelector('#first-name').value,
        lastName  : document.querySelector('#last-name').value,
        email     : document.querySelector('#email').value,
        city      : document.querySelector('#city').value,
        state     : document.querySelector('#state').value,
      };
      console.table(updatedStudent);

      // PUT operation to update existing record
      firebaseInstance.ref('students')
      .child(studentKey)
      .update(updatedStudent)
      .then(() => {
        // once successful change hash to /view
        window.location.hash = '/view';
      })
      .catch(() => {
        console.error('Error saving updates for Student.');
      });
    }
  });
};

export default EditStudent;