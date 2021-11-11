import React, { useState, useEffect } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import axios from "axios";

function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDay] = useState(0);
  const [newFoodName, SetNewFood] = useState("");
  const [foodList, setFoodList] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/read").then((response) => {
      setFoodList(response.data);
    });
  }, []);

  const addToList = () => {
    axios.post(
      "http://localhost:3001/insert",

      {
        foodName: foodName,
        days: days,
      }
    );
  };

  const UpdateFodd = (id) => {
    axios.put("http://localhost:3001/update", {
      id: id,
      newFoodName: newFoodName,
    });
  };

  const deleteFood = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`);
  };

  return (
    <div className="App">
      <Navbar />

      <h1>CRUD APP with MERN</h1>
      <div className="form">
        <label>Food name</label>
        <input
          type="text"
          name="foodName"
          onChange={(event) => {
            setFoodName(event.target.value);
          }}
        />
        <label>Days Since you ATE</label>
        <input
          type="number"
          name="sinceyouate"
          onChange={(event) => {
            setDay(event.target.value);
          }}
        />

        <button className="btn btn-dark btn-lg" onClick={addToList}>
          ADD To List
        </button>
        <hr />
        <h1>Food List</h1>
        {foodList.map((val, key) => {
          return (
            <div key={key} className="card m-2">
              {" "}
              <h1></h1>
              <div className="card-body">
                <h4 className="card-title"> {val.foodName}</h4>
                <p className="card-text">{val.daySinceIAte}</p>
                <input
                  className="form-control"
                  type="text"
                  placeholder="New Food Name"
                  onChange={(event) => {
                    SetNewFood(event.target.value);
                  }}
                />
                <a
                  href="#"
                  className="btn btn-primary m-1"
                  onClick={() => UpdateFodd(val._id)}
                >
                  Update{" "}
                </a>
                <a
                  href="#"
                  className="btn btn-danger"
                  onClick={() => deleteFood(val._id)}
                >
                  Delete
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
