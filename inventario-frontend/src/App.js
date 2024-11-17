import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Productos/Dashboard';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import GestionProductos from './components/Productos/GestionProductos';
import CrearProductos from './components/Productos/CrearProductos';
import ListaProductos from './components/Productos/ListaProductos';
import EditarProducto from './components/Productos/EditarProducto';
import GestionUsuarios from './components/Usuario/GestionUsuarios';
import ListaUsuarios from './components/Usuario/Listausuario';
import Login from './components/login';
import Register from './components/register';

function App() {
  // Función para verificar si el usuario está autenticado
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {/* Sidebar solo si está autenticado */}
        {isAuthenticated() && <Sidebar />}

        <div style={{ flexGrow: 1 }}>
          {/* Navbar solo si está autenticado */}
          {isAuthenticated() && <Navbar />}

          <Routes>
            {/* Ruta de Login */}
            <Route
              path="/login"
              element={!isAuthenticated() ? <Login /> : <Navigate to="/" />}
            />

            {/* Ruta de Registro */}
            <Route
              path="/register"
              element={!isAuthenticated() ? <Register /> : <Navigate to="/" />}
            />

            {/* Rutas protegidas */}
            {isAuthenticated() ? (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/productos" element={<GestionProductos />} />
                <Route path="/productos/crear" element={<CrearProductos />} />
                <Route path="/productos/lista" element={<ListaProductos />} />
                <Route path="/productos/editar" element={<EditarProducto />} />
                <Route path="/usuarios" element={<GestionUsuarios />} />
                <Route path="/usuarios/lista" element={<ListaUsuarios />} />
              </>
            ) : (
              // Si no está autenticado, redirigir al login
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
