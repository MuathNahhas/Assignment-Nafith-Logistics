const connection = require("../../../db/db");

getAllUser = (req, res) => {
  const getAllUserQuery =
    "SELECT user_id,username,email from users where is_deleted=0";
  connection.query(getAllUserQuery, (err, result) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "can't get All user please",
      });
    }
    return res.status(200).json({
      success: true,
      message: "get all user successfully",
      result: result,
    });
  });
};
const updateUser = (req, res) => {
  const userId = req.params.userId;
  const { username, email } = req.body;
  let newInformation;
  let updateUserQuery;
  selectInformation = [userId];
  selectUserQuery = "select username,email,password from users WHERE user_id=?";

  //check if data that user add same data and nothing updated
  connection.query(selectUserQuery, selectInformation, (err, result) => {
    if (result[0].email === email && result[0].username === username) {
      return res.json({
        success: false,
        message: "Nothing was Updated",
      });
      //if email was updated
    } else if (email === "") {
      newInformation = [email, userId];
      updateUserQuery = "UPDATE users SET email=? WHERE user_id=? ";
      connection.query(updateNoteQuery, newInformation, (err, result) => {
        if (err) {
          return res.json({
            success: false,
            message: "can't update user data please try Again",
          });
        }
        return res.status(200).json({
          success: true,
          message: "The user data was updated successfully",
          result: result,
        });
      });
      //if email was username
    } else if (username === "") {
      newInformation = [username, userId];
      updateUserQuery = "UPDATE users SET username=? WHERE user_id=?";
      connection.query(updateNoteQuery, newInformation, (err, result) => {
        if (err) {
          return res.json({
            success: false,
            message: "can't update user data please try Again",
          });
        }
        return res.status(200).json({
          success: true,
          message: "The user data was updated successfully",
          result: result,
        });
      });

      //if add data need updated
    } else {
      newInformation = [username, email, userId];
      updateUserQuery = "UPDATE users SET username=?,email=? WHERE user_id=?";
      connection.query(updateUserQuery, newInformation, (err, result) => {
        if (err) {
          return res.json({
            success: false,
            message: err,
          });
        }
        return res.status(200).json({
          success: true,
          message: "The userdata was updated successfully",
          result: result,
        });
      });
    }
  });
};

const deleteUser = (req, res) => {
  const userId = req.params.userId;
  const userNumber = [userId];
  const deleteUserQuery = "UPDATE users SET is_deleted=1 WHERE user_id=?";
  connection.query(deleteUserQuery, userNumber, (err, result) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "can't delete user please try Again",
      });
    }
    return res.status(200).json({
      success: true,
      message: "The user was deleted successfully",
    });
  });
};

module.exports = { getAllUser, deleteUser, updateUser };
