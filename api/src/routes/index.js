const router = require("express").Router();
const { sequelize, User, Reset, Signup } = require("../db");
require("dotenv").config();
const bcrypt = require("bcrypt");
const Crypto = require("crypto");

const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");



router.post("/register", validInfo, async (req, res) => {
    try {
        //1. destructure req.body;

        const { name, email, password } = req.body;
        console.log(req.body);

        const user = await User.findOne({ where: { "email": email } }); // busca en la db usuarios con el mismo email;

        if (user) { // si el email está en uso devuelve un error;
            return res.status(401).send("Email already in use");
        }
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds); // genera una sal para el hasheo de bcrypt;
        const hashedPassword = await bcrypt.hash(password, salt); // bcrypt hashea la contraseña;

        //.4 enter new user in db;

        const newUser = await User.create({
            "name": name,
            "password": hashedPassword,
            "email": email
        })
       
        ////////*****//////////

        // .5 generate jwt;

        const token = jwtGenerator(newUser.dataValues.user_id); // se genera un JWT ligado al user_id;
        res.json(token);

    } catch (error) {
        console.log(error);
    }
})

router.post("/login", validInfo, async (req, res) => {
    console.log("entre a la ruta login");
    try {
      // 1. destructure de req.body;
      const { email, password } = req.body;
      console.log({email} + "estos son los datos que me llegan");  
      // 2. check if user doesn't exist;
      const user = await User.findOne({ where: { email: email } });
        console.log(user);
      if (!user) {
        return res.status(401).json({ message: "Email is incorrect" });
      }
      // 3. check if incoming password is the same as in the db;
      let passwordIsValid = await bcrypt.compare(password,user.dataValues.password); //bcrypt.compare() compara la contraseña que le pasa el usuario y la que se encuentra en la db "password";
  
      if (!passwordIsValid) {
        return res.status(401).json({ message: "Password is incorrect" }); // si la contraseña no es la misma se devuelve un error;
      }
  
      // 4. give them the jwt;
      const token = jwtGenerator(
        user.dataValues.user_id,
        user.dataValues.email,
        user.dataValues.name
      ); // se genera un token JWT ligado al user_id y se devuelve al usuario;
      return res.json({ token: token });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

module.exports = router;
