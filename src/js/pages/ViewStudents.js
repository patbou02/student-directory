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
  
        <div class="row row-outer mb-3">
          <div class="col-lg-3">
            <div class="card directory-card">
              <img class="card-img-top" src="/img/sam.jpg" />
              <div class="card-body">
                <h5 class="card-title">Sam Wessin</h5>
                <p class="card-text">sam.wessin@gmail.com<br />Orange County, CA</p>
                <a href="#" class="btn btn-secondary">Edit Sam</a>
              </div>
            </div><!--/ .directory-card -->
          </div>
  
          <div class="col-lg-3">
            <div class="card directory-card">
              <img class="card-img-top" src="/img/peter.jpg" />
              <div class="card-body">
                <h5 class="card-title">Peter Landers</h5>
                <p class="card-text">peter.landers@gmail.com<br />Henderson, NV</p>
                <a href="#" class="btn btn-secondary">Edit Peter</a>
              </div>
            </div>
          </div>
  
          <div class="col-lg-3">
            <div class="card directory-card">
              <img class="card-img-top" src="/img/josh.jpg" />
              <div class="card-body">
                <h5 class="card-title">Josh Sproutz</h5>
                <p class="card-text">josh.sproutz@gmail.com<br />Charleston, SC</p>
                <a href="#" class="btn btn-secondary">Edit Josh</a>
              </div>
            </div>
          </div>
  
          <div class="col-lg-3">
            <div class="card directory-card">
              <img class="card-img-top" src="/img/amanda.jpg" />
              <div class="card-body">
                <h5 class="card-title">Amanda Pulson</h5>
                <p class="card-text">amanda.pulson@gmail.com<br />Atlanta, GA</p>
                <a href="#" class="btn btn-secondary">Edit Amanda</a>
              </div>
            </div>
          </div>
        </div><!--/ .row-outer -->
  
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
};

export default ViewStudents;