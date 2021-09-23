import React, {useEffect} from 'react'
import {useInView} from 'react-intersection-observer'
import { useAnimation } from 'framer-motion'
import {Container} from '../../Styles/GlobalStyles'
import { HomeContentSection, Content } from '../../Styles/Home.styles'

const HomeContent = () => {
    const animation  = useAnimation()
    const [contentRef, inView] = useInView({
        triggerOnce: true,
        rootMargin: '-300px'
    })

    useEffect(() => {
        if(inView){
            animation.start('visible');
        }
    },[animation, inView])

    return (
        <HomeContentSection
            ref = {contentRef}
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
                <Content>
                    Hey Bestie, How you doin? <br />
                    welcome to my portfolio. I am an aspiring frontend engineer who likes
                    to make websites, cool web apps. little bit more about me- I love lorem ipsum
                    cause of how lazy I am to write about myself.
                </Content>
            </Container>
        </HomeContentSection>
    )
}

export default HomeContent
