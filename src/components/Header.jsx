import "../styles/header.css"
import { Link } from "react-router"

function Header() {

  return (
    <header>
      <Link to="/" className="logo">Filmly</Link>
      <nav>
        <Link to="/" className="nav-link">Dashboard</Link>
        <Link to="/saved" className="nav-link">Saved</Link>
      </nav>
    </header>
  )
}

export default Header
