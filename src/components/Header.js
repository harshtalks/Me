import React, {useEffect} from 'react'
import { Link } from 'gatsby'
import { HeaderNav ,Logo,Menu} from '../Styles/Header.styles'
import { Container,Flex} from '../Styles/GlobalStyles'
import { TOGGLE_THEME,useGlobalStateContext, useGlobalDispatchContext } from '../Context/GlobalContext'

const Header = ({onCursor}) => {

    const dispatch = useGlobalDispatchContext()
    const {currentTheme} = useGlobalStateContext()

    const toggleTheme = () => {
        if(currentTheme === 'dark'){
            dispatch({
                type: TOGGLE_THEME,
                theme: "light"
            })
        }
        else{
            dispatch({
                type: TOGGLE_THEME,
                theme: "dark"
            })
        }
    }

    useEffect(() => {
        window.localStorage.setItem('theme', currentTheme)
    },[currentTheme])


    return (
        <HeaderNav
            animate = {{
                y: 0,
                opacity: 1,
            }}
             intial = {{
                y: -72,
                opacity: 0,
            }}

            transition = {{
                duration: 1,
                ease: [.6, .05, -.01, .9]
            }}>
            <Container >
                <Flex spaceBetween noHeight>
                    <Logo
                        onMouseEnter = {() => onCursor('hovered')}
                        onMouseLeave = {onCursor}
                    >
                        <Link to = "/">
                            HAR
                        </Link>
                        <span 
                        onMouseEnter = {() => onCursor('pointer')}
                        onMouseLeave = {onCursor}
                        onClick = {toggleTheme}></span>
                        <Link to = "/">
                            SHH
                        </Link>
                    </Logo>
                    <Menu>
                        <button>
                            <span></span>
                            <span></span>
                        </button>
                    </Menu>
                </Flex>
            </Container>
        </HeaderNav>
    )
}

export default Header
