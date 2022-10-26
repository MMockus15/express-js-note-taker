const router = require("express").Router();
// const db = require("../db/db.json");
const fs = require("fs");
const uuid = require("uuid");
const path = require("path");

//reads db.json and return all notes as JSON
router.get("/notes", (req, res) => {
  fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
		console.log(data);
      let savedNotes = JSON.parse(data);
      res.json(savedNotes);
    }
  }
);

router.post("/notes", (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const notes = {
      title,
      text,
      id: uuid.v1(),
    };

    //receives new note to save on request body
    //give each a unique id
    //add to notes.js router
    let savedNotes = [];
    fs.readFile('db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        savedNotes = JSON.parse(data);
        savedNotes.push(notes);
        fs.writeFileSync(
          path.join(__dirname, "../db/db.json"),
          JSON.stringify(savedNotes),
          "utf8"
        );
      }
    });
    res.json(savedNotes);
  } else {
    res.status(500).json("There was a problem saving the note!");
  }
});

// delete note with specified id
router.delete("/notes/:id", (req, res) => {
  fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) {
    } else {
      let savedNotes = JSON.parse(data);
      // need filter to run thru notes and find ones with given id property
      const noteId = req.params.id;
      //filter thru savedNotes array for notes with id
      for (var i = 0; i < savedNotes.length; i++) {
        if (noteId === savedNotes[i].id) {
          savedNotes.splice(i, 1);
          //rewrite notes to db.json
          fs.writeFileSync(path.join(__dirname, "../db/db.json"), "utf8");
		  JSON.stringify(savedNotes), "utf-8";
          res.json(savedNotes);
        }
      }
    }
  }
)})
});

module.exports = router;
