const router = require("express").Router();
// const db = require("../db/db.json");
const fs = require("fs");
const uuid = require("uuid");
const path = require("path");

//reads db.json and return all notes as JSON
router.get('/notes', (req, res) => {
  fs.readFile(
	path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
    if (err) { console.log(err);
    } else {
      let savedNotes = JSON.parse(data);
	  res.json(savedNotes);
    }
  });
});

router.post('/notes', (req, res) => {
  const { title, text } = req.body;
  if ( title && text ) {
  const notes = {
    title,
    text,
    id: uuid.v1(),
  };

  //receives new note to save on request body
  //give each a unique id
  //add to notes.js router
  let savedNotes = [];
  fs.readFile(
	path.join(__dirname, "../db/db.json"), "utf8",
	(err, data) => {
    if (err) { console.log(err);
    } else {
      savedNotes = JSON.parse(data);
      savedNotes.push(notes);
      fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(savedNotes),
        "utf8",
        );
    }
  }
  );
  res.json(savedNotes);
  } else {
	res.status(500).json("There was a problem saving the note!");
  }
});

// not finsished
// router.delete("/api/notes/:id", (req, res) => {
//   console.log(req.body);
//   fs.readFile(".db/db.json");
// });
// param with id of note to delete
// need filter to run thru notes and find ones with given id property
// remove specified id property
// rewrite the notes to the db.json file



module.exports = router;
