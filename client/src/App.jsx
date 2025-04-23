import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LabelsPage } from "./pages/LabelsPage";
import { LabelsFormPage } from "./pages/LabelsFormPage";
import { Navigation } from "./components/Navigation";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/labels" />} />
        <Route path="/labels" element={<LabelsPage />} />
        <Route path="/labels-create" element={<LabelsFormPage />} />
        <Route path="/labels/:id" element={<LabelsFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
