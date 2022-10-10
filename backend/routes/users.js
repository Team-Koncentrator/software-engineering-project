const express = require("express");
const router = express.Router();
const User = require("../models/user");

// get all
router.get("/", async (request, response) => {
  try {
    const users = await User.find();
    //const users = await User.find({}, { password: 0 });  // don't pass password
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
    name: request.body.name,
    surname: request.body.surname,
    age: request.body.age,
    gender: request.body.gender,
    password: request.body.password,
    withWho: request.body.withWho,
    isAdmin: request.body.isAdmin,
    nickname: request.body.nickname,
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
  if (request.body.name != null) response.user.name = request.body.name;
  if (request.body.surname != null)
    response.user.surname = request.body.surname;
  if (request.body.age != null) response.user.age = request.body.age;
  if (request.body.gender != null) response.user.gender = request.body.gender;
  if (request.body.password != null)
    response.user.password = request.body.password;
  if (request.body.isAdmin != null)
    response.user.isAdmin = request.body.isAdmin;
  if (request.body.withWho != null)
    response.user.withWho = request.body.withWho;
  if (request.body.nickname != null)
    response.user.nickname = request.body.nickname;

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
    console.log(user);
    return response.status(500).json({ message: error.message });
  }

  response.user = user;
  next();
}
module.exports = router;
