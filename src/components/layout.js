import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

//styled components
import {createGlobalStyle, ThemeProvider} from 'styled-components'
import {normalize} from 'styled-normalize'

//import components
import Header from "./Header"
import CustomCursor from "./CustomCursor"

//importing context
import { useGlobalStateContext, useGlobalDispatchContext, TOGGLE_THEME} from "../Context/GlobalContext"
import { TOGGLE_CURSOR } from "../Context/GlobalContext"
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

  const darkTheme = {
    background: '#000',
    text: '#fff',
    red: '#ea291e'
  }

  const lightTheme = {
    background: '#fff',
    text: '#000',
    red: '#ea291e'
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


  return (
    <ThemeProvider theme = {currentTheme === "dark" ? darkTheme
          : lightTheme}>
    <GlobalStyle />
    <CustomCursor />
    <Header onCursor = {onCursor}/>
    <main>{children}</main>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout