import axios from 'axios'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoadingContext } from '../components/loading/Loading'
import { MessagesContext } from '../components/messages/Messages'
import AuthContext from '../context/Auth'

const Login = () => {
    const [data, setData] = useState({})
    const { setLoading } = useContext(LoadingContext)
    const { setAuth } = useContext(AuthContext)
    const { setAlert } = useContext(MessagesContext)
    const navigate = useNavigate()

    const handleData = (e) => {
        setData({...data, [e.target.name] : e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        setLoading(true)
        window.axios.post('/api/login/', data)
        .then(resp => {
            if(resp.data.token) {
                setAlert({ message: 'Login successfull' })
                setAuth({
                    loggedIn: true,
                    user: resp.data.user
                })
                localStorage.setItem('auth', resp.data.token)
                window.axios.defaults.headers.common['Authorization'] = `Bearer ${resp.data.token}`;
                navigate('/admin')
            }
        })
        .catch(err => {
            setAlert({ message: err.message, warning: true })
            console.log(err)
        })
        .finally(() => setLoading(false))
    }

    return (
        <article className="article login">
            <h1>Please Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Email address:</label>
                    <input 
                        type="email" 
                        name="email" 
                        onChange={handleData} 
                        className="form-control" 
                    /> 
                </div>
                <div className="mb-3">
                    <label>Password:</label>
                    <input 
                        type="password" 
                        name="password" 
                        onChange={handleData} 
                        className="form-control" 
                    /> 
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </article>
    )
}

export default Login