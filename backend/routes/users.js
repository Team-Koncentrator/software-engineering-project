const express = require("express");
const router = express.Router();
const User = require("../models/user");

// get all
router.get("/", async (request, response) => {
  try {
    const users = await User.find();
    response.json(users);
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
});

// get one
router.get("/:id", getUser, (request, response) => {
  response.send(response.user);
});

// create one
router.post("/", async (request, response) => {
  const user = new User({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    age: request.body.age,
    gender: request.body.gender,
  });

  try {
    const newUser = await user.save();
    response.status(201).json(newUser);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

// update one
router.patch("/:id", getUser, async (request, response) => {
  if (request.body.firstName != null)
    response.user.firstName = request.body.firstName;
  if (request.body.lastName != null)
    response.user.lastName = request.body.lastName;
  if (request.body.age != null) response.user.age = request.body.age;
  if (request.body.gender != null) response.user.gender = request.body.gender;

  try {
    const updatedUser = await response.user.save();
    response.json(updatedUser);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

// delete one
router.delete("/:id", getUser, async (request, response) => {
  try {
    await response.user.remove();
    response.json({ message: "User deleted" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

async function getUser(request, response, next) {
  let user;
  try {
    user = await User.findById(request.params.id);

    if (user === null) {
      return response.status(404).json({ message: "Cant find the user" });
    }
  } catch (error) {
    console.log("dupa: " + user);
    return response.status(500).json({ message: error.message });
  }

  response.user = user;
  next();
}

// handling csv file form
router.post("/create", async (request, response) => {
  // parse csv to json
  console.log("PACZYMY NA RIKŁESTA:");
  console.log(request.raw);

  // if ok save array and send response in json
  return response.status(200).json({ message: "OK" });
});

module.exports = router;
