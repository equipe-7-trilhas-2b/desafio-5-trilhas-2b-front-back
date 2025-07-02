import './Login.css';

export default function Register() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Cadastro</h1>
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Senha" />
          <input type="password" placeholder="Confirme a senha" />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}