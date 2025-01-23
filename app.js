const express = require("express");
const moviesRouter = require("./routers/movies");

//creazione dell'app express 
const app = express();
const port = process.env.SERVER_PORT;

//DEFINISCO I GRUPPI DELLE ROTTE
app.use("/movies", moviesRouter);


app.listen(port, () => {
    console.log(`app is listening on ${port}`);    
});

