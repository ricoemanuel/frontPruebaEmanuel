import React, { useState } from 'react';
import './main.css';
import Solicitudes from '../solicitudes/solicitudes';
import Empleados from '../empleados/empleados';

const Main = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser);
  const [currentTab, setCurrentTab] = useState('solicitudes');

 

  return (
    <div className="main-container">
      <div className="tabs">
        <button className={currentTab === 'solicitudes' ? 'active' : ''} onClick={() => setCurrentTab('solicitudes')}>
          Solicitudes
        </button>
        {user.rol!="empleado" && (
          <button className={currentTab === 'empleados' ? 'active' : ''} onClick={() => setCurrentTab('empleados')}>
            Empleados
          </button>
        )}
      </div>
      {currentTab === 'solicitudes' && <Solicitudes user={user} />}
      {user.rol!="empleado" && currentTab === 'empleados' && <Empleados user={user} />}
    </div>
  );
};

export default Main;
