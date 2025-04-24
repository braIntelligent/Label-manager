import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <div className="flex items-center justify-between p-4 border-1 border-blue-600">
      <Link to="/labels-create">Pedir Etiqueta</Link>
      <Link to="/labels">etiquetas</Link>
    </div>
  );
}
