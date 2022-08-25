const connection = require("../../../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SignIn = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const query = `SELECT * FROM users WHERE username = ?`;

  connection.query(query, [username], async (err, result) => {
    if (err) {
      res.status(500).json("server error");
    }
    if (!result.length) {
      res
        .status(404)
        .json({ success: false, message: `The username doesn't exist ` });
    } else {
      const valid = await bcrypt.compare(password, result[0].password);
      if (!valid) {
        return res.json({
          success: false,
          message: `The password you’ve entered is incorrect `,
        });
      }
      const payload = {
        userId: result[0].user_id,
        username: result[0].username,
        email: result[0].email,
      };
      SECRET = "SECRET";
      const options = {
        expiresIn: "60m",
      };
      const token = jwt.sign(payload, SECRET, options);
      res.status(200).json({
        success: true,
        message: `username and Password are correct`,
        token: token,
        user_name: result[0].user_name,
      });
    }
  });
};

module.exports = { SignIn };
