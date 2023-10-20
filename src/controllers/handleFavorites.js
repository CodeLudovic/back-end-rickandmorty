let myFavorites = [];

const postFav = (req, res) => {
	try {
		const character = req.body;

		if (!character.name || !character.gender)
			throw new Error("Algo salio mal verifica el ID");

		myFavorites.push(character);
		res.status(200).json(myFavorites);
	} catch (error) {
		res.status(400).json({ error: error });
	}
};

const deleteFav = (req, res) => {
	try {
		const { id } = req.params;

		if (myFavorites.length < 0)
			throw new Error("Algo salio mal verifica el ID");

		myFavorites = myFavorites.filter((favorite) => favorite.id !== id);
		res.status(200).json(myFavorites);
	} catch (error) {
		res.status(400).json({ error: error });
	}
};

module.exports = {
	postFav,
	deleteFav,
};
