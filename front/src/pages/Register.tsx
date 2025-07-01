import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Reaproveitando o estilo

export default function Register() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const validarEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !senha || !confirmaSenha) {
      setErro('Preencha todos os campos.');
      return;
    }

    if (!validarEmail(email)) {
      setErro('Email inválido.');
      return;
    }

    if (senha !== confirmaSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    try {
      const resposta = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        setErro('');
        alert('Cadastro realizado com sucesso! Faça login.');
        navigate('/'); // Volta para a tela de login
      } else {
        setErro(dados.mensagem || 'Erro ao cadastrar usuário.');
      }
    } catch (error) {
      console.error(error);
      setErro('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Cadastro</h1>
        <form onSubmit={handleRegister}>
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
          <input
            type="password"
            placeholder="Confirme a senha"
            value={confirmaSenha}
            onChange={(e) => setConfirmaSenha(e.target.value)}
          />
          {erro && <p className="mensagem-erro">{erro}</p>}
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
