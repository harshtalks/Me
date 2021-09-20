import React, {createContext, useReducer, useContext} from "react";

//defining the context

const GlobalStateContext = createContext();
const GlobalDispatchContext = createContext();

//action type variable
export const TOGGLE_THEME = "TOGGLE_THEME"

//reducer;

const GlobalReducer = (state, action) => {
    switch(action.type){
        case TOGGLE_THEME:return {
            ...state,
            currentTheme: action.theme
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}


export const GlobalProvider = ({children}) => {
        const [state,dispatch] = useReducer(GlobalReducer, {
            currentTheme: window.localStorage.getItem('theme') === null ? 'dark': window.localStorage.getItem('theme')
        })

        return (
            <GlobalDispatchContext.Provider value = {dispatch}>
                <GlobalStateContext.Provider value = {state}>
                    {children}
                </GlobalStateContext.Provider>
             </GlobalDispatchContext.Provider>
        )
}

//Custom hooks to use dispatch
export const useGlobalStateContext = () => useContext(GlobalStateContext)
export const useGlobalDispatchContext = () => useContext(GlobalDispatchContext)