import { useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Questions() {
  const { id } = useParams();

  const [questions, setQuestions] = useState([]);

  const [form, setForm] = useState({
    statement: "",
    points: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newQuestion = {
      id: Date.now(),
      statement: form.statement,
      points: Number(form.points),
      options: {
        A: form.optionA,
        B: form.optionB,
        C: form.optionC,
        D: form.optionD
      },
      correctAnswer: form.correctAnswer
    };

    setQuestions([...questions, newQuestion]);

    setForm({
      statement: "",
      points: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: ""
    });
  };

  const handleDelete = (questionId) => {
    setQuestions(
      questions.filter((question) => question.id !== questionId)
    );
  };

  return (
    <div className="admin-questions">

      <h1>Gestion des questions</h1>

      <p>
        Examen : {id}
      </p>

      <Link to="/admin/exams">
        ← Retour aux examens
      </Link>

      <section>
        <h2>Ajouter une question</h2>

        <form onSubmit={handleSubmit}>

          <div>
            <label>Énoncé</label>

            <textarea
              name="statement"
              value={form.statement}
              onChange={handleChange}
              placeholder="Écrivez l'énoncé de la question"
              required
            />
          </div>

          <div>
            <label>Nombre de points</label>

            <input
              type="number"
              name="points"
              value={form.points}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div>
            <label>Réponse A</label>

            <input
              type="text"
              name="optionA"
              value={form.optionA}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Réponse B</label>

            <input
              type="text"
              name="optionB"
              value={form.optionB}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Réponse C</label>

            <input
              type="text"
              name="optionC"
              value={form.optionC}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Réponse D</label>

            <input
              type="text"
              name="optionD"
              value={form.optionD}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Bonne réponse</label>

            <select
              name="correctAnswer"
              value={form.correctAnswer}
              onChange={handleChange}
              required
            >
              <option value="">
                Sélectionner la bonne réponse
              </option>

              <option value="A">Réponse A</option>
              <option value="B">Réponse B</option>
              <option value="C">Réponse C</option>
              <option value="D">Réponse D</option>
            </select>
          </div>

          <button type="submit">
            Ajouter la question
          </button>

        </form>
      </section>

      <section>
        <h2>Questions de l'examen</h2>

        {questions.length === 0 ? (
          <p>Aucune question pour le moment.</p>
        ) : (
          questions.map((question, index) => (
            <div
              key={question.id}
              className="question-card"
            >
              <h3>
                Question {index + 1}
              </h3>

              <p>
                {question.statement}
              </p>

              <p>
                <strong>
                  Points :
                </strong>{" "}
                {question.points}
              </p>

              <ul>
                <li>A. {question.options.A}</li>
                <li>B. {question.options.B}</li>
                <li>C. {question.options.C}</li>
                <li>D. {question.options.D}</li>
              </ul>

              <p>
                <strong>
                  Bonne réponse :
                </strong>{" "}
                {question.correctAnswer}
              </p>

              <button
                onClick={() => handleDelete(question.id)}
              >
                Supprimer
              </button>
            </div>
          ))
        )}
      </section>

    </div>
  );
}