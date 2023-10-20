const request = require("supertest");
const app = require("../src/app");
const session = require("supertest");
//const agent = session(app);
const agent = request.agent(app);
describe("Test de RUTAS", () => {
	describe("GET /rickandmorty/character/:id", () => {
		it("Responde con status: 200", async () => {
			// request.agent(app);
			await agent.get("/rickandmorty/character/1").expect(200);
		});
		it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
			// await request.agent(app);
			const response = await agent.get("/rickandmorty/character/1");
			expect(response.body).toHaveProperty("id");
			expect(response.body).toHaveProperty("name");
			expect(response.body).toHaveProperty("species");
			expect(response.body).toHaveProperty("gender");
			expect(response.body).toHaveProperty("status");
			expect(response.body).toHaveProperty("origin");
			expect(response.body).toHaveProperty("image");
		});
		it("Si hay un error responde con status: 500", async () => {
			await agent.get("/rickandmorty/character/1000").expect(500);
		});
	});
	describe("GET /rickandmorty/login", () => {
		it("Validando acceso app por login con datos correctos", async () => {
			const login = {
				email: "danielospinar@gmail.com",
				pass: "Dor943012",
			};
			const response = await agent.get(
				`/rickandmorty/login?email=${login.email}&password=${login.pass}`
			);
			expect(response.body).toEqual({
				access: true,
			});
		});

		it("Validando acceso app por login con datos correctos", async () => {
			const login = {
				email: "danielospinar3@gmail.com",
				pass: "Dor94301232",
			};
			const response = await agent.get(
				`/rickandmorty/login?email=${login.email}&password=${login.pass}`
			);
			expect(response.body).toEqual({
				access: false,
			});
		});
	});
	describe("POST /rickandmorty/fav", () => {
		let favoritos = [];

		beforeEach(() => {
			favoritos = [];
		});

		it("El body debe devolverse en un arreglo", async () => {
			const fav = {
				personaje: "Rick Sanchez",
				episodio: "S01E01",
			};
			const response = await agent
				.post(`/rickandmorty/fav/`)
				.send(fav)
				.expect(200);
			expect(response.body).toContainEqual(fav);
		});
		it("El body debe acumular los objetos en su respuesta", async () => {
			const fav1 = {
				personaje: "Rick Sanchez",
				episodio: "S01E01",
			};
			await agent.post(`/rickandmorty/fav/`).send(fav1).expect(200);

			const fav2 = {
				personaje: "Rick Sanchez",
				episodio: "S01E01",
			};

			await agent.post(`/rickandmorty/fav/`).send(fav2).expect(200);

			const response = await agent
				.post(`/rickandmorty/fav/`)
				.send({})
				.expect(200);

			expect(response.body).toContainEqual(fav1);
			expect(response.body).toContainEqual(fav2);
		});
	});
	describe("DELETE /rickandmorty/fav/:id", () => {
		it("Debe devolver el arreglo si lo borrado no ha sido modificado", async () => {
			const fav2 = {
				id: 501,
				personaje: "Rick Sanchez",
				episodio: "S01E01",
			};
			const response = await agent
				.post(`/rickandmorty/fav/`)
				.send(fav2)
				.expect(200);

			const response2 = await agent.delete(`/rickandmorty/fav/500`).expect(200);

			expect(response.body).toEqual(response2.body);
		});
		it("Debe eliminar el personaje y retonar el arreglo sin el", async () => {
			const fav2 = {
				id: 501,
				personaje: "Rick Sanchez",
				episodio: "S01E01",
			};
			await agent.post(`/rickandmorty/fav/`).send(fav2).expect(200);

			const responseDel = await agent
				.delete(`/rickandmorty/fav/501`)
				.expect(200);

			expect(responseDel.body).not.toContain(fav2);
		});
	});
});
