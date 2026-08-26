import { useState } from "react"
import { Link } from "react-router-dom"

function Exams() {
    const [exams, setExams] = useState([
        {
            id: 1,
            title: "Examen React",
            description: "Examen sur les bases de React",
            course: "WEB2",
            start: "2026-08-25 08:00",
            end: "2026-08-25 10:00"
        },
        {
            id: 2,
            title: "Examen Java",
            description: "Examen de programmation Java",
            course: "PROG2",
            start: "2026-08-26 09:00",
            end: "2026-08-26 11:00"
        }
    ])

    function deleteExam(id) {
        const newExams = exams.filter(
            (exam) => exam.id !== id
        )

        setExams(newExams)
    }

    return (
        <div>
            <h1>Gestion des examens</h1>

            <button>
                Créer un examen
            </button>

            {exams.map((exam) => (
                <div key={exam.id}>

                    <h3>{exam.title}</h3>

                    <p>
                        Cours : {exam.course}
                    </p>

                    <p>
                        {exam.description}
                    </p>

                    <p>
                        Début : {exam.start}
                    </p>

                    <p>
                        Fin : {exam.end}
                    </p>

                    <Link
                        to={`/admin/exams/${exam.id}/questions`}
                    >
                        Questions
                    </Link>

                    {" "}

                    <Link
                        to={`/admin/exams/${exam.id}/results`}
                    >
                        Résultats
                    </Link>

                    {" "}

                    <button>
                        Modifier
                    </button>

                    <button
                        onClick={() =>
                            deleteExam(exam.id)
                        }
                    >
                        Supprimer
                    </button>

                </div>
            ))}
        </div>
    )
}

export default Exams