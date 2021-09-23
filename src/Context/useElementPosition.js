
import { element } from "prop-types";
import { useState, useEffect } from "react";

export default function useElementPosition(m){
    function getElement(x,y){
        return {
            x:x,
            y:y,
        }
    }
    const [elPos, setElPos] = useState(getElement)
    useEffect(() => {
        function handlePos(){
            let el = m.current;
            let x = el.getBoundingClientRect().left + 
            document.documentElement.scrollLeft + el.offsetWidth/2

            let y = el.getBoundingClientRect().top + 
            document.documentElement.scrollTop + el.offsetHeight/2

            setElPos(getElement(x,y))
        }
        
        handlePos()
    },[m])

    return elPos

}