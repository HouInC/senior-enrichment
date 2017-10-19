// This file should contain all the record creation needed to seed the database with its default values.
// The data can then be loaded with the node seed.js

const Promise = require("bluebird");
const {
  db,
  Campus,
  Student,
} = require('../db/models');

const campus=[{
  name: "Baruch College",
  image: "http://www.baruch.cuny.edu/undergrad/images/undergraduate-virtualtour_001.jpg"
},{
  name: "NYU",
  image: "https://media.glassdoor.com/l/2917/nyu-new-york-university-office.jpg"
},{
  name: "City University of New York",
  image: "https://upload.wikimedia.org/wikipedia/en/e/e4/Seal_of_the_City_University_of_New_York_%28CUNY%29.png"
},{
  name: "Hunter",
  image: "http://www.dolphincommunicationproject.org/media/k2/items/cache/3b6f367a31f95d629e6948a85f73e39c_XL.jpg"
},{
  name: "Queens College",
  image : "http://digitalarchivesresources.qwriting.qc.cuny.edu/files/2011/09/qc10_bg_000056.jpg"
}
]
const random = ()=> {
  return Math.ceil(Math.random()*5);
}


const students= [
    {
      name: "Choi",
      campusId: random(),
      email: "Choi@choi.com"
    },
    {
      name: "John",
      campusId: random(),
      email: "john@john.com"
    },
    {
      name: "Doe",
      campusId: random(),
      email: "Doe@Doe.com"
    },
    {
      name: "Emily",
      campusId: random(),
      email: "emily@emily.com"
    },
    {
      name: "Kary",
      campusId: random(),
      email: "kary@kary.com"
    },
    {
      name: "Brian",
      campusId: random(),
      email: "brian@brian.com"
    },
    {
      name: "Jack",
      campusId: random(),
      email: "Jack@Jack.com"
    },
    {
      name: "Sam",
      campusId: random(),
      email: "sam@sam.com"
    },
    {
      name: "Kyle",
      campusId: random(),
      email: "kyle@kyle.com"
    },
    {
      name: "Claire",
      campusId: random(),
      email: "claire@claire.com"
    },
    {
      name: "Mitchel",
      campusId: random(),
      email: "mitchel@mitchel.com"
    },
    {
      name: "Andrey",
      campusId: random(),
      email: "andrey@andrey.com"
    },
    {
      name: "Rohan",
      campusId: random(),
      email: "rohan@rohan.com"
    },
    {
      name: "Adrien",
      campusId: random(),
      email: "adrien@adrien.com"
    },
    {
      name: "Seth",
      campusId: random(),
      email: "seth@seth.com"
    }
];


const seed = () =>
Promise.all(campus.map(campu =>
  Campus.create(campu))
)
.then(() =>
Promise.all(students.map(student =>
  Student.create(student))
))


db
  .sync({ force: true })
  .then(function() {
    console.log("Dropped old data, now inserting data");
    return seed();
  })
  .then(function() {
    console.log("Finished inserting data");
  })
  .catch(function(err) {
    console.error("There was totally a problem", err, err.stack);
  })
  .finally(function() {
    db.close(); // uses promises but does not return a promise. https://github.com/sequelize/sequelize/pull/5776
    console.log("connection closed"); // the connection eventually closes, we just manually do so to end the process quickly
    return null; // silences bluebird warning about using non-returned promises inside of handlers.
  });
