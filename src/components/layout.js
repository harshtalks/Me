import React, {useState} from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

//styled components
import {createGlobalStyle, ThemeProvider} from 'styled-components'
import {normalize} from 'styled-normalize'

//import components
import Header from "./Header"
import CustomCursor from "./CustomCursor"
import Navigation from "./Navigation"

//importing context
import { useGlobalStateContext, useGlobalDispatchContext, TOGGLE_THEME} from "../Context/GlobalContext"
import { TOGGLE_CURSOR } from "../Context/GlobalContext"
import Footer from "./Footer"
//creating global styles

const GlobalStyle = createGlobalStyle`
  ${normalize}
  *{
    text-decoration: none;
    cursor: none;
  }
  
  html{
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    font-size: 16px;
  }

  body{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: ${props => props.theme.background};
    overscroll-behavior: none;
    overflow-x: hidden;
  }
`


const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const [hamPos, setHamPos] = useState({
    x: 0,
    y:0
  })
  
  const darkTheme = {
    background: '#000',
    text: '#fff',
    red: '#ea291e',
    left: `${hamPos.x}px`,
    top: `${hamPos.y}px`

  }

  const lightTheme = {
    background: '#fff',
    text: '#000',
    red: '#ea291e',
    left: `${hamPos.x}px`,
    top: `${hamPos.y}px`
  }

  const {currentTheme, cursorStyle} = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()

  const onCursor = (cursorType) => {

    cursorType = (cursorStyle.includes(cursorType) && cursorType) || false

    dispatch(
      {
        type: TOGGLE_CURSOR,
        cursorType: cursorType
      }
    )
  }

  const  [toggleMenu, setToggleMenu] = useState(false)



  return (
    <ThemeProvider theme = {currentTheme === "dark" ? darkTheme
          : lightTheme}>
    <GlobalStyle />
    <CustomCursor toggleMenu = {toggleMenu}/>
    <Header onCursor = {onCursor} toggleMenu = {toggleMenu} setToggleMenu = {setToggleMenu} 
    hamPos = {hamPos} setHamPos = {setHamPos}
    />
    <Navigation toggleMenu = {toggleMenu} setToggleMenu = {setToggleMenu}  onCursor = {onCursor}/>
    <main>{children}</main>
    <Footer onCursor = {onCursor} />
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout