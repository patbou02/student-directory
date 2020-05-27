const StudentCard = (obj, objKey) => {

  return `
    <div class="card directory-card">
      <img class="card-img-top" src="${obj.avatar}" />
      <div class="card-body">
        <h5 class="card-title">${obj.firstName} ${obj.lastName}</h5>
        <p class="card-text">${obj.email}<br />${obj.city}, ${obj.state}</p>
        <a href="#/edit" id="${objKey}" class="btn btn-secondary">Edit ${obj.firstName}</a>
      </div>
    </div><!--/ .directory-card -->
  `;

};

export default StudentCard;