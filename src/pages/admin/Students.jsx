import { useState } from "react"

function Students() {
    const [students, setStudents] = useState([
        {
            id: 1,
            name: "Jean",
            email: "jean@test.com",
            active: true
        },
        {
            id: 2,
            name: "Paul",
            email: "paul@test.com",
            active: true
        }
    ])

    function disableStudent(id) {
        const newStudents = students.map((student) => {
            if (student.id === id) {
                return {
                    ...student,
                    active: false
                }
            }

            return student
        })

        setStudents(newStudents)
    }

    return (
        <div>
            <h1>Gestion des étudiants</h1>

            <button>
                Ajouter un étudiant
            </button>

            {students.map((student) => (
                <div key={student.id}>

                    <h3>{student.name}</h3>

                    <p>Email : {student.email}</p>

                    <p>
                        Statut :{" "}
                        {student.active
                            ? "Actif"
                            : "Désactivé"}
                    </p>

                    <button>
                        Modifier
                    </button>

                    <button>
                        Réinitialiser le mot de passe
                    </button>

                    {student.active && (
                        <button
                            onClick={() =>
                                disableStudent(student.id)
                            }
                        >
                            Désactiver
                        </button>
                    )}

                </div>
            ))}
        </div>
    )
}

export default Students