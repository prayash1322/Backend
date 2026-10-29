const express = require("express");
const noteModel = require("./models/note.model");
const app = express();

app.use(express.json());

/*
    POST /notes => Create a note
    GET /notes => Get all notes
    PATCH /notes/:id => Update a note by id
    DELETE /notes/:id => Delete a note by id
*/

app.post("/notes", async (req, res) => {
  const data = req.body; // {title,description}
  await noteModel.create({
    title: data.title,
    description: data.description,
  });

  res.status(201).json({ message: "Note created!!" });
});

app.get("/notes", async (req, res) => {
  const notes = await noteModel.find(); // always return a [] or [{},{}]
  /* const notes1 = await noteModel.findOne({
     title: "test_title",
     title: "test_title_4", If this doesn't exist then it will return a null
   }); always return a {} or null
  */
  res.status(200).json({ message: "All notes fetched!!", notes: notes });
});

app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;
  await noteModel.findOneAndDelete({
    _id: id
  });
  
  res.status(200).json({ message: "Note deleted!!" });
});

app.patch("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const description = req.body.description;
  await noteModel.findOneAndUpdate(
    { _id: id },
    {
      description: description,
    }
  );

  res.status(200).json({ message: "Note updated!!" });
});

module.exports = app;
