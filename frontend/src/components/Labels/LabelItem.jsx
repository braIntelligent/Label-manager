import { useState } from 'react'
import { 
  TableRow, 
  TableCell, 
  Select, 
  MenuItem,
  IconButton,
  Link
} from '@mui/material'
import PrintIcon from '@mui/icons-material/Print'
import { updateLabelStatus } from '../../services/labels'

const LabelItem = ({ label, onUpdate, onPrint }) => {
  const [status, setStatus] = useState(label.estado)

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value
    setStatus(newStatus)
    try {
      await updateLabelStatus(label.id, newStatus)
      onUpdate() // Actualizar la lista después de cambiar el estado
    } catch (error) {
      console.error('Error updating status:', error)
      setStatus(label.estado)
    }
  }

  return (
    <TableRow>
      <TableCell>{label.nombre}</TableCell>
      <TableCell>{label.email}</TableCell>
      <TableCell>{label.altura}x{label.ancho}</TableCell>
      <TableCell>{label.forma.replace(/_/g, ' ')}</TableCell>
      <TableCell>
        <Select
          value={status}
          onChange={handleStatusChange}
          size="small"
        >
          <MenuItem value="pendiente">Pendiente</MenuItem>
          <MenuItem value="en_produccion">En producción</MenuItem>
          <MenuItem value="enviada">Enviada</MenuItem>
          <MenuItem value="entregada">Entregada</MenuItem>
          <MenuItem value="cancelada">Cancelada</MenuItem>
        </Select>
      </TableCell>
      <TableCell>
        {new Date(label.fecha_pedido).toLocaleDateString()}
      </TableCell>
      <TableCell>
        {label.imagen && (
          <Link 
            href={label.imagen} 
            target="_blank" 
            rel="noopener"
          >
            Ver imagen
          </Link>
        )}
      </TableCell>
      <TableCell>
        <IconButton onClick={onPrint} color="primary">
          <PrintIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default LabelItem