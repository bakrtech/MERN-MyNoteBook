import React from "react";
import noteContext from "./NotesContext";
import { useState } from "react";
const NotesState = (props)=>{
    const s1={
        "name":"bakrtech",
        "class":"Mtech"
    }
    const [state, setState] = useState(s1)
    const  update = ()=>{
        setTimeout(() => {
            setState({
                "name":"bakrtech",
                "class":"Btech"
            })
        }, 1000);
    }
return(
    <noteContext.Provider value = {{state, update}}>
        {props.children}
    </noteContext.Provider>
)
}
export default NotesState