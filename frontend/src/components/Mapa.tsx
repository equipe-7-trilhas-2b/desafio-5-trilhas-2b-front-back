// src/components/Mapa.tsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import api from '../services/api';
import { Foco } from '../types/api';

// Correção para o ícone padrão do Leaflet no React
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const Mapa = () => {
  const [focos, setFocos] = useState<Foco[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const buscarFocos = async () => {
      try {
        setLoading(true);
        const response = await api.get<Foco[]>('/focos');
        setFocos(response.data);
      } catch (error) {
        console.error("Erro ao buscar focos:", error);
      } finally {
        setLoading(false);
      }
    };
    buscarFocos();
  }, []);

  if (loading) {
    return <div>Carregando mapa e focos...</div>;
  }

  return (
    <MapContainer center={[-5.5, -45.5]} zoom={6} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap'
      />
      {focos.map((foco) => (
        <Marker key={foco.id} position={[foco.latitude, foco.longitude]}>
          <Popup>
            <strong>{foco.municipio}</strong><br />
            Data: {new Date(foco.data_hora).toLocaleString('pt-BR')}<br />
            Risco de Fogo: {foco.risco_fogo || 'N/A'}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Mapa;