import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const validarEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email || !senha) {
    setErro('Preencha todos os campos.');
    return;
  }

  if (!validarEmail(email)) {
    setErro('Email inválido.');
    return;
  }

  try {
    const resposta = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      setErro('');
      localStorage.setItem('usuario', JSON.stringify({ email }));
      navigate('/home');
    } else {
      // Caso de erro: mostra mensagem e NÃO redireciona
      setErro(dados.mensagem || 'Email ou senha incorretos.');
    }
  } catch (error) {
    console.error(error);
    setErro('Erro ao conectar com o servidor.');
  }
};



  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Entrar</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          {erro && <p className="mensagem-erro">{erro}</p>}
          <button type="submit">Login</button>
        </form>
        <p className="texto-secundario">
            Não tem uma conta? <a href="/register">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}

