const express = require("express");
const router = express.Router();
const House = require("../models/house");
const User = require("../models/user");

// *************************************************
// handle csv
router.post("/csv", async (request, response) => {
  let housesCreated = [];
  let usersCreated = { men: [], women: [] };

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

  // add houses to db
  try {
    const insertedHouses = await House.insertMany(request.body.houses);

    // create pure users array for insert
    usersToInsert = [];
    request.body.people.map((user) => {
      let userDocument = {
        name: user.name,
        surname: user.surname,
        nickname: undefined,
        age: user.age,
        gender: user.gender,
        withWho: user.withWho,
        isAdmin: false,
        password: undefined,
      };
      usersToInsert.push(userDocument);
    });

    // add users
    const insertedUsers = await User.insertMany(usersToInsert);

    // sort inserted users
    const men = [];
    const women = [];
    insertedUsers.map((user) => {
      if (user.gender != undefined) {
        gender = user.gender.toLowerCase();
        if (
          gender.includes("female") ||
          gender.includes("kobieta") ||
          gender.includes("woman") ||
          gender.includes("k")
        )
          women.push(user);
        else {
          men.push(user);
        }
      }
    });

    const compare = (a, b) => {
      if (a.age < b.age) {
        return -1;
      }
      if (a.age > b.age) {
        return 1;
      }
      return 0;
    };

    men.sort(compare);
    women.sort(compare);

    // assign person to the room
    //insertedHouses, men, women
    let menCounter = 0;
    let womenCounter = 0;

    // NOT WORKING
    let result = insertedHouses.map((house) => {
      let parsedHouses = house.rooms.map((room) => {
        let i = 0;
        let filledRoom;
        while (room.size > i) {
          if (menCounter < men.length) {
            filledRoom = room;
            filledRoom.users.push(men[menCounter]);
            menCounter++;
          } else if (womenCounter < women.length) {
            filledRoom = room;
            filledRoom.users.push(women[womenCounter]);
            womenCounter++;
          } else break;
          i++;
        }
        return filledRoom;
      });
      return parsedHouses;
    });

    console.log(result[0].users);

    response
      .status(201)
      .json({ message: "Houses and users created, users assigned" });
  } catch (error) {
    console.log(error);
    response.status(400).json({ message: error.message });
    return;
  }
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
    console.log(house);
    return response.status(500).json({ message: error.message });
  }

  response.house = house;
  next();
}
module.exports = router;
