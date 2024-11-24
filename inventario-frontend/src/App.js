import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Notificaciones from './components/Notificaciones'; // Importar el nuevo componente de Notificaciones

function App() {
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
                <Sidebar />
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
                <Sidebar />
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
                <Sidebar />
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
                <Sidebar />
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
                <Sidebar />
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
                <Sidebar />
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
                <Sidebar />
                <ListaUsuarios />
              </>
            </ProtectedRoute>
          }
        />
        {/* Ruta para Notificaciones */}
        <Route
          path="/notificaciones"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Sidebar />
                <Notificaciones />
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
