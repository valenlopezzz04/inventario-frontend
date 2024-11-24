import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

const backendUrl = 'https://inventario-backend-1.onrender.com'; // URL del backend

const Auditorias = () => {
  const [auditorias, setAuditorias] = useState([]);
  const [filteredAuditorias, setFilteredAuditorias] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAuditorias = async () => {
      try {
        const response = await axios.get(`${backendUrl}/gestion/auditorias`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setAuditorias(response.data);
        setFilteredAuditorias(response.data); // Inicializar los datos filtrados
      } catch (error) {
        console.error("Error al cargar registros de auditoría:", error);
      }
    };
    fetchAuditorias();
  }, []);

  // Filtro dinámico por búsqueda
  useEffect(() => {
    const filtered = auditorias.filter((item) =>
      item.tipoEvento.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredAuditorias(filtered);
  }, [search, auditorias]);

  return (
    <div style={{padding: 3, marginLeft: '240px' }}>
      <Typography variant="h4" gutterBottom>
        Registros de Auditoría
      </Typography>
      <TextField
        label="Buscar por Tipo de Evento"
        variant="outlined"
        fullWidth
        style={{ marginBottom: "20px" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: "#001E3C", padding: 3, marginLeft: '240px' }}>
            <TableRow>
              <TableCell style={{ color: "#fff", fontWeight: "bold" }}>Tipo de Evento</TableCell>
              <TableCell style={{ color: "#fff", fontWeight: "bold" }}>Detalles</TableCell>
              <TableCell style={{ color: "#fff", fontWeight: "bold" }}>Fecha</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAuditorias.map((auditoria) => (
              <TableRow key={auditoria._id}>
                <TableCell>{auditoria.tipoEvento}</TableCell>
                <TableCell>{JSON.stringify(auditoria.detalles, null, 2)}</TableCell>
                <TableCell>{new Date(auditoria.fecha).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Auditorias;
