import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/Productos/Dashboard';
import GestionProductos from './components/Productos/GestionProductos';
import CrearProducto from './components/Productos/CrearProductos';
import EditarProducto from './components/Productos/EditarProducto';
import ListaProductos from './components/Productos/ListaProductos';
import GestionUsuarios from './components/Usuario/GestionUsuarios';
import ListaUsuarios from './components/Usuario/Listausuario';
import ProtectedRoute from './components/ProtectedRoute';
import Notificaciones from './components/Notificaciones';

function App() {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const response = await axios.get('https://tu-backend-url/gestion/notificaciones', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setNotificaciones(response.data);
      } catch (error) {
        console.error('Error al cargar notificaciones:', error);
      }
    };
    fetchNotificaciones();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas privadas */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Sidebar notificaciones={notificaciones} />
                <Dashboard />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/notificaciones"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Sidebar notificaciones={notificaciones} />
                <Notificaciones
                  notificaciones={notificaciones}
                  setNotificaciones={setNotificaciones}
                />
              </>
            </ProtectedRoute>
          }
        />
        {/* Otras rutas */}
      </Routes>
    </Router>
  );
}

export default App;
