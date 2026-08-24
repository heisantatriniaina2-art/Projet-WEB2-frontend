import React from 'react';
import './LoginPage.css';

function LoginPages({ email, setEmail, password, setPassword, error, onSubmit }) {
    return (
        <div className='login'>
            <h1>Connexion</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={onSubmit}>
                <div>
                    <label>Email :</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Mot de passe :</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">
                    Se connecter
                </button>
            </form>
        </div>
    );
}

export default LoginPages;