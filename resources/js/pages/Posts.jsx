import { useState, useEffect, useContext } from 'react'
import Post from '../components/post/Post'
import { LoadingContext } from '../components/loading/Loading'

const Posts = () => {
    const [posts, setPosts] = useState([])
    const { setLoading } = useContext(LoadingContext)

    useEffect(() => {
        setLoading(true)

        window.axios.get('/api/posts')
        .then(resp => {
            setPosts(resp.data)
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => setLoading(false))
    }, [])

    return (
        <section className="section gray-bg" id="blog">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7 text-center">
                        <div className="section-title">
                            <h2>Latest News</h2>
                            <p>I design and develop services for customers of all sizes, specializing in creating stylish, modern websites</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {posts.map(data => <Post data={data} key={data.id} /> )} 
                </div>
            </div>
        </section>
    )
}

export default Posts