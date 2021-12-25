const authCtrl = require("../controllers/authController");
const auth = require("../middleware/auth");
const router = require("express").Router();

router.get("/", authCtrl.home);

router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);
router.get("/getuser", auth, authCtrl.userInfo);

module.exports = router;
