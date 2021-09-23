import React, {useState} from 'react'
import { motion , AnimatePresence} from 'framer-motion'
import { Link } from 'gatsby'
//importing videos
import featuredVideo from '../assets/video/featured-video.mp4'
import easy from '../assets/video/easy.mp4'
import itTakesIsland from '../assets/video/it-takes-an-island.mp4'
import makeitZero from '../assets/video/make-it-zero.mp4'
import beaches from '../assets/video/50-beaches.mp4'
//styled component
import {Container,Flex} from '../Styles/GlobalStyles'
import { Nav,NavFooter, NavHeader, NavList, CloseNav,NavVideos} from '../Styles/Nav.styles'
import { FooterContent, FooterSocials } from '../Styles/Footer.styles'
import { Instagram, Facebook,Vimeo } from '../assets/svg/social-icons'

const navRoutes = [
    {
        id: 0,
        title: 'covid-19',
        path : '/covid-19',
        video: featuredVideo
    },
    {
        id: 1,
        title: 'bank app',
        path : '/bank-app',
        video: easy
    },
    {
        id: 2,
        title: 'Movie App',
        path : '/movie-app',
        video: itTakesIsland
    },
    {
        id: 3,
        title: 'resume',
        path : '/me.github.io',
        video: makeitZero
    },
    {
        id: 4,
        title: 'mapty',
        path : '/map.github.io',
        video: beaches
    }
]

const Navigation = ({toggleMenu, setToggleMenu, onCursor}) => {
    const [revealVideo, setRevealVideo] = useState(
        {
            show: true,
            video: featuredVideo,
            key: 0
        }
    )
    return (
        <>
        <AnimatePresence>
            {toggleMenu && (
                <Nav initial = {{x: '-100%'}}
                    exit = {{x: '-100%'}}
                animate = {{x: toggleMenu ? 0 : '-100%'}}
                transition = {{
                    duration: .8,
                    ease: [.6,.05,-.01,.9]
                }}
                >
            <Container>
                <NavHeader>
                    <Flex spaceBetween noHeight>
                        <h2>Projects</h2>
                        <CloseNav onClick = {() => setToggleMenu(!toggleMenu)}
                        onMouseEnter = {() => onCursor('pointer')}
                        onMouseLeave = {onCursor}
                        >
                            <button>
                            <span></span>
                            <span></span>
                            </button>
                        </CloseNav>
                    </Flex>
                </NavHeader>
                <NavList>
                    <ul>

                        {navRoutes.map(el => {
                            return (
                                <motion.li 
                                    onHoverStart = {() => setRevealVideo({
                                        show: true,
                                        video: el.video,
                                        key: el.id
                                    })}
                                    onHoverEnd= {() => setRevealVideo({
                                        show: false,
                                        video: el.video,
                                        key: el.id
                                    })}
                                    onMouseEnter = {() => onCursor('pointer')}
                        onMouseLeave = {onCursor}
                                key = {el.id}>
                            <Link to = {`/projects${el.path}`}>
                                <motion.div
                                    initial = {{x : -108}}
                                    whileHover = {
                                        {x: -40,
                                        transition: {
                                            duration: .4,
                                            ease: [.6,.05,-.01,0.9]
                                        },
                                     }}
                                    
                                className="link">
                                    <span className="arrow">
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 101 57"
                                        >
                                        <path
                                        d="M33 34H0V24h81.429L66 7.884 73.548 0l19.877 20.763.027-.029L101 28.618 73.829 57l-7.548-7.884L80.753 34H33z"
                                        fill="#FFF"
                                        fillRule="evenodd"
                                        ></path>
                                        </svg> 
                                    </span>
                                   {el.title}
                                </motion.div>
                            </Link> 
                        </motion.li>
                            )
                        })}
                        
                    </ul>
                </NavList>
                <NavFooter>
                    <Flex spaceBetween>
                        <FooterContent>
                            <p>harshpareek91@gmail.com</p>
                        </FooterContent>
                        <FooterContent>
                            <p>+91.9660687185</p>
                        </FooterContent>
                         <FooterSocials>
                        <a onMouseEnter = {() => onCursor('pointer')} 
                        onMouseLeave = {onCursor} href="">
                            <Instagram />
                        </a>
                        <a onMouseEnter = {() => onCursor('pointer')} 
                        onMouseLeave = {onCursor} href="">
                            <Facebook />
                        </a>
                        <a onMouseEnter = {() => onCursor('pointer')} 
                        onMouseLeave = {onCursor} href="">
                            <Vimeo />
                        </a>
                    </FooterSocials>
                    </Flex>
                </NavFooter>
                <NavVideos>
                    <motion.div 
                        animate = {{width: revealVideo.show ? '10%' : '100%'}}
                    className="reveal">
                    </motion.div>
                    <div className="video">
                       <AnimatePresence
                       initial = {false}
                       exitBeforeEnter
                       >
                           <motion.video
                           key = {revealVideo.key}
                           initial = {{opacity: 0}}
                           exit = {{opacity: 0}}
                           animate = {{opacity:1}}
                           transition = {{
                               duration: .2,
                               ease: "easeInOut"
                           }}
                muted
                autoPlay  = "autoplay"
                loop
                src = {revealVideo.video}
               />
           
                       </AnimatePresence>
                    </div>
                </NavVideos>
            </Container>
        </Nav>
            )}
        </AnimatePresence>
        </>
    )
}

export default Navigation
