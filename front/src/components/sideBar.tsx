import './Sidebar.css';

interface Props {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: Props) {
  return (
    <nav className={`sidebar ${isOpen ? '' : 'closed'}`}>
      <ul>
        <li><a href="/orientacoes">🧭 Orientações</a></li>
        <li><a href="/alerta-riscos">🚨 Alerta de Risco</a></li>
        <li><a href="#">🎮 Jogo</a></li>
      </ul>
    </nav>
  );
}
