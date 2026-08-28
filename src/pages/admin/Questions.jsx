import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

function Questions() {
  const { id } = useParams();

  const [examHasAttempts] = useState(false);

  const [questions, setQuestions] = useState([
    {
      id: 1,
      statement: "Quel langage utilise React ?",
      points: 2,
      choices: [
        { id: 1, text: "Java", correct: false },
        { id: 2, text: "JavaScript", correct: true },
        { id: 3, text: "Python", correct: false },
        { id: 4, text: "C++", correct: false },
      ],
    },
    {
      id: 2,
      statement: "Quelle commande installe un package npm ?",
      points: 1,
      choices: [
        { id: 1, text: "npm install", correct: true },
        { id: 2, text: "npm run", correct: false },
      ],
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  const [statement, setStatement] = useState("");
  const [points, setPoints] = useState("");
  const [choices, setChoices] = useState([
    { text: "", correct: false },
    { text: "", correct: false },
  ]);

  const handleAddChoice = () => {
    if (choices.length >= 6) {
      alert("Une question ne peut pas avoir plus de 6 choix.");
      return;
    }
    setChoices([...choices, { text: "", correct: false }]);
  };

  const handleRemoveChoice = (index) => {
    if (choices.length <= 2) {
      alert("Une question doit avoir au moins 2 choix.");
      return;
    }
    setChoices(choices.filter((_, i) => i !== index));
  };

  const handleChoiceTextChange = (index, value) => {
    const updated = choices.map((choice, i) =>
      i === index ? { ...choice, text: value } : choice
    );
    setChoices(updated);
  };

  const handleChoiceCorrectChange = (index) => {
    const updated = choices.map((choice, i) => ({
      ...choice,
      correct: i === index,
    }));
    setChoices(updated);
  };

  const resetForm = () => {
    setStatement("");
    setPoints("");
    setChoices([
      { text: "", correct: false },
      { text: "", correct: false },
    ]);
    setEditingQuestion(null);
    setShowForm(false);
  };

  const validateQuestion = () => {
    if (!statement || !points) {
      alert("Veuillez remplir l'énoncé et le nombre de points.");
      return false;
    }

    if (choices.length < 2 || choices.length > 6) {
      alert("Une question doit avoir entre 2 et 6 choix.");
      return false;
    }

    if (choices.some((choice) => !choice.text)) {
      alert("Tous les choix doivent avoir un texte.");
      return false;
    }

    const correctCount = choices.filter((choice) => choice.correct).length;

    if (correctCount !== 1) {
      alert("Exactement un choix doit être marqué comme correct.");
      return false;
    }

    return true;
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (!validateQuestion()) return;

    const newQuestion = {
      id: Date.now(),
      statement: statement,
      points: Number(points),
      choices: choices.map((choice, index) => ({
        id: index + 1,
        text: choice.text,
        correct: choice.correct,
      })),
    };

    setQuestions([...questions, newQuestion]);
    resetForm();
  };

  const handleEdit = (question) => {
    if (examHasAttempts) {
      alert(
        "Cet examen a déjà des tentatives : les questions ne sont plus modifiables."
      );
      return;
    }

    setEditingQuestion(question);
    setStatement(question.statement);
    setPoints(question.points);
    setChoices(
      question.choices.map((choice) => ({
        text: choice.text,
        correct: choice.correct,
      }))
    );
    setShowForm(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!validateQuestion()) return;

    const updatedQuestions = questions.map((question) =>
      question.id === editingQuestion.id
        ? {
            ...question,
            statement: statement,
            points: Number(points),
            choices: choices.map((choice, index) => ({
              id: index + 1,
              text: choice.text,
              correct: choice.correct,
            })),
          }
        : question
    );

    setQuestions(updatedQuestions);
    resetForm();
  };

  const handleDelete = (questionId) => {
    if (examHasAttempts) {
      alert(
        "Cet examen a déjà des tentatives : les questions ne sont plus supprimables."
      );
      return;
    }

    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer cette question ?"
    );

    if (!confirmation) return;

    setQuestions(questions.filter((question) => question.id !== questionId));
  };

  return (
    <div className="admin-page">
      <Link to="/admin/exams">← Retour aux examens</Link>

      <div className="page-header" style={{ marginTop: "15px" }}>
        <div>
          <h1>Questions de l'examen #{id}</h1>
          <p>Gérer les questions et leurs choix de réponse.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => {
            if (examHasAttempts) {
              alert(
                "Cet examen a déjà des tentatives : impossible d'ajouter des questions."
              );
              return;
            }
            resetForm();
            setShowForm(true);
          }}
        >
          + Ajouter une question
        </button>
      </div>

      {examHasAttempts && (
        <p className="empty-message">
          ⚠️ Cet examen a déjà au moins une tentative : les questions sont
          verrouillées (lecture seule).
        </p>
      )}

      {showForm && (
        <div className="form-card">
          <h2>
            {editingQuestion ? "Modifier la question" : "Ajouter une question"}
          </h2>

          <form onSubmit={editingQuestion ? handleUpdate : handleAdd}>
            <div className="form-group">
              <label>Énoncé</label>

              <textarea
                value={statement}
                onChange={(e) => setStatement(e.target.value)}
                placeholder="Exemple : Quel langage utilise React ?"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Points</label>

              <input
                type="number"
                min="1"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                placeholder="Exemple : 2"
              />
            </div>

            <div className="form-group">
              <label>Choix de réponse (2 à 6, un seul correct)</label>

              {choices.map((choice, index) => (
                <div
                  key={index}
                  className="form-group"
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <input
                    type="radio"
                    name="correctChoice"
                    checked={choice.correct}
                    onChange={() => handleChoiceCorrectChange(index)}
                  />

                  <input
                    type="text"
                    value={choice.text}
                    onChange={(e) =>
                      handleChoiceTextChange(index, e.target.value)
                    }
                    placeholder={`Choix ${index + 1}`}
                    style={{ flex: 1 }}
                  />

                  <button
                    type="button"
                    className="action-button danger"
                    onClick={() => handleRemoveChoice(index)}
                  >
                    Retirer
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="secondary-button"
                onClick={handleAddChoice}
              >
                + Ajouter un choix
              </button>
            </div>

            <div className="form-actions">
              <button type="submit" className="primary-button">
                {editingQuestion
                  ? "Enregistrer les modifications"
                  : "Créer la question"}
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={resetForm}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-card">
        {questions.map((question, index) => (
          <div key={question.id} className="form-card">
            <h3>
              Question {index + 1} — {question.points} point(s)
            </h3>

            <p>{question.statement}</p>

            <ul>
              {question.choices.map((choice) => (
                <li key={choice.id}>
                  {choice.correct ? "● " : "○ "}
                  {choice.text}
                  {choice.correct && " ✓"}
                </li>
              ))}
            </ul>

            <div className="actions">
              <button
                className="action-button"
                onClick={() => handleEdit(question)}
              >
                Modifier
              </button>

              <button
                className="action-button danger"
                onClick={() => handleDelete(question.id)}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}

        {questions.length === 0 && (
          <p className="empty-message">Aucune question pour cet examen.</p>
        )}
      </div>
    </div>
  );
}

export default Questions;