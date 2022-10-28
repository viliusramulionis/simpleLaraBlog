import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/Auth'
import { MessagesContext } from '../components/messages/Messages'

const Logout = () => {
    const navigate = useNavigate()
    const { setAuth } = useContext(AuthContext)
    const { setAlert } = useContext(MessagesContext)

    useEffect(() => {
        window.axios.get('/api/logout')
        .then(resp => setAlert({ message: resp.data }))
        .finally(() => {
            navigate('/')
            setAuth({ loggedIn: false, user: null })
            localStorage.removeItem('auth')
        })
    }, [])

    return false
}

export default Logout