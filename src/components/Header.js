import React, {useEffect, useRef} from 'react'
import { Link } from 'gatsby'
import { HeaderNav ,Logo,Menu} from '../Styles/Header.styles'
import { Container,Flex} from '../Styles/GlobalStyles'
import { TOGGLE_THEME,useGlobalStateContext, useGlobalDispatchContext } from '../Context/GlobalContext'
import useElementPosition from '../Context/useElementPosition'

const Header = ({onCursor, togglMenu, setToggleMenu, hamPos, setHamPos}) => {

    const dispatch = useGlobalDispatchContext()
    const {currentTheme} = useGlobalStateContext()
    const hamburger = useRef(null)
    const position = useElementPosition(hamburger)

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


    const menuHover = function(){
        onCursor('locked')
        setHamPos({x: position.x, y: position.y + 72})
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
             initial = {{
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
                    <Menu ref = {hamburger}
                    onClick = {() => setToggleMenu(!togglMenu)}
                    onMouseEnter = {menuHover}
                    onMouseLeave = {onCursor}
                    >
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
