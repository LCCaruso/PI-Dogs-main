const getTemperamentsHandler = (req, res) => {
    res.status(200).send("Obtiene todos los temperamentos existentes.");
};




module.exports = { 
    getTemperamentsHandler
}