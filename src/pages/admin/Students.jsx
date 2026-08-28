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
      alert("Veuillez remplir tous les champs.");
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
      alert("Veuillez remplir le nom et l'email.");
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
      `Le mot de passe de ${student.name} sera réinitialisé.`
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
          <h1>Gestion des étudiants</h1>
          <p>Créer et gérer les comptes étudiants.</p>
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
          + Ajouter un étudiant
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h2>
            {editingStudent
              ? "Modifier un étudiant"
              : "Ajouter un étudiant"}
          </h2>

          <form
            onSubmit={
              editingStudent ? handleUpdate : handleAdd
            }
          >
            <div className="form-group">
              <label>Nom</label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nom de l'étudiant"
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
                <label>Mot de passe initial</label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe"
                />
              </div>
            )}

            <div className="form-actions">
              <button
                type="submit"
                className="primary-button"
              >
                {editingStudent
                  ? "Enregistrer les modifications"
                  : "Créer l'étudiant"}
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={handleCancel}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Statut</th>
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
                      Actif
                    </span>
                  ) : (
                    <span className="status inactive">
                      Désactivé
                    </span>
                  )}
                </td>

                <td>
                  <div className="actions">
                    <button
                      className="action-button"
                      onClick={() => handleEdit(student)}
                    >
                      Modifier
                    </button>

                    <button
                      className="action-button"
                      onClick={() =>
                        handleResetPassword(student)
                      }
                    >
                      Réinitialiser
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
                        ? "Désactiver"
                        : "Activer"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {students.length === 0 && (
          <p className="empty-message">
            Aucun étudiant enregistré.
          </p>
        )}
      </div>
    </div>
  );
}

export default Students;