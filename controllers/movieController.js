const index = (req, res) => {
    res.json({
        message: "Index di film"
    })
};

const show = (req, res) => {
    res.json({
        message: "show del film"
    })
};

module.exports ={
    index,
    show,
};