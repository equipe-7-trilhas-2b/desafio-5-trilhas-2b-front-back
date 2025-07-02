// Tipo para um único foco de incêndio (já deve existir)
export interface Foco {
    id: number;
    data_hora: string;
    bioma: string;
    risco_fogo: number | null;
    latitude: number;
    longitude: number;
    municipio: string;
  }
  
  // Tipo para o endpoint de resumo
  export interface ResumoEstatisticas {
    focos_ultimas_24h: number;
    municipio_mais_afetado_semana: {
      nome: string;
      total: number;
    };
    bioma_mais_afetado_semana: {
      bioma: string;
      total: number;
    };
  }
  
  // Tipo para cada item do ranking de municípios
  export interface RankingMunicipio {
    municipio: string;
    total_focos: number;
  }
  
  // Tipo para cada ponto do gráfico de histórico (como vem da API)
  export interface HistoricoDiarioAPI {
    dia: string;
    total_focos: number;
  }
  
  // Tipo para os dados formatados para o gráfico
  export interface HistoricoDiarioGrafico {
      dia: string;
      "Focos de Incêndio": number;
  }