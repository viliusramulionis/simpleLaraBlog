import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { LoadingContext } from '../../components/loading/Loading'
import { MessagesContext } from '../../components/messages/Messages'

const Dashboard = () => {
    const [data, setData] = useState([])
    const [refresh, setRefresh] = useState(false)
    const { setLoading } = useContext(LoadingContext)
    const { setAlert } = useContext(MessagesContext)

    useEffect(() => {
        setLoading(true)

        window.axios.get('/api/posts/')
        .then(resp => setData(resp.data))
        .catch(err => {
            setAlert({ message: err.message, warning: true })
            console.log(err)
        })
        .finally(() => setLoading(false))
    }, [refresh])

    const handleDelete = (id) => {
        if( !confirm('Do your really want to delete it?') ) return

        setLoading(true)

        window.axios.delete('/api/posts/' + id)
        .then(resp => {
            setRefresh(prev => !prev)
            setAlert({ message: resp.data })
        })
        .catch(err => {
            setAlert({ message: err.message, warning: true })
            console.log(err)
        })
    }

    return (
        <article className="article">
            <div className="d-flex align-items-center justify-content-between">
                <h1>Articles list</h1>
                <Link to="/admin/new" className="btn btn-success">New Article</Link>
            </div>
            {data.length > 0 ? 
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Date Created</th>
                            <th>Date Modified</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(post => 
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{post.user?.name}</td>
                                <td>{new Date(post.created_at).toLocaleDateString('en-US') + ' ' + new Date(post.created_at).toLocaleTimeString('en-US')}</td>
                                <td>{new Date(post.updated_at).toLocaleDateString('en-US') + ' ' + new Date(post.updated_at).toLocaleTimeString('en-US')}</td>
                                <td>
                                    <Link to={'/admin/edit/' + post.id} className="btn btn-primary btn-sm me-3">Edit</Link>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(post.id)}>Delete</button>
                                </td>
                            </tr>    
                        )}
                    </tbody>
                </table>
            : 
                <h5 className="mt-3">No record found</h5>
            }
        </article>
    )
}

export default Dashboard