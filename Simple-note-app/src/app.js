const express = require("express")

const app = express() // we are creating a server instance here
app.use(express.json()) // we are using express.json() middleware to parse the incoming request body as JSON

const notes = []

// POST method API:- /notes
app.post("/notes", (req, res) => {
    notes.push(req.body);
    res.status(201).json({
        message: "note created successfully"
    })
})


// GET method API:- /notes
app.get("/notes", (req, res) => {
    res.status(200).json({
        message: "notes fetched successfully",
        notes: notes
    })
})


// DELETE method API:- /notes:index

app.delete("/notes/:index", (req,res) => {
    const index = req.params.index
    console.log(index);

    delete notes[index]
    res.status(200).json({
        message: "note deleted successfully"
    })
})

// PATCH method API :- /notes:index

app.patch("/notes/:index", (req,res) => {
    const index = req.params.index
    const description = req.body.description
    const title = req.body.title
    console.log(index);
    
    notes[index].description = description
    notes[index].title = title
    res.status(200).json({
        message: "note updated successfully"
    })
})

module.exports = app // we are exporting the server instance so that we can use it in other files