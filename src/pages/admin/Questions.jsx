import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

function Questions() {
  const { id } = useParams();

  const [examHasAttempts] = useState(false);

  const [questions, setQuestions] = useState([
    {
      id: 1,
      statement: "Which language does React use?",
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
      statement: "Which command installs an npm package?",
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
      alert("A question cannot have more than 6 choices.");
      return;
    }
    setChoices([...choices, { text: "", correct: false }]);
  };

  const handleRemoveChoice = (index) => {
    if (choices.length <= 2) {
      alert("A question must have at least 2 choices.");
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
      alert("Please enter the question statement and the point value.");
      return false;
    }

    if (choices.length < 2 || choices.length > 6) {
      alert("A question must have between 2 and 6 choices.");
      return false;
    }

    if (choices.some((choice) => !choice.text)) {
      alert("All choices must contain text.");
      return false;
    }

    const correctCount = choices.filter((choice) => choice.correct).length;

    if (correctCount !== 1) {
      alert("Exactly one choice must be marked as correct.");
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
        "This exam already has submitted attempts: questions can no longer be edited."
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
        "This exam already has submitted attempts: questions can no longer be deleted."
      );
      return;
    }

    const confirmation = window.confirm(
      "Are you sure you want to delete this question?"
    );

    if (!confirmation) return;

    setQuestions(questions.filter((question) => question.id !== questionId));
  };

  return (
    <div className="admin-page">
      <Link to="/admin/exams">← Back to exams</Link>

      <div className="page-header" style={{ marginTop: "15px" }}>
        <div>
          <h1>Questions for Exam #{id}</h1>
          <p>Manage questions and their answer choices.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => {
            if (examHasAttempts) {
              alert(
                "This exam already has submitted attempts: cannot add new questions."
              );
              return;
            }
            resetForm();
            setShowForm(true);
          }}
        >
          + Add Question
        </button>
      </div>

      {examHasAttempts && (
        <p className="empty-message">
          ⚠️ This exam already has at least one attempt: questions are locked (read-only).
        </p>
      )}

      {showForm && (
        <div className="form-card">
          <h2>
            {editingQuestion ? "Edit Question" : "Add Question"}
          </h2>

          <form onSubmit={editingQuestion ? handleUpdate : handleAdd}>
            <div className="form-group">
              <label>Question Statement</label>

              <textarea
                value={statement}
                onChange={(e) => setStatement(e.target.value)}
                placeholder="Example: Which language does React use?"
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
                placeholder="Example: 2"
              />
            </div>

            <div className="form-group">
              <label>Answer Choices (2 to 6, exactly one correct)</label>

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
                    placeholder={`Choice ${index + 1}`}
                    style={{ flex: 1 }}
                  />

                  <button
                    type="button"
                    className="action-button danger"
                    onClick={() => handleRemoveChoice(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="secondary-button"
                onClick={handleAddChoice}
              >
                + Add Choice
              </button>
            </div>

            <div className="form-actions">
              <button type="submit" className="primary-button">
                {editingQuestion
                  ? "Save Changes"
                  : "Create Question"}
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={resetForm}
              >
                Cancel
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
                Edit
              </button>

              <button
                className="action-button danger"
                onClick={() => handleDelete(question.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {questions.length === 0 && (
          <p className="empty-message">No questions found for this exam.</p>
        )}
      </div>
    </div>
  );
}

export default Questions;