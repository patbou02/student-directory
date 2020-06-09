const StudentCard = (obj, objKey) => {

  return `
    <div class="card directory-card">
      <div class="card-img-wrapper">
        <img class="card-img-top" src="${obj.avatar}" />
      </div>
      <div class="card-body">
        <h5 class="card-title">${obj.firstName} ${obj.lastName}</h5>
        <p class="card-text">${obj.email}<br />${obj.city}, ${obj.state}</p>
      </div>
      <div class="card-footer">
        <a href="#/edit" type="button" id="${objKey}" class="btn btn-secondary">Edit</a>
        <button type="button" id="${objKey}" class="btn btn-danger btn-delete">Delete</button>
      </div>
    </div><!--/ .directory-card -->
  `;

};

export default StudentCard;