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

const backendUrl = 'https://inventario-backend-1.onrender.com'; // Cambia esto si tu URL es diferente

function App() {
  const [notificaciones, setNotificaciones] = useState([]);

  // Obtener notificaciones desde el backend
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

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar notificaciones={notificaciones} />
        <div style={{ flex: 1 }}>
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
                    <Notificaciones
                      notificaciones={notificaciones}
                      setNotificaciones={setNotificaciones}
                    />
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
