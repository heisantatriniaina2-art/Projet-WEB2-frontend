import { useState } from "react"
import { useParams } from "react-router-dom"

function Questions() {
    const { id } = useParams()

    const [questions, setQuestions] = useState([
        {
            id: 1,
            statement: "Qu'est-ce que React ?",
            points: 2,
            choices: [
                {
                    id: 1,
                    text: "Une bibliothèque JavaScript",
                    correct: true
                },
                {
                    id: 2,
                    text: "Une base de données",
                    correct: false
                },
                {
                    id: 3,
                    text: "Un système d'exploitation",
                    correct: false
                }
            ]
        }
    ])

    return (
        <div>
            <h1>Questions</h1>

            <p>Examen numéro : {id}</p>

            <button>
                Ajouter une question
            </button>

            {questions.map((question) => (
                <div key={question.id}>

                    <h3>
                        {question.statement}
                    </h3>

                    <p>
                        Points : {question.points}
                    </p>

                    {question.choices.map((choice) => (
                        <div key={choice.id}>

                            <input
                                type="radio"
                                name={`question-${question.id}`}
                                checked={choice.correct}
                                readOnly
                            />

                            <span>
                                {choice.text}
                            </span>

                        </div>
                    ))}

                    <button>
                        Modifier
                    </button>

                    <button>
                        Supprimer
                    </button>

                </div>
            ))}
        </div>
    )
}

export default Questions