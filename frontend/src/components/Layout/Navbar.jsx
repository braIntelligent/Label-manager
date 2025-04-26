import { Button, AppBar, Toolbar, Typography } from '@mui/material'
import { logout } from '../../services/auth'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Admin Etiquetas
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar