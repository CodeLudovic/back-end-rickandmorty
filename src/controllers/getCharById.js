const axios = require("axios");
const BASE_URL = "https://rickandmortyapi.com/api/character/";

const getCharById = async (req, res) => {
	const { id } = req.params;
	try {
		const { data } = await axios(`${BASE_URL}${id}`);

		const character = {
			id: id,
			name: data.name,
			gender: data.gender,
			species: data.species,
			origin: data.origin?.name,
			image: data.image,
			status: data.status,
		};
		character.name
			? res.status(200).json(character)
			: res.status(404).send("Not found");
	} catch (error) {
		res.status(500).send(error.message);
	}
	// axios(`${BASE_URL}${id}`)
	// 	.then((response) => response.data)
	// 	.then(({ name, gender, species, origin, image, status }) => {
	// 		if (name) {
	// 			const character = {
	// 				id,
	// 				name,
	// 				gender,
	// 				species,
	// 				origin: origin.name,
	// 				image,
	// 				status,
	// 			};
	// 			return res.status(200).json(character);
	// 		}
	// 		return res.status(404).send("Not found");
	// 	})
	// 	.catch((error) => res.status(500).send(error.message));
};

module.exports = { getCharById };
