import './topBar.css';
import { useNavigate } from 'react-router-dom';

interface Props {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export default function TopBar({ toggleSidebar, isSidebarOpen }: Props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  return (
    <header className="top-bar">
  <button
    className="menu-button"
    onClick={toggleSidebar}
    title={isSidebarOpen ? 'Fechar menu' : 'Abrir menu'}
  >
    {isSidebarOpen ? '←' : '☰'}
  </button>
  <button
    className="logout-button"
    onClick={handleLogout}
    title="Sair"
  >
    🔙 
  </button>
</header>

  );
}
