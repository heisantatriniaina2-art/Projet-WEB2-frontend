import React, { useState } from "react";

function Courses() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      code: "PROG2",
      name: "Programmation 2",
      description: "Cours de programmation avancée.",
    },
    {
      id: 2,
      code: "WEB2",
      name: "Développement Web",
      description: "Création d'applications web.",
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
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const codeExists = courses.some(
      (course) => course.code.toLowerCase() === code.toLowerCase()
    );

    if (codeExists) {
      alert("Ce code de cours existe déjà.");
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
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const codeExists = courses.some(
      (course) =>
        course.id !== editingCourse.id &&
        course.code.toLowerCase() === code.toLowerCase()
    );

    if (codeExists) {
      alert("Ce code de cours existe déjà.");
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
      "Voulez-vous vraiment supprimer ce cours ?"
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
          <h1>Gestion des cours</h1>
          <p>Créer et gérer les cours de l'école.</p>
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
          + Ajouter un cours
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h2>
            {editingCourse ? "Modifier un cours" : "Ajouter un cours"}
          </h2>

          <form onSubmit={editingCourse ? handleUpdate : handleAdd}>
            <div className="form-group">
              <label>Code du cours</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Exemple : PROG2"
              />
            </div>

            <div className="form-group">
              <label>Nom du cours</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Exemple : Programmation 2"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description du cours"
                rows="4"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="primary-button">
                {editingCourse
                  ? "Enregistrer les modifications"
                  : "Créer le cours"}
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
              <th>Code</th>
              <th>Nom</th>
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
                      Modifier
                    </button>

                    <button
                      className="action-button danger"
                      onClick={() => handleDelete(course.id)}
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {courses.length === 0 && (
          <p className="empty-message">Aucun cours enregistré.</p>
        )}
      </div>
    </div>
  );
}

export default Courses;