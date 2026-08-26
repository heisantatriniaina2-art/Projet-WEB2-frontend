import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";

function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const data = await loginRequest(email, password);

            console.log("Connexion réussie :", data);
            login(data);

            if (data.user.role === "admin") {
                navigate("/admin");
            } else if (data.user.role === "student") {
                navigate("/student");
            }

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Exam Hub</h1>
            <h2>Connexion</h2>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Email</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Votre email"
                        required
                    />
                </div>

                <div>
                    <label>Mot de passe</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Votre mot de passe"
                        required
                    />
                </div>

                {error && (
                    <p>{error}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Connexion..." : "Se connecter"}
                </button>

            </form>
        </div>
    );
}

export default Login;