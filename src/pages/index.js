import React from "react"
import Homebanner from "../components/HomePage/Homebanner"
import Layout from "../components/layout"

import { useGlobalStateContext, useGlobalDispatchContext, TOGGLE_CURSOR} from "../Context/GlobalContext"

const IndexPage = props => {


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
  return <Layout>
    <Homebanner onCursor = {onCursor}/>
  </Layout>
}

export default IndexPage