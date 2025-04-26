import { Box, Button, Container, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ 
        mt: 8, 
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3
      }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Sistema de Pedidos de Etiquetas
        </Typography>
        
        <Typography variant="h5" component="h2" gutterBottom>
          Bienvenido a nuestro servicio de diseño y producción de etiquetas
        </Typography>
        
        <Typography variant="body1" paragraph>
          Solicita tus etiquetas personalizadas o accede al panel de administración si eres parte de nuestro equipo.
        </Typography>
        
        <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
          <Button 
            variant="contained" 
            size="large" 
            component={Link} 
            to="/new-label"
          >
            Solicitar Etiqueta
          </Button>
          
          <Button 
            variant="outlined" 
            size="large" 
            component={Link} 
            to="/login"
          >
            Área de Administración
          </Button>
        </Stack>
        
        <Box sx={{ mt: 6, width: '100%' }}>
          <Typography variant="h6" gutterBottom>
            ¿Cómo funciona?
          </Typography>
          <Typography variant="body1" paragraph>
            1. Completa el formulario con los detalles de tu etiqueta<br />
            2. Nuestro equipo revisará tu solicitud<br />
            3. Recibirás un correo con la confirmación<br />
            4. Producimos y enviamos tus etiquetas
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;