import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Exams() {
  const navigate = useNavigate();

  const [exams, setExams] = useState([
    {
      id: 1,
      title: "Examen final",
      courseCode: "PROG2",
      description: "Évaluation portant sur les chapitres 1 à 5.",
      startDate: "2026-08-30T09:00",
      endDate: "2026-08-30T11:00",
    },
    {
      id: 2,
      title: "Contrôle continu",
      courseCode: "WEB2",
      description: "Évaluation sur le développement web.",
      startDate: "2026-09-02T10:00",
      endDate: "2026-09-02T12:00",
    },
  ]);

  const courses = [
    { code: "PROG2", name: "Programmation 2" },
    { code: "WEB2", name: "Développement Web" },
  ];

  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [editingExam, setEditingExam] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();

    if (!title || !courseCode || !description || !startDate || !endDate) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if (new Date(endDate) <= new Date(startDate)) {
      alert("La date de fin doit être après la date de début.");
      return;
    }

    const newExam = {
      id: Date.now(),
      title: title,
      courseCode: courseCode,
      description: description,
      startDate: startDate,
      endDate: endDate,
    };

    setExams([...exams, newExam]);

    setTitle("");
    setCourseCode("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setShowForm(false);
  };

  const handleEdit = (exam) => {
    setEditingExam(exam);

    setTitle(exam.title);
    setCourseCode(exam.courseCode);
    setDescription(exam.description);
    setStartDate(exam.startDate);
    setEndDate(exam.endDate);

    setShowForm(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!title || !courseCode || !description || !startDate || !endDate) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if (new Date(endDate) <= new Date(startDate)) {
      alert("La date de fin doit être après la date de début.");
      return;
    }

    const updatedExams = exams.map((exam) =>
      exam.id === editingExam.id
        ? {
            ...exam,
            title: title,
            courseCode: courseCode,
            description: description,
            startDate: startDate,
            endDate: endDate,
          }
        : exam
    );

    setExams(updatedExams);

    setEditingExam(null);
    setTitle("");
    setCourseCode("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setShowForm(false);
  };

  const handleDelete = (id) => {
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer cet examen ?"
    );

    if (!confirmation) {
      return;
    }

    setExams(exams.filter((exam) => exam.id !== id));
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingExam(null);

    setTitle("");
    setCourseCode("");
    setDescription("");
    setStartDate("");
    setEndDate("");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>Gestion des examens</h1>
          <p>Créer et gérer les examens liés aux cours.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => {
            setEditingExam(null);
            setTitle("");
            setCourseCode("");
            setDescription("");
            setStartDate("");
            setEndDate("");
            setShowForm(true);
          }}
        >
          + Ajouter un examen
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h2>
            {editingExam ? "Modifier un examen" : "Ajouter un examen"}
          </h2>

          <form onSubmit={editingExam ? handleUpdate : handleAdd}>
            <div className="form-group">
              <label>Titre</label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Exemple : Examen final"
              />
            </div>

            <div className="form-group">
              <label>Cours</label>

              <select
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
              >
                <option value="">-- Sélectionner un cours --</option>
                {courses.map((course) => (
                  <option key={course.code} value={course.code}>
                    {course.code} - {course.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Description</label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description de l'examen"
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>Début</label>

              <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Fin</label>

              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="primary-button">
                {editingExam
                  ? "Enregistrer les modifications"
                  : "Créer l'examen"}
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
              <th>Titre</th>
              <th>Cours</th>
              <th>Début</th>
              <th>Fin</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {exams.map((exam) => (
              <tr key={exam.id}>
                <td>{exam.title}</td>

                <td>{exam.courseCode}</td>

                <td>{formatDate(exam.startDate)}</td>

                <td>{formatDate(exam.endDate)}</td>

                <td>
                  <div className="actions">
                    <button
                      className="action-button"
                      onClick={() => handleEdit(exam)}
                    >
                      Modifier
                    </button>

                    <button
                      className="action-button danger"
                      onClick={() => handleDelete(exam.id)}
                    >
                      Supprimer
                    </button>

                    <button
                      className="action-button"
                      onClick={() =>
                        navigate(`/admin/exams/${exam.id}/questions`)
                      }
                    >
                      Questions
                    </button>

                    <button
                      className="action-button"
                      onClick={() =>
                        navigate(`/admin/exams/${exam.id}/results`)
                      }
                    >
                      Résultats
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {exams.length === 0 && (
          <p className="empty-message">Aucun examen enregistré.</p>
        )}
      </div>
    </div>
  );
}

export default Exams;