// Imports
const express = require("express");
const repoContext = require("./repository/repository-wrapper")
const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

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
app.post("/api/songs", (req, res) => {
    const newSong = req.body;
    const addedSong = repoContext.songs.createSong(newSong);
    return res.status(201).send(addedSong)
});


// Starting a Server
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    console.log(`Server running fast on PORT: ${PORT}`);
});