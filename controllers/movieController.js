const dbConnection = require("../data/dbConnection");

const index = (req, res) => {
    const sql = "SELECT * from `movies`";

    dbConnection.query(sql, (err, movies) => {
        // if(err) {
        //     const resObj = {
        //         status: "fail",
        //         message: "Errore interno del server"
        //     };
        //     if(process.env.ENVIRONMENT === "development") {
        //         resObj.detail = err.stack;
        //     };
        //     return res.status(500).json(resObj);
        // }; 
        if (err) {
          return  next(new Error("Errore interno del server"));
        } 
        
        return res.status(200).json({
            status: "success",
            data: movies,
        });
    });
};



const show = (req, res, next) => {
    const id = req.params.id;

    const sql = "SELECT * FROM `movies` WHERE `id` = ?";
    const sqlReviews = `
    SELECT reviews. *
    FROM reviews
    JOIN movies
    ON movies.id = reviews.movie_id
    WHERE movies.id = ?
    `;

    dbConnection.query(sql, [id], (err, results) => {
        // if(err) {
        //     const resObj = {
        //         status: "fail",
        //         message: "Errore interno del server"
        //     };
        //     if(process.env.ENVIRONMENT === "development") {
        //         resObj.detail = err.stack;
        //     }
        //     return res.status(500).json(resObj);
        // };
        if(err) {
          return  next(new Error("Errore interno del server"));
        }

        //Controllare se la corrispondenza è stata trovata
        if(results.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Film non trovato",
            });
        };

        //Nel caso tutto ok prendiamno anche le recensioni collegate a questo film
        dbConnection.query(sqlReviews, [id], (err, reviews) => {
            // if(err) {
            //     const resObj = {
            //         status: "fail",
            //         message: "Errore interno del server"
            //     };
            //     if(process.env.ENVIRONMENT === "development") {
            //         resObj.detail = err.stack;
            //     }
            //     return res.status(500).json(resObj);
            // };
            if(err) {
               return next(new Error("Errore interno del server"));
            }

            return res.status(200).json({
                status: "success",
                data: {
                    ...results[0],
                    reviews
                }
            });
        });
    });
};

module.exports ={
    index,
    show,
};