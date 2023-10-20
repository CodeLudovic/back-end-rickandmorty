const { login } = require("../controllers/login");
const { getCharById } = require("../controllers/getCharById");
const { postFav } = require("../controllers/postFav");
const { deleteFav } = require("../controllers/deleteFav");
const { postUser } = require("../controllers/postUser");
const { Router } = require("express");
const router = Router();
// const router = require("express").Router();

router.get("/character/:id", getCharById);
router.get("/login", login);
router.post("/fav", postFav);
router.delete("/fav/:id", deleteFav);
router.post("/signup", postUser);

module.exports = router;
