import firebaseInstance from "../../../firebase_config";

const EditStudent = (id) => {

  const editStudentHTML = (obj) => {
    return `
      <div class="container student-wrapper mt-5">
        <header class="student-header mb-3">
          <div class="row row-cols-1">
            <div class="col">
              <h2>Edit ${obj.firstName} ${obj.lastName}</h2>
              <a href="#/view" type="button" class="btn btn-secondary">Go Back</a>
            </div>
          </div>
        </header><!--/ .student-header -->
        
        <form id="edit-student-form" class="student-content">
          <div class="row">
            <div class="col-6">
              <label for="first-name" class="font-weight-bold new-student-titles mb-0">First Name</label>
              <input id="first-name" name="first-name" type="text" class="form-control new-student-inputs mt-0" placeholder="${obj.firstName}" />
              <label for="last-name" class="font-weight-bold new-student-titles mb-0 mt-3">Last Name</label>
              <input id="last-name" name="last-name" type="text" class="form-control new-student-inputs mt-0" placeholder="${obj.lastName}" />
              <label for="email" class="font-weight-bold new-student-titles mb-0 mt-3">Email</label>
              <input id="email" name="email" type="email" class="form-control new-student-inputs mt-0" placeholder="${obj.email}" />
              <label for="city" class="font-weight-bold new-student-titles mb-0 mt-3">City</label>
              <input id="city" name="city" type="text" class="form-control new-student-inputs mt-0" placeholder="${obj.city}" />
              <label for="state" class="font-weight-bold new-student-titles mb-0 mt-3">State</label>
              <input id="state" name="state" type="text" class="form-control new-student-inputs mt-0" placeholder="${obj.state}" />
              <label for="avatar-link" class="font-weight-bold new-student-titles mb-0 mt-3">Avatar Link</label>
              <input id="avatar-link" name="avatar-link" type="text" class="form-control new-student-inputs mt-0 mb-5" placeholder="${obj.avatar}" />
            </div>
            <div class="col-6">
              <img src="${obj.avatar}" alt="Avatar for ${obj.firstName} ${obj.lastName}" style="width: 100%;" />
            </div>
          </div>
          <div class="row">
            <a href="#/view" type="button" class="btn btn-secondary">Go Back</a>
            <button id="save-changes" type="submit" class="btn btn-primary">Save Changes</button>
          </div>
        </form><!--/ .student-content -->
      </div><!--/ .student-wrapper -->
    `;
  };

  // READ operation on individual record using child() method.
  firebaseInstance.ref('students')
  .child(window.localStorage.getItem('studentKey'))
  .on('value', (result) => {
    const studentObj = result.val();

    document.querySelector('#app').innerHTML = editStudentHTML(studentObj);
  });
};

export default EditStudent;