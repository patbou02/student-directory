# Student Directory Application

## Instructions

- In this application you will be using existing HTML and CSS and adding functionality to a student directory.
- Step 1: Download the starter code and run `npm install`.
- Step 2: Start the server by running `npm start`.
- Step 3: Navigate your browser to `http://localhost:3000` to see the UI you will be building.
- You will now write the application code in public/js/app.js.
- Main deliverable is a working application that displays a list of all students in the database using the provided UI.
- API documentation can be found below.

## Bonus Deliverables

- Add student using modal form
- Filtering of students by name
- Client-side pagination
- Reuse add student modal for edit a student functionality
- Delete a student

## API Docs

### `GET /students`

Returns list of students:

```json
[
	{
		"id": 1,
		"firstName": "Jalon",
		"lastName": "King",
		"email": "Jalon.King@gmail.com",
		"avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/kanickairaj/128.jpg",
		"city": "Alivialand",
		"state": "NV"
	}
]
```

### `GET /students/:id`

Returns single student:

```json
{
	"id": 1,
	"firstName": "Jalon",
	"lastName": "King",
	"email": "Jalon.King@gmail.com",
	"avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/kanickairaj/128.jpg",
	"city": "Alivialand",
	"state": "NV"
}
```

### `POST /students`

Creates a new student

Body parameters:

- firstName: _string_
- lastName: _string_
- email: _string_
- avatar: _string_
- city: _string_
- state: _string_

### `PUT /students/:id`

Updates an existing student

Body parameters:

- firstName: _string_
- lastName: _string_
- email: _string_
- avatar: _string_
- city: _string_
- state: _string_

### `DELETE /students/:id`

Deletes a student
