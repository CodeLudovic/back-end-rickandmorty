const { User } = require("./../DB_connection");

const login = async (req, res) => {
	try {
		const { email, password } = req.query;

		if (email === "" || password === "" || !email || !password) {
			return res.status(400).send("Faltan Datos");
		}
		console.log(email, password);
		const respon = await User.findOne({ where: { email: email } });

		if (respon) {
			let { dataValues } = respon;
			if (email === dataValues.email && password === dataValues.password) {
				req.session.userId = respon.id;
				return res.status(200).json({
					access: true,
				});
			} else {
				return res.status(403).send("Usuario o Contraseña Incorrectos");
			}
		}
		if (!respon) return res.status(403).send("Usuario no encontrado");
	} catch {
		return res.status(500).send("Ocurrio un error en el servidor");
	}
};
//
module.exports = {
	login,
};

// danielospinar@gmail.com
// Dor12345
