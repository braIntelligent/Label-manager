import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createLabel } from "../../services/labels";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Alert,
  CircularProgress
} from "@mui/material";

const NewLabel = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    altura: "2",  // Valor inicial 2
    ancho: "2",   // Valor inicial 2
    forma: "rectangular",
    descripcion: "",
  });
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({...errors, [name]: ''});
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      if (errors.image) {
        setErrors({...errors, image: ''});
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) newErrors.nombre = "Nombre es requerido";
    if (!formData.email.trim()) newErrors.email = "Email es requerido";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Email no válido";
    
    if (!formData.altura) newErrors.altura = "Altura es requerida";
    else if (parseFloat(formData.altura) < 2) newErrors.altura = "Mínimo 2 cm";
    
    if (!formData.ancho) newErrors.ancho = "Ancho es requerido";
    else if (parseFloat(formData.ancho) < 2) newErrors.ancho = "Mínimo 2 cm";
    
    if (!image) newErrors.image = "Imagen es requerida";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append("nombre", formData.nombre.trim());
    data.append("email", formData.email.trim());
    data.append("altura", parseFloat(formData.altura));
    data.append("ancho", parseFloat(formData.ancho));
    data.append("forma", formData.forma);
    data.append("descripcion", formData.descripcion.trim());
    data.append("imagen", image);

    try {
      await createLabel(data);
      setSuccess(true);
      setTimeout(() => navigate("/", { state: { success: true } }), 4000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        Object.values(err.response?.data || {})[0]?.[0] ||
        "Error al enviar el pedido. Por favor intenta nuevamente.";
      setErrors({...errors, form: errorMessage});
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Nuevo Pedido de Etiqueta
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            ¡Pedido creado con éxito! Serás redirigido a la página principal.
          </Alert>
        )}

        {errors.form && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errors.form}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Nombre Completo"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            error={!!errors.nombre}
            helperText={errors.nombre}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <TextField
              margin="normal"
              required
              label="Altura (cm)"
              name="altura"
              type="number"
              value={formData.altura}
              onChange={handleChange}
              fullWidth
              inputProps={{ min: 2, step: "0.1" }}
              error={!!errors.altura}
              helperText={errors.altura}
            />

            <TextField
              margin="normal"
              required
              label="Ancho (cm)"
              name="ancho"
              type="number"
              value={formData.ancho}
              onChange={handleChange}
              fullWidth
              inputProps={{ min: 2, step: "0.1" }}
              error={!!errors.ancho}
              helperText={errors.ancho}
            />
          </Box>

          <FormControl fullWidth margin="normal">
            <InputLabel>Forma de la Etiqueta</InputLabel>
            <Select
              name="forma"
              value={formData.forma}
              label="Forma de la Etiqueta"
              onChange={handleChange}
            >
              <MenuItem value="circulo">Círculo</MenuItem>
              <MenuItem value="cuadrada">Cuadrada</MenuItem>
              <MenuItem value="cuadrada_redonda">
                Cuadrada con puntas redondas
              </MenuItem>
              <MenuItem value="ovalada">Ovalada</MenuItem>
              <MenuItem value="rectangular">Rectangular</MenuItem>
              <MenuItem value="rectangular_redonda">
                Rectangular con puntas redondas
              </MenuItem>
            </Select>
          </FormControl>

          <TextField
            margin="normal"
            fullWidth
            label="Descripción Adicional (Obligatorio)"
            name="descripcion"
            multiline
            rows={4}
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Especificaciones adicionales, colores, etc."
          />

          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Sube una imagen de referencia
            </Typography>
            <input
              accept="image/*"
              required
              style={{ display: "none" }}
              id="image-upload"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="image-upload">
              <Button variant="outlined" component="span">
                Seleccionar Imagen
              </Button>
            </label>
            {image && <Typography sx={{ mt: 1 }}>{image.name}</Typography>}
            {errors.image && (
              <Typography color="error" variant="caption" display="block">
                {errors.image}
              </Typography>
            )}
          </Box>

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Enviar Pedido"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NewLabel;