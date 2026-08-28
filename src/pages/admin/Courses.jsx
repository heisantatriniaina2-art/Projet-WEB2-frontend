import React, { useState } from "react";

function Courses() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      code: "PROG2",
      name: "Programming 2",
      description: "Advanced programming course.",
    },
    {
      id: 2,
      code: "WEB2",
      name: "Web Development",
      description: "Web application development.",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editingCourse, setEditingCourse] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();

    if (!code || !name || !description) {
      alert("Please fill in all fields.");
      return;
    }

    const codeExists = courses.some(
      (course) => course.code.toLowerCase() === code.toLowerCase()
    );

    if (codeExists) {
      alert("This course code already exists.");
      return;
    }

    const newCourse = {
      id: Date.now(),
      code: code.toUpperCase(),
      name: name,
      description: description,
    };

    setCourses([...courses, newCourse]);

    setCode("");
    setName("");
    setDescription("");
    setShowForm(false);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);

    setCode(course.code);
    setName(course.name);
    setDescription(course.description);

    setShowForm(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!code || !name || !description) {
      alert("Please fill in all fields.");
      return;
    }

    const codeExists = courses.some(
      (course) =>
        course.id !== editingCourse.id &&
        course.code.toLowerCase() === code.toLowerCase()
    );

    if (codeExists) {
      alert("This course code already exists.");
      return;
    }

    const updatedCourses = courses.map((course) =>
      course.id === editingCourse.id
        ? {
            ...course,
            code: code.toUpperCase(),
            name: name,
            description: description,
          }
        : course
    );

    setCourses(updatedCourses);

    setEditingCourse(null);
    setCode("");
    setName("");
    setDescription("");
    setShowForm(false);
  };

  const handleDelete = (id) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmation) {
      return;
    }

    setCourses(courses.filter((course) => course.id !== id));
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCourse(null);

    setCode("");
    setName("");
    setDescription("");
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>Course Management</h1>
          <p>Create and manage school courses.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => {
            setEditingCourse(null);
            setCode("");
            setName("");
            setDescription("");
            setShowForm(true);
          }}
        >
          + Add Course
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h2>
            {editingCourse ? "Edit Course" : "Add Course"}
          </h2>

          <form onSubmit={editingCourse ? handleUpdate : handleAdd}>
            <div className="form-group">
              <label>Course Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Example: PROG2"
              />
            </div>

            <div className="form-group">
              <label>Course Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Example: Programming 2"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Course description"
                rows="4"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="primary-button">
                {editingCourse
                  ? "Save Changes"
                  : "Create Course"}
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.code}</td>
                <td>{course.name}</td>
                <td>{course.description}</td>
                <td>
                  <div className="actions">
                    <button
                      className="action-button"
                      onClick={() => handleEdit(course)}
                    >
                      Edit
                    </button>

                    <button
                      className="action-button danger"
                      onClick={() => handleDelete(course.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {courses.length === 0 && (
          <p className="empty-message">No courses registered.</p>
        )}
      </div>
    </div>
  );
}

export default Courses;