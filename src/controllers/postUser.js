const { User } = require("./../DB_connection");

const postUser = async (req, res) => {
	try {
		const { password, email, id } = req.body;

		if (email === "" || password === "" || !email || !password) {
			return res.status(400).send("Faltan Datos");
		}
		const response = await User.create({
			id: id,
			email: email,
			password: password,
		});
		return res.status(201).json(response);
	} catch {
		return res.status(500).send("Ocurrio un error en el servidor");
	}
};

module.exports = { postUser };
