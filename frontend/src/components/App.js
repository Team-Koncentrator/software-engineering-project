import React from "react"
import ReactDOM from "react-dom/client"
import Login from "./Login"
import Register from "./Register"

function App(){
    return(
        <div>
            <Login />
            <Register />
        </div>
        
    )
}

const root = ReactDOM.createRoot(document.getElementById("app"))
root.render(<App />)
 