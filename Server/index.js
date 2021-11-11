const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");
const FoodModel = require("./models/Food");

app.use(express.json());

//Connetion to DB
mongoose
  .connect(
    "mongodb+srv://starlyn:s198727f@cluster0.pxvdy.mongodb.net/food?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then((db) => console.log("db is connected"))
  .catch((err) => console.error(err));

//cREATE DATA IN DB
app.post("/insert", async (req, res) => {
  const foodname = req.body.foodName;
  const days = req.body.days;

  const food = new FoodModel({ foodName: foodname, daySinceIAte: days });
  try {
    await food.save();
    res.send("inserted data");
  } catch (error) {
    console.log(error);
  }
});

//gET DATA FROM DB
app.get("/read", async (req, res) => {
  FoodModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

// Put o update DATA

app.put("/update", async (req, res) => {
  const newFoodName = req.body.newFoodName;
  const id = req.body.id;

  try {
    await FoodModel.findById(id, (err, updatedFood) => {
      updatedFood.foodName = newFoodName;
      updatedFood.save();
      res.send("update");
    });
  } catch (error) {
    console.log(error);
  }
});

// delete

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await FoodModel.findByIdAndRemove(id).exec();
  res.send("Delete");
});

app.use(cors());

// server running -------------------
app.listen(3001, () => {
  console.log("Running on port 3001");
});
