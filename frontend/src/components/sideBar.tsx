import './Sidebar.css';

interface Props {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: Props) {
  return (
    <nav className={`sidebar ${isOpen ? '' : 'closed'}`}>
      <ul>
        <li><a href="#"> Orientações</a></li>
        <li><a href="#"> Alerta de Risco</a></li>
        <li><a href="#"> Jogo</a></li>
      </ul>
    </nav>
  );
}
