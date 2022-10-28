import './bootstrap';
import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Posts from './pages/Posts'
import SinglePost from './pages/SinglePost'
import Dashboard from './pages/admin/Dashboard'
import AddNewPost from './pages/admin/AddNewPost'
import EditPost from './pages/admin/EditPost'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Loading from './components/loading/Loading'
import Messages from './components/messages/Messages'
import Auth from './context/Auth'

const App = () => {

    const [auth, setAuth] = useState({
        loggedIn: false,
        user: null
    })

    useEffect(() => {
        const storageAuth = localStorage.getItem('auth')
        
        if(!storageAuth) return
        
        window.axios.defaults.headers.common['Authorization'] = `Bearer ${storageAuth}`;

        window.axios.get('/api/check-auth')
        .then(resp => {
            console.log(resp)
            setAuth({ loggedIn: true, user: resp.data.user })
        })
    }, [])

    return (
        <Loading>
            <Auth.Provider value={{ auth, setAuth }}>
                <BrowserRouter>
                    <Header />
                    <main className="main">
                        <div className="container">
                            <Messages>
                                <Routes>
                                    <Route path="/" element={<Posts />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/post/:id" element={<SinglePost />} />
                                    {auth.loggedIn && 
                                        <>
                                            <Route path="/logout" element={<Logout />} />
                                            <Route path="/admin">
                                                <Route index element={<Dashboard />} />
                                                <Route path="new" element={<AddNewPost />} />
                                                <Route path="edit/:id" element={<EditPost />} />
                                            </Route>
                                        </>
                                    }
                                </Routes>
                            </Messages>
                        </div>
                    </main>
                </BrowserRouter>
            </Auth.Provider>
        </Loading>
    )
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}