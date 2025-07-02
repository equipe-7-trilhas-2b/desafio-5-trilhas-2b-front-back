// src/components/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import api from '../services/api'; // Certifique-se que você tem o services/api.ts
import { ResumoEstatisticas, RankingMunicipio, HistoricoDiarioAPI, HistoricoDiarioGrafico } from '../types/api';
import './Dashboard.css'; // Vamos criar este arquivo para estilização

const Dashboard = () => {
  const [resumo, setResumo] = useState<ResumoEstatisticas | null>(null);
  const [ranking, setRanking] = useState<RankingMunicipio[]>([]);
  const [historico, setHistorico] = useState<HistoricoDiarioGrafico[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        setLoading(true);
        // Usamos Promise.all para buscar todos os dados em paralelo
        const [resumoRes, rankingRes, historicoRes] = await Promise.all([
          api.get<ResumoEstatisticas>('/estatisticas/resumo'),
          api.get<RankingMunicipio[]>('/estatisticas/ranking-municipios'),
          api.get<HistoricoDiarioAPI[]>('/estatisticas/historico-diario')
        ]);
        
        setResumo(resumoRes.data);
        setRanking(rankingRes.data);
        
        // Formata os dados do histórico para o formato que o gráfico espera
        const dadosFormatados = historicoRes.data.map(item => ({
          dia: new Date(item.dia).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
          "Focos de Incêndio": item.total_focos,
        }));
        setHistorico(dadosFormatados);

      } catch (err) {
        setError("Não foi possível carregar os dados do dashboard.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    buscarDados();
  }, []);

  if (loading) {
    return <div className="dashboard-container">Carregando estatísticas...</div>;
  }

  if (error) {
    return <div className="dashboard-container">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <h2>Dashboard de Monitoramento</h2>
      
      {/* Indicadores Rápidos */}
      <div className="resumo-cards">
        <div className="card">
          <h3>{resumo?.focos_ultimas_24h}</h3>
          <p>Focos (24h)</p>
        </div>
        <div className="card">
          <h3>{resumo?.municipio_mais_afetado_semana.nome || 'N/A'}</h3>
          <p>Município Destaque (Semana)</p>
        </div>
        <div className="card">
          <h3>{resumo?.bioma_mais_afetado_semana.bioma || 'N/A'}</h3>
          <p>Bioma Destaque (Semana)</p>
        </div>
      </div>
      
      <div className="dashboard-graficos">
        {/* Ranking de Municípios */}
        <div className="ranking-container">
          <h3>Top 10 Municípios (7 dias)</h3>
          <ol>
            {ranking.map(item => (
              <li key={item.municipio}>
                <span>{item.municipio}</span>
                <span>{item.total_focos} focos</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Gráfico Histórico */}
        <div className="grafico-container">
          <h3>Histórico de Focos (30 dias)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={historico} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dia" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Focos de Incêndio" fill="#d95f02" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;