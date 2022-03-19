const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1 :Getting all the notes of the user using GET ;Login is required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(`Some ERROR OCCURED AT OUR END`);
  }
});
//Route 2 :Adding new notes of the user using Post ;Login is required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 Chr").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
      try {
          const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.errors });
      }
      const notes = await Notes.find({ user: req.user.id });

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
        console.log(error.message);
      res.status(500).send(`Some ERROR OCCURED AT OUR END`);
    }
}
);
//Route 3 :Updating notes of the user using Post ;Login is required

router.put(
  "/updatenote/:id",
  fetchuser,
  async (req, res) => {
try{

    const{title,description,tag}=req.body;
    const newNote={}
    if (title) {
        newNote.title = title;
    }
    if (description) {
        newNote.description = description;
    }
    if (tag) {
        newNote.tag = tag;
    }
    // finding the note to updated and update it 
    note = await Notes.findById(req.params.id)
    if (!note) {return res.status(404).send("Note not found")}
    if (note.user.toString() !== req.user.id){
        return res.status(401).send("NOT ALLOWED TO EDIT :>")
    }
    note= await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json(note)
}catch(error){
    console.log(error.message);
    res.status(500).send(`Some ERROR OCCURED AT OUR END`);
}
})
//Route 4 :Deleting notes of the user using Post ;Login is required

router.delete(
    "/deletenote/:id",
    fetchuser,
  async (req, res) => {
      
      try{

    // finding the note to updated and update it 
    note = await Notes.findById(req.params.id)
    if (!note) {return res.status(404).send("Note not found")}
    if (note.user.toString() !== req.user.id){
        return res.status(401).send("NOT ALLOWED TO Delete :>")
    }
    note= await Notes.findByIdAndDelete(req.params.id)
    res.send("DELETED SUCCESFULLY")
}
catch(error){
    console.log(error.message);
    res.status(500).send(`Some ERROR OCCURED AT OUR END`);

}
})
module.exports = router;
