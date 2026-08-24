import { useState } from "react"

function Courses() {
    const [courses, setCourses] = useState([
        {
            id: 1,
            code: "PROG2",
            name: "Programmation 2",
            description: "Programmation orientée objet"
        },
        {
            id: 2,
            code: "WEB2",
            name: "Web 2",
            description: "Développement web avec React"
        }
    ])

    function deleteCourse(id) {
        const newCourses = courses.filter(
            (course) => course.id !== id
        )

        setCourses(newCourses)
    }

    return (
        <div>
            <h1>Gestion des cours</h1>

            <button>
                Ajouter un cours
            </button>

            {courses.map((course) => (
                <div key={course.id}>

                    <h3>
                        {course.code} - {course.name}
                    </h3>

                    <p>
                        {course.description}
                    </p>

                    <button>
                        Modifier
                    </button>

                    <button
                        onClick={() =>
                            deleteCourse(course.id)
                        }
                    >
                        Supprimer
                    </button>

                </div>
            ))}
        </div>
    )
}

export default Courses