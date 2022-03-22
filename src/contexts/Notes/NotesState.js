import React from "react";
import noteContext from "./NotesContext";
import { useState } from "react";
const NotesState = (props)=>{
    const notesInitial =[
        {
          "_id": "6232b9716402c5a3839f3b74",
          "user": "6232973ce8fbe8e3c7db6f6a",
          "title": "ALLAH IS THE GREATEST -1",
          "description": "HE is the one who has the ultimate power",
          "tag": "The first note ",
          "date": "2022-03-17T04:30:41.831Z",
          "__v": 0
        },
        {
          "_id": "6239720d70bbba6fb58e7a41",
          "user": "6232973ce8fbe8e3c7db6f6a",
          "title": "ALLAH IS THE GREATEST -1",
          "description": "HE is the one who has the ultimate power",
          "tag": "The first note ",
          "date": "2022-03-22T06:51:57.712Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial)
return(
    <noteContext.Provider value = {{notes,setNotes}}>
        {props.children}
    </noteContext.Provider>
)
}
export default NotesState