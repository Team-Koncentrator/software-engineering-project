const express = require("express");
const router = express.Router();
const House = require("../models/house");
const User = require("../models/user");

// handle csv
router.post("/csv", async (request, response) => {
  const house = new House({
    name: request.body.name,
    surname: request.body.surname,
    age: request.body.age,
    gender: request.body.gender,
    password: request.body.password,
    withWho: request.body.withWho,
    isAdmin: request.body.isAdmin,
  });

  try {
    const newUser = await house.save();
    response.status(201).json(newUser);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

// get all
router.get("/", async (request, response) => {
  try {
    const houses = await House.find();
    //const houses = await House.find({}, { password: 0 });  // don't pass password
    response.json(houses);
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
});

// get one
router.get("/:id", getUser, (request, response) => {
  response.send(response.house);
});

// create one
router.post("/", async (request, response) => {
  const house = new House({
    name: request.body.name,
    surname: request.body.surname,
    age: request.body.age,
    gender: request.body.gender,
    password: request.body.password,
    withWho: request.body.withWho,
    isAdmin: request.body.isAdmin,
  });

  try {
    const newUser = await house.save();
    response.status(201).json(newUser);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

// update one
router.patch("/:id", getUser, async (request, response) => {
  if (request.body.name != null) response.house.name = request.body.name;
  if (request.body.surname != null)
    response.house.surname = request.body.surname;
  if (request.body.age != null) response.house.age = request.body.age;
  if (request.body.gender != null) response.house.gender = request.body.gender;
  if (request.body.password != null)
    response.house.password = request.body.password;
  if (request.body.isAdmin != null)
    response.house.isAdmin = request.body.isAdmin;
  if (request.body.withWho != null)
    response.house.withWho = request.body.withWho;

  try {
    const updatedUser = await response.house.save();
    response.json(updatedUser);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

// delete one
router.delete("/:id", getUser, async (request, response) => {
  try {
    await response.house.remove();
    response.json({ message: "House deleted" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

async function getUser(request, response, next) {
  let house;
  try {
    house = await House.findById(request.params.id);

    if (house === null) {
      return response.status(404).json({ message: "Cant find the house" });
    }
  } catch (error) {
    console.log("dupa: " + house);
    return response.status(500).json({ message: error.message });
  }

  response.house = house;
  next();
}
module.exports = router;
