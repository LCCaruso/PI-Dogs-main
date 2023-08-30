const { getTemperaments } = require("../controllers/temperamentsController")

const getTemperamentsHandler = async (req, res) => {
    try {
        const temperaments = await getTemperaments();
        res.status(200).json(temperaments);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = { 
    getTemperamentsHandler
}