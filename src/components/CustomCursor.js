import React, {useState, useEffect} from 'react'
import { Cursor } from '../Styles/GlobalStyles'
//context
import { useGlobalStateContext } from '../Context/GlobalContext'

const CustomCursor = () => {
    const {cursorType} = useGlobalStateContext()
    const [mousePosition, setMousePosition] = useState({
        x: 400,
        y: 400
    })

    const onMouseMove = (e) => {
        const {pageX: x, pageY: y} = e
        setMousePosition({x,y})
    }

    useEffect(() => {
        document.addEventListener("mousemove", onMouseMove)

        return () => {
            document.removeEventListener("mousemove", onMouseMove)
        }
    },[])

    return (
        <Cursor
        className = {`${!!cursorType ? 'hovered' : ''} ${cursorType}`}
        style = {{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`
        }}
        ></Cursor>
    )
}

export default CustomCursor
