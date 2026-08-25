import { useState } from 'react';
import LoginPages from './LoginPage'; // Ton fichier LoginPage
import { useAuth } from '../../contexts/AuthContext'; // Ton contexte d'authentification

export default function LoginContainer() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // C'est cette fonction "login" de ton contexte qui change le token
    const { login } = useAuth();

    const handleLoginSubmit = async (e) => {
        // 1. On empêche le rechargement (déjà géré dans ton LoginPage, mais sécurisé ici aussi)
        setError('');

        try {
            // 2. On envoie l'email et le mot de passe au backend (port 3001 d'après ton OpenAPI)
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erreur de connexion');
            }

            // 3. ON ENREGISTRE LE TOKEN : C'est CETTE ligne magique qui va 
            // instantanément fermer le login et afficher ton StudentLayout !
            login(data.token);

        } catch (err) {
            setError(err.message || 'Identifiants invalides');
        }
    };

    return (
        <LoginPages
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            error={error}
            onSubmit={handleLoginSubmit} // <--- On relie la fonction ici
        />
    );
}