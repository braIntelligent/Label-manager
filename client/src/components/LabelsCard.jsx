import { useNavigate } from "react-router-dom";

export function LabelsCard({ label }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/labels/${label.id}`);
      }}
      className="border-1 border-black-500 p-2 flex flex-col justify-center items-center m-2 tracking-widest cursor-pointer w-200 rounded-xl"
    >
      <h2><strong>Nombre:</strong>{label.nombre}</h2>
      <p><strong>ID:</strong> {label.id}</p>
      <p><strong>Email:</strong> {label.email}</p>
      <p><strong>Estado:</strong> {label.estado}</p>
      <p><strong>Forma:</strong> {label.forma}</p>
      <p><strong>Altura:</strong> {label.altura} cm</p>
      <p><strong>Ancho:</strong> {label.ancho} cm</p>
      <p><strong>Descripción:</strong> {label.descripcion}</p>
      <p><strong>Fecha pedido:</strong> {new Date(label.fecha_pedido).toLocaleString()}</p>
      {label.imagen && (
  <p>
    <strong>Imagen:</strong>{" "}
    <a
      href={label.imagen}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline hover:text-blue-800"
      onClick={(e) => e.stopPropagation()}
    >
      Ver imagen
    </a>
  </p>
)}

    </div>
  );
}
