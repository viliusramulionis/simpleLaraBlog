import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LoadingContext } from '../../components/loading/Loading'
import { MessagesContext } from '../../components/messages/Messages'

const EditPost = () => {
    const [data, setData] = useState({
        title: '',
        content: '',
        image: ''
    })
    const { setLoading } = useContext(LoadingContext)
    const { setAlert } = useContext(MessagesContext)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        window.axios.get('/api/posts/' + id)
        .then(resp => {
            setData(resp.data)
        })
        .catch(err => {
            setAlert({ message: err.message, warning: true })
            console.log(err)
        })
        .finally(() => setLoading(false))
    }, [id, navigate])

    const handleData = (e) => {
        setData({...data, [e.target.name] : e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data)
        setLoading(true)
        window.axios.put('/api/posts/' + id, data)
        .then(resp => {
            navigate('/admin')
            setAlert({ message: resp.data })
        })
        .catch(err => {
            setAlert({ message: err.message, warning: true })
            console.log(err)
        })
        .finally(() => setLoading(false))
    }

    return (
        <article className="article">
            <h1>Edit Article</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Post Title:</label>
                    <input 
                        type="text" 
                        name="title" 
                        onChange={handleData} 
                        value={data.title}
                        className="form-control" 
                    /> 
                </div>
                <div className="mb-3">
                    <label>Post Content:</label>
                    <textarea 
                        name="content" 
                        onChange={handleData} 
                        className="form-control"
                        value={data.content}
                    >  
                    </textarea> 
                </div>
                <div className="mb-3">
                    <label>Featured Image:</label>
                    <input 
                        type="text" 
                        name="image" 
                        onChange={handleData} 
                        value={data.image}
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

export default EditPost