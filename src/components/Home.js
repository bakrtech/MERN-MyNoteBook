import React, { useContext } from "react";
import NotesContext from "../contexts/Notes/NotesContext";

export const Home = () => {
  const context = useContext(NotesContext);
  const { notes, setNotes } = context;
  return (
    <>
      <div className="my-3 container">
        <h3>Add a note</h3>
      </div>
      <div className="container my-3">
        <form>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" for="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <div className="my-3 container">
        <h3>Your Notes</h3>
      </div>
      {notes.map((note) => {
        return (
          <>
            <h3>{note.title}</h3>
            <h6>{note.description}</h6>
            <p>**{note.tag}**</p>
          </>
        );
      })}
    </>
  );
};
export default Home;
