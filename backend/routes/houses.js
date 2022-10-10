const express = require("express");
const router = express.Router();
const House = require("../models/house");
const User = require("../models/user");

// *************************************************
// handle csv
router.post("/csv", async (request, response) => {
  //console.log(request.body);

  //adding houses to db
  request.body.houses.map(async (house) => {
    let houseDocument = new House({
      houseName: house.houseName,
      rooms: house.rooms,
    });

    try {
      const newHouse = await houseDocument.save();
      housesCreated.push(newHouse);
    } catch (error) {
      response.status(400).json({ message: error.message });
      return;
    }
  });

  // rename user keys by headers
  request.body.people.map((user) => {
    delete Object.assign(user, { ["name"]: user[request.body.header.name] })[
      request.body.header.name
    ];

    delete Object.assign(user, {
      ["surname"]: user[request.body.header.surname],
    })[request.body.header.name];

    delete Object.assign(user, { ["age"]: user[request.body.header.age] })[
      request.body.header.name
    ];

    delete Object.assign(user, {
      ["gender"]: user[request.body.header.gender],
    })[request.body.header.name];

    delete Object.assign(user, {
      ["withWho"]: user[request.body.header.withWho],
    })[request.body.header.name];
  });

  let housesCreated = [];
  let usersCreated = { men: [], women: [] };

  // add users
  request.body.people.map(async (user) => {
    let userDocument = new User({
      name: user.name,
      surname: user.surname,
      age: user.age,
      gender: user.gender,
      withWho: user.withWho,
      isAdmin: false,
      password: undefined,
    });

    try {
      const newUser = await userDocument.save();
      if (newUser.gender) {
        let gender = newUser.gender.toLowerCase();
        if (
          gender.includes("female") ||
          gender.includes("kobieta") ||
          gender.includes("woman") ||
          gender.includes("k")
        ) {
          usersCreated.women.push(newUser);
        } else {
          usersCreated.men.push(newUser);
        }
        return usersCreated;
      }
    } catch (error) {
      response.status(400).json({ message: error.message });
      return;
    }
  });

  console.log(usersCreated);
});

// *************************************************
// get all
router.get("/", async (request, response) => {
  try {
    const houses = await House.find();
    response.json(houses);
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
});

// *************************************************
// get one
router.get("/:id", getHouse, (request, response) => {
  response.send(response.house);
});

// *************************************************
// create one
router.post("/", async (request, response) => {
  const house = new House({
    houseName: request.body.houseName,
    rooms: request.body.rooms,
  });

  try {
    const newHouse = await house.save();
    response.status(201).json(newHouse);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

// *************************************************
// update one
router.patch("/:id", getHouse, async (request, response) => {
  if (request.body.houseName != null)
    response.house.houseName = request.body.houseName;

  try {
    const updatedHouse = await response.house.save();
    response.json(updatedHouse);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

// *************************************************
// delete one
router.delete("/:id", getHouse, async (request, response) => {
  try {
    await response.house.remove();
    response.json({ message: "House deleted" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// *************************************************
async function getHouse(request, response, next) {
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
