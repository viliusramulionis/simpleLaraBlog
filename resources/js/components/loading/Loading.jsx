import { createContext, useState } from 'react'
import './Loading.css'

export const LoadingContext = createContext()

const Loading = (props) => {

    const [loading, setLoading] = useState(false)

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {props.children}
            {loading && <div className="loading"></div>}
        </LoadingContext.Provider>
    )
}

export default Loading