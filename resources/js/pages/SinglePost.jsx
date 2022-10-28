import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { LoadingContext } from '../components/loading/Loading'

const SinglePost = () => {
    const { id } = useParams()
    const [post, setPost] = useState({})
    const { setLoading } = useContext(LoadingContext)

    useEffect(() => {
        setLoading(true)

        window.axios.get('/api/posts/' + id)
        .then(resp => {
            setPost(resp.data)
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => setLoading(false))
    }, [id])

    return (
        <article className="article">
            <div className="article-title">
                <h1>{post.title}</h1>
            </div>
            <div className="article-img">
                <img src={post.image} title={post.title} alt={post.title} />
            </div>
            <div className="article-content">
                {post.content}
            </div>
        </article>
    )
}

export default SinglePost