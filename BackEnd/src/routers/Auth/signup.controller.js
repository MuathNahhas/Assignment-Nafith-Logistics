const connection = require("../../../db/db");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const requestInformation = [username, email, hashPassword];
  const checkUserName = [username];
  const selectUserName = "select username from users where username=?";
  const insertQuery =
    "INSERT INTO users (username,email,password) values(?,?,?)";
  connection.query(selectUserName, checkUserName, (err, result) => {
    if (result[0]) {
      return res.status(500).json({
        success: false,
        message: "User ALREADY EXISTED",
      });
    } else {
      connection.query(insertQuery, requestInformation, (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err,
          });
        }
        return res.status(200).json({
          success: true,
          message: "Success Add User",
          result: result,
        });
      });
    }
  });
};

module.exports = { createUser };
