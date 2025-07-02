import { useState } from 'react';
import './Orientacoes.css';

export default function Orientacoes() {
  const [instruçãoAtiva, setInstruçãoAtiva] = useState<string | null>(null);

  const toggleInstrução = (nome: string) => {
    if (instruçãoAtiva === nome) {
      setInstruçãoAtiva(null);
    } else {
      setInstruçãoAtiva(nome);
    }
  };

  return (
    <div className="orientacoes">
      <header className="orientacoes-header">
        <button className="btn-voltar" onClick={() => window.history.back()}>
          ←
        </button>
        <h1>Orientações</h1>
      </header>

      <main className="orientacoes-content">
        <h2>Instruções</h2>

        <div className="orientacoes-btn">
          <button className="btn" onClick={() => toggleInstrução('mata')}>
            Prevenção na Mata e Campo ➜
          </button>
          <div
            className={`instrucoes-detalhe ${
              instruçãoAtiva === 'mata' ? 'ativo' : 'inativo'
            }`}
          >
            <ol>
              <li><strong>Evite queimadas intencionais:</strong> Não faça queimadas para limpeza ou manejo sem autorização. Queimadas descontroladas causam danos ambientais graves.</li>
              <li><strong>Fiscalize fogueiras e acampamentos:</strong> Se for acampar, mantenha fogueiras pequenas, afastadas da vegetação, e apague totalmente o fogo antes de sair.</li>
              <li><strong>Não jogue bitucas de cigarro ou fósforos acesos no chão:</strong> Eles podem iniciar incêndios facilmente, especialmente em períodos secos.</li>
            </ol>
        </div>


          <button className="btn" onClick={() => toggleInstrução('casa')}>
            Prevenção em Casa e Comunidade ➜
          </button>
          <div
            className={`instrucoes-detalhe ${
              instruçãoAtiva === 'casa' ? 'ativo' : 'inativo'
            }`}
          >
            <ol>
              <li><strong>Mantenha a fiação elétrica em bom estado:</strong> Faça revisões periódicas na instalação elétrica da casa, evitando sobrecargas, fios desencapados ou ligações improvisadas, que podem causar curtos-circuitos e incêndios.</li>
              <li><strong> Tenha extintores ou baldes de areia por perto:</strong> Mantenha equipamentos de combate a fogo, como extintores de incêndio adequados ou baldes de areia, em locais de fácil acesso, principalmente em cozinhas, áreas de serviço e locais com risco maior.</li>
              <li><strong>Mantenha produtos inflamáveis em local seguro:</strong> Guarde fósforos, isqueiros, produtos de limpeza inflamáveis e materiais combustíveis fora do alcance de crianças e longe de fontes de calor.
              </li>
            </ol>
          </div>

          <button className="btn" onClick={() => toggleInstrução('incendio')}>
            Em caso de Incêndio ➜
          </button>
          <div
            className={`instrucoes-detalhe ${
              instruçãoAtiva === 'incendio' ? 'ativo' : 'inativo'
            }`}
          >
            <ol>
              <li><strong>Mantenha a calma e saia imediatamente:</strong> Ao perceber o fogo, não perca tempo tentando salvar objetos. Priorize a sua vida e a das pessoas ao redor, saindo rapidamente pela rota de fuga mais segura.</li>
              <li><strong>Alerte outras pessoas e ligue para o Corpo de Bombeiros:</strong> Avise quem estiver próximo e, em segurança, ligue para o Corpo de Bombeiros pelo número 193. Informe o endereço com o máximo de detalhes.</li>
              <li><strong>Se ficar preso, sinalize sua presença</strong> Caso não consiga sair, procure um cômodo com janela, feche a porta, vede as frestas com panos molhados e sinalize sua localização para os bombeiros.
              </li>
            </ol>
          </div>
        </div>

        <h3>Artigos Relacionados</h3>
          <div className="artigos">
            <a href="https://www.gov.br/dnit/pt-br/assuntos/portais-tematicos/br-280-sc/noticias/queimadas-prevenir-e-melhor-que-combater" target="_blank" rel="noopener noreferrer" className="artigo">
              <img src="/prevencao.png" alt="Prevenção" />
              <p><strong>Queimadas: Prevenir é melhor que combater</strong></p>
            </a>
            <a href="https://agenciagov.ebc.com.br/noticias/202409/ministra-nisia-trindade-apresenta-novas-acoes-da-pasta-e-orientacoes-para-protecao-da-saude-diante-das-queimadas#:~:text=Confira%20outras%20recomenda%C3%A7%C3%B5es:,ou%20abd%C3%B4men%2C%20buscar%20atendimento%20m%C3%A9dico." target="_blank" rel="noopener noreferrer" className="artigo">
              <img src="/novasAcoes.jpeg" alt="Novas ações" />
              <p><strong>Governo apresenta novas ações de proteção à saúde diante das queimadas</strong></p>
            </a>
        </div>
      </main>
    </div>
  );
}
