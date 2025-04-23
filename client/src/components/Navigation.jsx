import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <div>
      <Link to="/labels">
        <h1>Labels App</h1>
      </Link>
      <Link to="/labels-create">Create Labels</Link>
    </div>
  );
}
