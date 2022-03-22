import React, { useContext,useEffect } from "react";
import noteContext from "../contexts/Notes/NotesContext";
export const About = () => {
  const a = useContext(noteContext);
  useEffect(() => {
    a.update() 
  }, [])
  
  return <div> This is About page {a.state.name} and he is in calss {a.state.class}</div>;
};
export default About;
