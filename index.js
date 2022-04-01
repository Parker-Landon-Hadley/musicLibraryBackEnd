// Imports
const express = require("express");
const repoContext = require("./repository/repository-wrapper")
const app = express();


// Middleware
app.use(express.json());

// Endpoints
// http://localhost:5005 (BASE URL)

// GET all music
// http://localhost:5005/api/songs
app.get("/api/songs", (req, res) => {
    const songs = repoContext.songs.findAllSongs()
    return res.send(songs);

})


// Starting a Server
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    console.log(`Server running fast on PORT: ${PORT}`);
});