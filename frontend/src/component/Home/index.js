import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { AiTwotoneEdit } from "react-icons/ai";
import { AiTwotoneDelete } from "react-icons/ai";
import "./style.css";
import Swal from "sweetalert2";
const Home = () => {
  const token = window.localStorage.getItem("Token");
  //use state hook
  const [id, setId] = useState();
  const [isUpdate, setIsUpdate] = useState(false);
  const [username, setUsername] = useState();
  const [allUser, setAllUser] = useState([]);
  const [email, setemail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    getAllUser();
  }, [isUpdate]);

  //get all user from database
  const getAllUser = () => {
    axios
      .get("http://localhost:5000/AllUser", {
        headers: { Authorization: `Bearer ${token} ` },
      })
      .then((result) => {
        console.log(result.data.result);
        setAllUser(result.data.result);
      })
      .catch((err) => {});
  };
  const insert = () => {
    axios
      .post(
        "http://localhost:5000/signUp",
        { username, email, password },
        {
          headers: { Authorization: `Bearer ${token} ` },
        }
      )
      .then((result) => {
        console.log(result);
        if (isUpdate === true) {
          setIsUpdate(false);
        } else {
          setIsUpdate(true);
        }
        setUsername("");
        setemail("");
        setPassword("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //update user information
  const update = () => {
    axios
      .put(
        `http://localhost:5000/${id}`,
        { username, email },
        {
          headers: { Authorization: `Bearer ${token} ` },
        }
      )
      .then((result) => {
        setUsername("");
        setemail("");
        setPassword("");
        console.log(result);
        if (isUpdate === true) {
          setIsUpdate(false);
        } else {
          setIsUpdate(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //use this function to fill all data in input before update
  const getUserInformation = (id, username, email, password) => {
    setId(id);
    setUsername(username);
    setemail(email);
    setPassword(password);
  };
  //delete user
  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://localhost:5000/${id}`, {
              headers: { Authorization: `Bearer ${token} ` },
            })
            .then((result) => {
              if (isUpdate === true) {
                setIsUpdate(false);
              } else {
                setIsUpdate(true);
              }
            });
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      })

      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="formUser">
        <br />
        <br />
        <input
          className="email"
          value={username}
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <br />
        <input
          className="Input-text"
          value={email}
          placeholder="email"
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />

        <br />

        <input
          className="Input-text"
          value={password}
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <br />

        <button className="button" onClick={insert}>
          insert
        </button>
        <button className="button" onClick={update}>
          Update
        </button>
      </div>

      <div>
        <table className="responstable">
          <tr>
            <th>Email address</th>
            <th data-th="Driver details">
              <span>Name</span>
            </th>
            <th>Delete</th>
            <th>Update</th>
          </tr>

          {allUser.map((element, index) => {
            return (
              <tr index={index}>
                <td>{element.email}</td>
                <td>{element.username}</td>

                <td
                  onClick={(e) => {
                    deleteUser(element.user_id);
                  }}
                >
                  <AiTwotoneDelete />
                </td>
                <td
                  onClick={(e) => {
                    getUserInformation(
                      element.user_id,
                      element.username,
                      element.email,
                      "password"
                    );
                  }}
                >
                  <AiTwotoneEdit />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Home;
