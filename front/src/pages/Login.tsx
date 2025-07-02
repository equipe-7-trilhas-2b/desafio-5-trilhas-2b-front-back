import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home'); 
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Entrar</h1>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Senha" />
          <button type="submit">Login</button>
        </form>
        <p className="texto-secundario">
          Não tem uma conta? <a href="/register">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}
