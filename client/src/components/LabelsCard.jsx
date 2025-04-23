import { useNavigate } from "react-router-dom";

export function LabelsCard({ label }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "#101010",
        padding: "1rem",
        marginBottom: "1rem",
        borderRadius: "8px",
        cursor: "pointer",
        color: "#fff",
      }}
      onClick={() => {
        navigate(`/labels/${label.id}`);
      }}
    >
      <h2>{label.nombre}</h2>
      <p><strong>ID:</strong> {label.id}</p>
      <p><strong>Email:</strong> {label.email}</p>
      <p><strong>Estado:</strong> {label.estado}</p>
      <p><strong>Forma:</strong> {label.forma}</p>
      <p><strong>Altura:</strong> {label.altura} cm</p>
      <p><strong>Ancho:</strong> {label.ancho} cm</p>
      <p><strong>Descripción:</strong> {label.descripcion}</p>
      <p><strong>Fecha pedido:</strong> {new Date(label.fecha_pedido).toLocaleString()}</p>

      {label.imagen && (
        <div style={{ marginTop: "1rem" }}>
          <strong>Imagen:</strong>
          <br />
          <img
            src={`http://localhost:8000${label.imagen}`}
            alt="Etiqueta"
            style={{ maxWidth: "100%", height: "auto", marginTop: "0.5rem", borderRadius: "4px" }}
          />
        </div>
      )}

      <hr style={{ marginTop: "1rem", borderColor: "#444" }} />
    </div>
  );
}
