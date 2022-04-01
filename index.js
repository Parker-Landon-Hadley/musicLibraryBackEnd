// Imports
const express = require("express");
const repoContext = require("./repository/repository-wrapper");
const songValidate = require("./middleware/song-validation");
const songLogger = require("./middleware/song-logger");
const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoints
// http://localhost:5005 (BASE URL)


// GET all music
// http://localhost:5005/api/songs
app.get("/api/songs", (req, res) => {
    const songs = repoContext.songs.findAllSongs();
    return res.send(songs);

});


// Get song by id
// http://localhost:5005/api/songs/:id
app.get("/api/songs/:id", (req, res) => {
    const id = req.params.id;
    const songsId = repoContext.songs.findSongById(id)
    return res.send(songsId);

});


// POST new song
// http://localhost:5005/api/songs
app.post("/api/songs", [songLogger, songValidate], (req, res) => {
    const newSong = req.body;
    const addedSong = repoContext.songs.createSong(newSong);
    return res.status(201).send(addedSong)
});


// PUT an existing song
// http://localhost:5005/api/songs/:id
app.put("/api/songs/:id", [songValidate], (req, res) => {
    const id = parseInt(req.params.id);
    const songPropertiesToModify = req.body;
    const songToUpdate = repoContext.songs.updateSong(id, songPropertiesToModify);
    return res.send(songToUpdate);
});


// DELETE a song
// http://localhost:5005/api/songs/:id
app.delete("/api/songs/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const deletedSong = repoContext.songs.deleteSong(id)
    return res.send(deletedSong);
});


// Starting a Server
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    console.log(`Server running fast on PORT: ${PORT}`);
});