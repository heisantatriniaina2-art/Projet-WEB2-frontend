import React, { useState } from "react";

function Students() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Jean",
      email: "jean@gmail.com",
      active: true,
    },
    {
      id: 2,
      name: "Paul",
      email: "paul@gmail.com",
      active: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [editingStudent, setEditingStudent] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: name,
      email: email,
      active: true,
    };

    setStudents([...students, newStudent]);

    setName("");
    setEmail("");
    setPassword("");
    setShowForm(false);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setName(student.name);
    setEmail(student.email);
    setPassword("");
    setShowForm(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert("Please fill in the name and email fields.");
      return;
    }

    const updatedStudents = students.map((student) =>
      student.id === editingStudent.id
        ? {
            ...student,
            name: name,
            email: email,
          }
        : student
    );

    setStudents(updatedStudents);

    setEditingStudent(null);
    setName("");
    setEmail("");
    setPassword("");
    setShowForm(false);
  };

  const handleToggleActive = (id) => {
    const updatedStudents = students.map((student) =>
      student.id === id
        ? {
            ...student,
            active: !student.active,
          }
        : student
    );

    setStudents(updatedStudents);
  };

  const handleResetPassword = (student) => {
    alert(
      `The password for ${student.name} will be reset.`
    );
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingStudent(null);
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>Student Management</h1>
          <p>Create and manage student accounts.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => {
            setEditingStudent(null);
            setName("");
            setEmail("");
            setPassword("");
            setShowForm(true);
          }}
        >
          + Add Student
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h2>
            {editingStudent
              ? "Edit Student"
              : "Add Student"}
          </h2>

          <form
            onSubmit={
              editingStudent ? handleUpdate : handleAdd
            }
          >
            <div className="form-group">
              <label>Name</label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Student name"
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
              />
            </div>

            {!editingStudent && (
              <div className="form-group">
                <label>Initial Password</label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
            )}

            <div className="form-actions">
              <button
                type="submit"
                className="primary-button"
              >
                {editingStudent
                  ? "Save Changes"
                  : "Create Student"}
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
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>

                <td>{student.email}</td>

                <td>
                  {student.active ? (
                    <span className="status active">
                      Active
                    </span>
                  ) : (
                    <span className="status inactive">
                      Disabled
                    </span>
                  )}
                </td>

                <td>
                  <div className="actions">
                    <button
                      className="action-button"
                      onClick={() => handleEdit(student)}
                    >
                      Edit
                    </button>

                    <button
                      className="action-button"
                      onClick={() =>
                        handleResetPassword(student)
                      }
                    >
                      Reset Password
                    </button>

                    <button
                      className={
                        student.active
                          ? "action-button danger"
                          : "action-button success"
                      }
                      onClick={() =>
                        handleToggleActive(student.id)
                      }
                    >
                      {student.active
                        ? "Disable"
                        : "Enable"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {students.length === 0 && (
          <p className="empty-message">
            No registered students.
          </p>
        )}
      </div>
    </div>
  );
}

export default Students;