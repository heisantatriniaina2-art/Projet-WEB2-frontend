import { useState } from "react"
import { useParams } from "react-router-dom"

function ExamResults() {
    const { id } = useParams()

    const [results] = useState([
        {
            id: 1,
            student: "Jean",
            score: 16,
            attempts: 1
        },
        {
            id: 2,
            student: "Paul",
            score: 12,
            attempts: 1
        },
        {
            id: 3,
            student: "Marie",
            score: 18,
            attempts: 1
        }
    ])

    const total = results.reduce(
        (sum, result) => sum + result.score,
        0
    )

    const average = total / results.length

    return (
        <div>
            <h1>Résultats de l'examen</h1>

            <p>
                Examen numéro : {id}
            </p>

            <h2>
                Moyenne : {average.toFixed(2)}
            </h2>

            <p>
                Nombre d'étudiants : {results.length}
            </p>

            {results.map((result) => (
                <div key={result.id}>

                    <h3>
                        {result.student}
                    </h3>

                    <p>
                        Note : {result.score}/20
                    </p>

                    <p>
                        Tentatives : {result.attempts}
                    </p>

                </div>
            ))}
        </div>
    )
}

export default ExamResults