  import './topBar.css';

  interface Props {
    toggleSidebar: () => void;
    isSidebarOpen: boolean;
  }

  export default function TopBar({ toggleSidebar, isSidebarOpen }: Props) {
    return (
      <header className="top-bar">
  <button className="menu-button" onClick={toggleSidebar} title={isSidebarOpen ? "Fechar menu" : "Abrir menu"}>
    {isSidebarOpen ? '←' : '☰'}
  </button>
  <a href="/perfil" className="profile-icon" title="Perfil">👤</a>
</header>
    );
  }
