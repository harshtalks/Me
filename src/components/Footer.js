import React from 'react'
import {Container, Flex} from '../Styles/GlobalStyles'
import { Instagram, Facebook ,Vimeo} from '../assets/svg/social-icons'
import { FooterContent,FooterNav, FooterSocials } from '../Styles/Footer.styles'

const Footer = ({onCursor}) => {
    return (
        <FooterNav>
            <Container>
                <Flex spaceBetween>
                    <FooterContent>
                        <p>+91.9660687185</p>
                        <p>harshpareek91@gmail.com</p>
                    </FooterContent>
                    <FooterContent wider>
                        <p>Jaipur, India</p>
                        <p>Banswara, Rajastham, India</p>
                    </FooterContent>
                    <FooterSocials>
                        <a onMouseEnter = {() => onCursor('hovered')} 
                        onMouseLeave = {onCursor} href="">
                            <Instagram />
                        </a>
                        <a onMouseEnter = {() => onCursor('hovered')} 
                        onMouseLeave = {onCursor} href="">
                            <Facebook />
                        </a>
                        <a onMouseEnter = {() => onCursor('hovered')} 
                        onMouseLeave = {onCursor} href="">
                            <Vimeo />
                        </a>
                    </FooterSocials>
                </Flex>
            </Container>
        </FooterNav>
    )
}

export default Footer
