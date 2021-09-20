import React, {useRef, useEffect} from 'react'
//importing styles
import { Banner, Video, Canvas, BannerTitle, Headline } from '../../Styles/Home.styles'
import video from '../../assets/video/video.mp4'

import useWindowSize from '../../Hooks/useWindowSize'
import { useGlobalStateContext } from '../../Context/GlobalContext'

const Homebanner = ({onCursor}) => {

    let canvas = useRef(null)
    const size = useWindowSize()
    const {currentTheme} = useGlobalStateContext()

    useEffect(() => {
        let renderEl = canvas.current
        let drawing = renderEl.cloneNode()

        let drawingCtx = drawing.getContext('2d')
        let renderingCtx = renderEl.getContext('2d')

        let lastX;
        let lastY; 

        let moving = false;
        console.log(currentTheme)

        renderingCtx.globalCompositeOperation = 'source-over'
        renderingCtx.fillStyle = currentTheme === 'dark' ? '#000000' : '#ffffff'
        renderingCtx.fillRect(0, 0, size.width,size.height)


        renderEl.addEventListener('mouseover', (e) => {
            moving = true;
            lastX = e.pageX - renderEl.offsetLeft
            lastY = e.pageY - renderEl.offsetTop
        })


        renderEl.addEventListener('mouseup', (e) => {
            moving = false;
            lastX = e.pageX - renderEl.offsetLeft
            lastY = e.pageY - renderEl.offsetTop
        })

        renderEl.addEventListener('mousemove', (e) => {
            if(moving)
            {
                drawingCtx.globalCompositeOperation = 'source-over'
                renderingCtx.globalCompositeOperation = 'destination-out'

                let currentX = e.pageX - renderEl.offsetLeft
                let currentY = e.pageY - renderEl.offsetTop

                drawingCtx.lineJoin = 'round'
                drawingCtx.moveTo(lastX,lastY)
                drawingCtx.lineTo(currentX,currentY)
                drawingCtx.closePath()
                drawingCtx.lineWidth = 120
                drawingCtx.stroke()
                lastX = currentX
                lastY = currentY
                renderingCtx.drawImage(drawing, 0,0)
            }
        })


    },[currentTheme])

    const parent = {
        initial: {
            y:800
        },
        animate: {
            y:0,
            transition: {
                staggerChildren: .2
            }
        }
    }

    const child = {
        initial: {
            y:800
        },
        animate: {
            y:0,
            transition: {
                duration: 1,
                ease: [.6,.05,-.01,.9]
            }
        }
    }

    return (
        <Banner>
            <Video>
                <video
                height = "100%"
                width = "100%"
                muted
                autoPlay  = "autoplay"
                loop
                src = {video}
               />
               
            </Video>
            <Canvas
            height = {size.height}
            width = {size.width}
             ref  ={canvas}
             onMouseLeave = {onCursor}
             onMouseEnter = {() => onCursor('hovered')}
             
             />
            <BannerTitle variants = {parent} initial = 'initial'  animate = 'animate'>
                <Headline variants = {child}>HARSH</Headline>
                <Headline variants = {child}>PAREEK</Headline>
            </BannerTitle>
        </Banner>
    )
}

export default Homebanner
