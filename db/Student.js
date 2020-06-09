const faker = require("faker");

class Student {
  constructor() {
    let students = [];

    for (let i = 0; i < 24; i++) {
      let firstName = faker.name.firstName();
      let lastName = faker.name.lastName();

      students.push({
        "id": i + 1,
        "firstName": firstName,
        "lastName": lastName,
        "email": `${firstName}.${lastName}@gmail.com`,
        "avatar": faker.image.avatar(),
        "city": faker.address.city(),
        "state": faker.address.stateAbbr()
      });
    }

    this.students = students;
    this.latestStudentId = 24;
  }

  all() {
    return this.students;
  }

  one(id) {
    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i].id.toString() === id) {
        return this.students[i];
      }
    }
  }

  create(studentObj) {
    this.latestStudentId = this.latestStudentId + 1;

    const newStudent = Object.assign({}, studentObj, {
      id: this.latestStudentId
    });

    this.students.push(newStudent);

    return newStudent;
  }

  update(id, studentObj) {
    const updatedStudents = this.students.map((student) => {
      if (student.id.toString() === id) {
        return Object.assign({}, student, studentObj);
      }

      return student;
    });

    this.students = updatedStudents;
  }

  destroy(id) {
    const filteredStudents = this.students.filter((student) => {
      if (student.id.toString() !== id) {
        return student;
      }
    });

    this.students = filteredStudents;
  }
}

module.exports = Student;
