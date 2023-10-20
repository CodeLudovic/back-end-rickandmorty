require("dotenv").config();
const server = require("./app");
const { conn } = require("./DB_connection");
const port = process.env.PORT || 3001;

server.listen(port, () => {
	conn.sync({ force: true }), console.log(`Server raised in port: ${port}`);
});
