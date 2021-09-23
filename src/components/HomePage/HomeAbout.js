import { motion } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import { useGlobalStateContext } from '../../Context/GlobalContext'
import {Container, Flex} from '../../Styles/GlobalStyles'
import { HomeAboutSection, Services, About, AccordianContent
,AccordianIcon, AccordianHeader } from '../../Styles/Home.styles'
import { useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const AccordianIDs = [
    {
        id: 0,
        title: 'Pre-Production',
        results:[
            'Creative Development',
            'Writing',
            'Dancing',
            'Art Direction',
            'Story Boards',
            'Fun Fun',
            'The Office'
        ]
    },
    {
        id: 1,
        title: 'Fav Shows',
        results:[
            'The office',
            'Brooklyn 99',
            'You Netflix',
            'Sex Education',
            'Schitt\'s creek',
            'Big Bang Theory'
        ]
    },
    {
        id: 2,
        title: 'Fav Artists',
        results:[
            'The 1975',
            'The NBHD',
            'Harry Styles',
            'The Weeknd',
            'Conan Gray',
            'Lana Del Rey',
            'Virgin lord weezer'
        ]
    },
    {
        id: 3,
        title: 'Fav People',
        results:[
            'Murk',
            'Jay',
            'Perri king',
            'UsUF aka Pajju bhai',
            'Dhanvi Bomb',
            'Navvya boomer'
        ]
    }
]

const HomeAbout = ({onCursor}) => {
    const [expand, setExpand] = useState(0) //gonna be the key

    const animation  = useAnimation()
    const [aboutRef, inView] = useInView({
        triggerOnce: true,
        rootMargin: '-300px'
    })

    useEffect(() => {
        if(inView){
            animation.start('visible');
        }
    },[animation, inView])

    return (
        <HomeAboutSection
        ref = {aboutRef}
        animate = {animation}
            initial = "hidden"
            variants = {{
                visible:{
                    opacity: 1,
                y: 0,
                Transition: {
                    duration: .6,
                    ease: [.6,.05,-.01,.9]
                }
                },
                hidden: {
                    opacity: 0,
                    y: 72,

                }
            }}
        >
            <Container>
                <Flex alignTop>
                    <About>
                       <h2> Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati corrupti, reprehenderit quas incidunt vitae necessitatibus cum voluptates accusamus laborum fuga atque aspernatur optiom.
                        </h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam libero recusandae quod? Sequi non deleniti expedita temporibus impedit, cupiditate nulla numquam? Nisi unde eum officiis aspernatur at error? Incidunt, quam!
                        </p>
                    </About>
                    <Services>
                        <h3>Services</h3>
                        {AccordianIDs.map((el,i) => {
                           return <Accordian 
                           expand = {expand} setExpand = {setExpand}
                           onCursor = {onCursor}
                           key = {i} el = {el} />
                        })}
                    </Services>
                </Flex>
            </Container>
        </HomeAboutSection>
    )
}

const Accordian = ({el, expand, setExpand, onCursor}) => {
    const isOpen = el.id === expand;
    const [hover,setHover] = useState(false)
    const {currentTheme} = useGlobalStateContext()
    return (
        <>
            <AccordianHeader 
            onClick = {() => setExpand(isOpen ? false: el.id)}
            onMouseEnter = {() => onCursor('hovered')}
            onMouseLeave = {onCursor}
            onHoverStart = {() => setHover(!hover)}
            onHoverEnd = {() => setHover(!hover)}
            whileHover = {{
                color: currentTheme === 'dark' ? '#ffffff' : '#000000'
            }}
            >
                <AccordianIcon>
                    <motion.span
                        animate = {{rotate: isOpen || hover ? 0: 45, x: 3}}
                        transition = {{
                            duration: .2,
                            ease: [.6,0.05,-0.01,.9]
                        }}
                    ></motion.span>
                    <motion.span
                        animate = {{rotate: isOpen || hover ? 0: -45, x: -3}}
                        transition = {{
                            duration: .2,
                            ease: [.6,0.05,-0.01,.9]
                        }}
                    ></motion.span>
                </AccordianIcon>
                {el.title}
            </AccordianHeader>
            <AccordianContent 
            key = 'content' animate = {{height: isOpen ? '100%' : "0"}}
            transition = {{
                            duration: .2,
                            ease: [.6,0.05,-0.01,.9]
                        }}
            >
                {el.results.map((x,i) => {
                    return <span key = {i}>{x}</span>
                })}
            </AccordianContent>
        </>
    )
}

export default HomeAbout
