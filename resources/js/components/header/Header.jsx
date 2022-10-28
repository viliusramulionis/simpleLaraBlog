import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/Auth'

const Header = () => {
    const { auth } = useContext(AuthContext)

    return (
        <header className="py-3 mb-4 border-bottom bg-white">
            <div className="container d-flex flex-wrap justify-content-center">
                <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                    <span className="fs-4">Šarūno Vabolio svaičiojimai apie gyvenimą</span>
                </Link>

                <ul className="nav nav-pills">
                    <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                    {auth.loggedIn ? 
                        <>
                            <li className="nav-item"><Link to="/admin" className="nav-link">Admin</Link></li>
                            <li className="nav-item"><Link to="/logout" className="nav-link">Logout</Link></li>
                        </>
                    : 
                        <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
                    }
                </ul>
            </div>
        </header>
    )
}   

export default Header