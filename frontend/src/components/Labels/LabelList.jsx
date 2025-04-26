import { useEffect, useState } from 'react'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Select, 
  MenuItem,
  Typography,
  Box,
  Button,
  IconButton
} from '@mui/material'
import LabelItem from './LabelItem'
import { getLabels } from '../../services/labels'
import PrintIcon from '@mui/icons-material/Print';

const LabelList = () => {
  const [labels, setLabels] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchLabels = async () => {
    try {
      const data = await getLabels()
      setLabels(data)
    } catch (error) {
      console.error('Error fetching labels:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLabels()
  }, [])

  const handlePrint = (label) => {
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head>
          <title>Pedido ${label.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; }
            .info { margin-bottom: 20px; }
            img { max-width: 300px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <h1>Detalle del Pedido #${label.id}</h1>
          <div class="info">
            <p><strong>Nombre:</strong> ${label.nombre}</p>
            <p><strong>Email:</strong> ${label.email}</p>
            <p><strong>Dimensiones:</strong> ${label.altura}cm x ${label.ancho}cm</p>
            <p><strong>Forma:</strong> ${label.forma}</p>
            <p><strong>Estado:</strong> ${label.estado}</p>
            <p><strong>Fecha:</strong> ${new Date(label.fecha_pedido).toLocaleDateString()}</p>
            <img src="${label.imagen}" alt="Diseño de etiqueta" />
          </div>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  if (loading) {
    return <Typography>Cargando etiquetas...</Typography>
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Listado de Etiquetas
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Dimensiones</TableCell>
              <TableCell>Forma</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Imagen</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {labels.map((label) => (
              <LabelItem 
                key={label.id} 
                label={label} 
                onUpdate={fetchLabels}
                onPrint={() => handlePrint(label)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default LabelList