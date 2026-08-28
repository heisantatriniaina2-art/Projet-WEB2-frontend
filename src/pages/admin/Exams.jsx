import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Exams() {
  const navigate = useNavigate();

  const [exams, setExams] = useState([
    {
      id: 1,
      title: "Final Exam",
      courseCode: "PROG2",
      description: "Assessment covering chapters 1 to 5.",
      startDate: "2026-08-30T09:00",
      endDate: "2026-08-30T11:00",
    },
    {
      id: 2,
      title: "Continuous Assessment",
      courseCode: "WEB2",
      description: "Assessment on web development.",
      startDate: "2026-09-02T10:00",
      endDate: "2026-09-02T12:00",
    },
  ]);

  const courses = [
    { code: "PROG2", name: "Programming 2" },
    { code: "WEB2", name: "Web Development" },
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
      alert("Please fill in all fields.");
      return;
    }

    if (new Date(endDate) <= new Date(startDate)) {
      alert("End date must be after the start date.");
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
      alert("Please fill in all fields.");
      return;
    }

    if (new Date(endDate) <= new Date(startDate)) {
      alert("End date must be after the start date.");
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
      "Are you sure you want to delete this exam?"
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
    return date.toLocaleString("en-US", {
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
          <h1>Exam Management</h1>
          <p>Create and manage exams associated with courses.</p>
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
          + Add Exam
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h2>
            {editingExam ? "Edit Exam" : "Add Exam"}
          </h2>

          <form onSubmit={editingExam ? handleUpdate : handleAdd}>
            <div className="form-group">
              <label>Title</label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Example: Final Exam"
              />
            </div>

            <div className="form-group">
              <label>Course</label>

              <select
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
              >
                <option value="">-- Select a course --</option>
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
                placeholder="Exam description"
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>Start</label>

              <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>End</label>

              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="primary-button">
                {editingExam
                  ? "Save Changes"
                  : "Create Exam"}
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
              <th>Title</th>
              <th>Course</th>
              <th>Start</th>
              <th>End</th>
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
                      Edit
                    </button>

                    <button
                      className="action-button danger"
                      onClick={() => handleDelete(exam.id)}
                    >
                      Delete
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
                      Results
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {exams.length === 0 && (
          <p className="empty-message">No exams recorded.</p>
        )}
      </div>
    </div>
  );
}

export default Exams;