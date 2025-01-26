const errorsHandler = (err, req,res, next) => {
    const resObj = {
        status: "fial",
        message: err.message,
    };

    if(process.env.ENVIRONMENT === "development") {
        resObj.detail = err.stack;
    }

    res.status(500).json(resObj);
};

module.exports = errorsHandler;