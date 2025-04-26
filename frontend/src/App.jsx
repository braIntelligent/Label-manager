import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/Layout/PrivateRoute'
import Login from './pages/Auth/Login'
import LabelsPage from './pages/admin/LabelPage'
import NewLabel from './pages/public/NewLabel';
import Home from './pages/Home'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'


const theme = createTheme()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new-label" element={<NewLabel />} />
          <Route 
            path="/admin/labels" 
            element={
              <PrivateRoute>
                <LabelsPage />
              </PrivateRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App