import { Link } from 'react-router-dom'

const Post = ({ data }) => {

    return (
        <div className="col-lg-4">
            <div className="blog-grid">
                <div className="blog-img">
                    <div className="date">{new Date(data.created_at).toLocaleDateString('en-US')}</div>
                    <Link to={'/post/' + data.id}>
                        <img src={data.image} alt={data.title} />
                    </Link>
                </div>
                <div className="blog-info">
                    <h5><Link to={'/post/' + data.id}>{data.title}</Link></h5>
                    <p>{data.content.split(' ').splice(0, 20).join(' ') + '...'}</p>
                    <div className="btn-bar">
                        <Link to={'/post/' + data.id} className="px-btn-arrow">
                            <span>Read More</span>
                            <i className="arrow"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post