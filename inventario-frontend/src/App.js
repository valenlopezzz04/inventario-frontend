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
import Notificaciones from './components/Notificaciones'; // Ruta corregida

const backendUrl = 'https://inventario-backend-1.onrender.com';

function App() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  // Cargar notificaciones desde el backend
  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const response = await axios.get(backendUrl, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setNotificaciones(response.data);
      } catch (error) {
        console.error('Error al cargar notificaciones:', error);
      }
    };
    fetchNotificaciones();
  }, []);

  // Mostrar alerta cuando se recibe una nueva notificación
  useEffect(() => {
    if (notificaciones.length > 0) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000); // Ocultar alerta después de 5 segundos
    }
  }, [notificaciones]);

  return (
    <Router>
      <div style={{ display: 'flex' }}>
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
            path="/productos"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Sidebar notificaciones={notificaciones} />
                  <GestionProductos />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/productos/crear"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Sidebar notificaciones={notificaciones} />
                  <CrearProducto />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/productos/editar"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Sidebar notificaciones={notificaciones} />
                  <EditarProducto />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/productos/lista"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Sidebar notificaciones={notificaciones} />
                  <ListaProductos />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/usuarios"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Sidebar notificaciones={notificaciones} />
                  <GestionUsuarios />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/usuarios/lista"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Sidebar notificaciones={notificaciones} />
                  <ListaUsuarios />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/Notificaciones"
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
        </Routes>
        {/* Mostrar alerta visual */}
        {showAlert && (
          <div
            style={{
              position: 'fixed',
              bottom: 20,
              right: 20,
              backgroundColor: '#ff9800',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '5px',
              zIndex: 1000,
            }}
          >
            ¡Stock insuficiente! Revisa las notificaciones.
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
