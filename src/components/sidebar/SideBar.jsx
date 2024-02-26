import React, { useState } from 'react'
import '../sidebar/Sidebar.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button } from 'react-bootstrap';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="d-flex">
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <Button variant="dark" className="toggle-btn" onClick={toggleSidebar}>
          {isOpen ? 'Fechar Menu' : 'Abrir Menu'}
        </Button>
        <div className="sidebar-content">
          <ul className="list-group">
            <li className="list-group-item">Usuarios do Sistema</li>
            <li className="list-group-item">Pessoas</li>
          </ul>
          <div className="sidebar-footer">
            <hr className='text-secondary' />
            <i className='bi bi-person fs-5'></i>
            <span> Helysson</span>
          </div>
        </div>
      </div>
      <div className={`content ${isOpen ? 'shift-content' : ''}`}>
        {/* Conteúdo da sua página aqui */}
      </div>
    </div>
  );
};

export default Sidebar;