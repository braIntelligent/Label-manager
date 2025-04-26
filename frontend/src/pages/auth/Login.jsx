import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../services/auth'
import { 
  Container, 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Alert,
  CircularProgress
} from '@mui/material'

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const data = await login(credentials)
      localStorage.setItem('accessToken', data.access)
      localStorage.setItem('refreshToken', data.refresh)
      navigate('/admin/labels')
    } catch (err) {
      setError('Credenciales incorrectas')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{ 
        mt: 8, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}>
        <Typography component="h1" variant="h5">
          Panel de Administración
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <TextField
            margin="normal"
            required
            fullWidth
            label="Usuario"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            autoFocus
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            label="Contraseña"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Iniciar Sesión'}
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Login