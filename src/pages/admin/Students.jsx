import { useEffect, useState } from "react";
import {
  getStudents,
  createStudent,
  updateStudent,
  resetStudentPassword,
  disableStudent
} from "../../api/students";

export default function Students() {
  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des étudiants :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateStudent(editingId, {
          name: form.name,
          email: form.email
        });
      } else {
        await createStudent(form);
      }

      setForm({
        name: "",
        email: "",
        password: ""
      });

      setEditingId(null);

      await loadStudents();
    } catch (error) {
      console.error("Erreur création/modification étudiant :", error);
      alert(
        `Impossible d'enregistrer l'étudiant.\n\n${error.message}`
      );
    }
  };

  const handleEdit = (student) => {
    setEditingId(student.id);

    setForm({
      name: student.name || "",
      email: student.email || "",
      password: ""
    });
  };

  const handleResetPassword = async (id) => {
    const newPassword = window.prompt(
      "Entrez le nouveau mot de passe :"
    );

    if (!newPassword) {
      return;
    }

    try {
      await resetStudentPassword(id, newPassword);
      alert("Mot de passe réinitialisé.");
    } catch (error) {
      console.error("Erreur :", error);
      alert("Impossible de réinitialiser le mot de passe.");
    }
  };

  const handleDisable = async (id) => {
    if (
      !window.confirm(
        "Voulez-vous vraiment désactiver cet étudiant ?"
      )
    ) {
      return;
    }

    try {
      await disableStudent(id);
      await loadStudents();
    } catch (error) {
      console.error("Erreur :", error);
      alert("Impossible de désactiver l'étudiant.");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);

    setForm({
      name: "",
      email: "",
      password: ""
    });
  };

  return (
    <div className="admin-students">

      <h1>Gestion des étudiants</h1>

      <section className="student-form">

        <h2>
          {editingId
            ? "Modifier l'étudiant"
            : "Créer un étudiant"}
        </h2>

        <form onSubmit={handleSubmit}>

          <div>
            <label>Nom</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nom de l'étudiant"
              required
            />
          </div>

          <div>
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="email@exemple.com"
              required
            />
          </div>

          {!editingId && (
            <div>
              <label>Mot de passe initial</label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Mot de passe initial"
                required
              />
            </div>
          )}

          <button type="submit">
            {editingId ? "Modifier" : "Créer"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
            >
              Annuler
            </button>
          )}

        </form>

      </section>

      <section className="student-list">

        <h2>Liste des étudiants</h2>

        {loading ? (
          <p>Chargement...</p>
        ) : students.length === 0 ? (
          <p>Aucun étudiant disponible.</p>
        ) : (
          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {students.map((student) => (
                <tr key={student.id}>

                  <td>{student.id}</td>

                  <td>{student.name}</td>

                  <td>{student.email}</td>

                  <td>
                    {student.disabled
                      ? "Désactivé"
                      : "Actif"}
                  </td>

                  <td>

                    <button
                      onClick={() =>
                        handleEdit(student)
                      }
                    >
                      Modifier
                    </button>

                    <button
                      onClick={() =>
                        handleResetPassword(student.id)
                      }
                    >
                      Réinitialiser le mot de passe
                    </button>

                    {!student.disabled && (
                      <button
                        onClick={() =>
                          handleDisable(student.id)
                        }
                      >
                        Désactiver
                      </button>
                    )}

                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        )}

      </section>

    </div>
  );
}