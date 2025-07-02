import './AlertaRiscos.css';

export default function AlertaRiscos() {
  return (
    <div className="alerta-riscos">
      <header className="alerta-header">
        <button className="btn-voltar" onClick={() => window.history.back()}>
          ←
        </button>
        <h1>Alerta de Riscos</h1>
      </header>

      <main className="alerta-conteudo">
        <div className="alerta-cards">
          <div className="card">
            <p>Cidades em Risco Crítico de Queimadas</p>
            <h2>159</h2>
          </div>
          <div className="card">
            <p>Aumento de queimadas em relação a 2023</p>
            <h2>32,59%</h2>
          </div>
        </div>

        <div className="alerta-grafico">
          <img src="/grafico-queimadas.png" alt="Gráfico de focos de queimadas no Maranhão" />
        </div>

        <div className="alerta-ranking">
          <h3>Ranking de municípios com mais queimadas</h3>
          <table>
            <thead>
              <tr>
                <th>Município</th>
                <th>% dos Focos de Incêndio<br/>(Jan-Set/2024)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mirador</td>
                <td>9,5%</td>
              </tr>
              <tr>
                <td>Balsas</td>
                <td>8,4%</td>
              </tr>
              <tr>
                <td>Fernando Falcão</td>
                <td>6,2%</td>
              </tr>
              <tr>
                <td>Alto Parnaíba</td>
                <td>4,6%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="alerta-periodo">
          <h3>Período Crítico</h3>
          <p>
            Julho a Novembro (seca) — aumento da temperatura, baixa umidade e ventos fortes
            contribuem para o risco de incêndios florestais.
            <h3>Principais Causas</h3>
            <ul>
              <li>Expansão Agrícolas</li>
              <li>Desmatamento</li>
              <li>Práticas de Limpeza de Pastagem</li>
            </ul>
          </p>
        </div>
      </main>
    </div>
  );
}
