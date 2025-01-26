const express = require("express");
const moviesRouter = require("./routers/movies");
const errorsHandler = require("./middleware/errorsHandler");

//creazione dell'app express 
const app = express();
const port = process.env.SERVER_PORT;

//Middleware per rendere la cartella pubblica accessibile da fuori
app.use(express.static(`public`));

//DEFINISCO I GRUPPI DELLE ROTTE
app.use("/movies", moviesRouter);


//REGISTRO ERRORS HANDLER MIDDLEWARE
app.use(errorsHandler);

app.listen(port, () => {
    console.log(`app is listening on ${port}`);    
});

