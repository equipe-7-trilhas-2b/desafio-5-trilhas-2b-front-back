import { useState } from 'react';
import TopBar from '../components/topBar';
import Sidebar from '../components/sideBar';
import './home.css';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
  <div className="app-layout">
    <Sidebar isOpen={sidebarOpen} />

    <div className="main-content">
      <TopBar toggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen} />

      <main className="content">
        <section className="mapa">
          <h2>MAPA DO MARANHÃO</h2>
        </section>

        <section className="noticias">
          <h3 className="noticiasTitle">Notícias relacionadas</h3>

          <div className="noticias-duplas">
            <div className="noticia">
              <img src="./queimada1-ma.webp" alt="Imagem da notícia 1" />
              <p>
                <a
                  href="https://g1.globo.com/ma/maranhao/noticia/2020/08/05/queimadas-no-maranhao-cresceram-73percent-em-julho-aponta-inpe.ghtml"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Queimadas no Maranhão cresceram 73% em julho, aponta Inpe | Maranhão | G1
                </a>
              </p>
            </div>

            <div className="noticia">
              <img src="./queimada2-ma.png" alt="Imagem da notícia 2" />
              <p>
                <a
                  href="https://imperatriznoticias.ufma.br/maranhao-registra-aumento-de-22-dos-incendios-florestais-em-novembro-comparado-a-2023/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Maranhão registra aumento de 22% dos incêndios florestais em novembro, comparado a 2023
                </a>
              </p>
            </div>
          </div>
        </section>

        <section className="contatos">
          <h3>Contatos de emergência</h3>

          <div className="icones-contato">
            <a href="tel:193" className="contato-item">
              <img src="/bombeiros.png" alt="Bombeiros" />
              <span>Bombeiros</span>
            </a>
            <a href="tel:190" className="contato-item">
              <img src="/pm.png" alt="Polícia Militar" />
              <span>Polícia Militar</span>
            </a>
            <a href="tel:192" className="contato-item">
              <img src="/samu.png" alt="SAMU" />
              <span>SAMU</span>
            </a>
            <a
              href="https://www.gov.br/midr/pt-br/defesa-civil"
              target="_blank"
              rel="noopener noreferrer"
              className="contato-item"
            >
              <img src="/defesacvl.png" alt="Defesa Civil" />
              <span>Defesa Civil</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  </div>
);
}


