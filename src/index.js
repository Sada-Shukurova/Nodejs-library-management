import express from "express";
import _animals from "./db/animals.js";
import port from "../utils/port.js";

const app = express();
app.use(express.json());

let animals = [..._animals];

// ============= GET ==============

app.get("/animals", (req, res) => {
  res.status(200).json(animals);
});

app.get("/animals/:id", (req, res) => {
  const id = req.params.id;
  const animal = animals.find((animal) => animal.id === id);
  if (animal) {
    res.status(200).json(animal);
  } else {
    res.status(404).json({ message: "animal not found" });
  }
});

app.get("/animals/type/:type", (req, res) => {
  const _type = req.params.type;
  const animalType = animals.filter((animal) => animal.type === _type);
  if (animalType.length > 0) {
    res.status(200).json(animalType);
  } else {
    res.status(404).json({ message: `animal of type ${_type} not found` });
  }
});

app.get("/animals/count/:type", (req, res) => {
  const _type = req.params.type;
  const animalByType = animals.filter((animal) => animal.type === _type);
  if (animalByType.length > 0) {
    res.status(200).json({
      count: `there is ${animalByType.length} ${_type}${
        animalByType.length > 1 ? "s" : ""
      } in the zoo`,
    });
  } else {
    res.status(404).json({ message: `animal of type ${_type} not found` });
  }
});

app.get("/animals/calculateAverageAge/:type", (req, res) => {
  const _type = req.params.type;
  const animalCountByType = animals.filter((animal) => animal.type === _type);
  const ageSum = animalType.reduce((a, b) => a + b.age, 0);
  const averageAge = Math.round(ageSum / animalCountByType.length);
  if (animalType.length > 0) {
    res.status(200).json({
      averageAge: `average age of ${_type} in the zoo is ${averageAge}`,
    });
  } else {
    res.status(404).json({ message: `animal of type ${_type} not found` });
  }
});

// ========== POST ===============

app.post("/animals", (req, res) => {
  animals.push(req.body);
  res.status(201).send({ message: "new animal created" });
});

// =============== PUT ===========

app.put("/animals/:id", (req, res) => {
  const id = req.params.id;
  animals = animals.map((animal) => {
    if (animal.id === id) {
      return req.body;
    }
    return animal;
  });
  res.status(200).send({ message: "animal is updated", id });
});

app.put("/animals/hbd/:id", (req, res) => {
  const id = req.params.id;
  animals = animals.map((animal) => {
    if (animal.id === id) {
      return { ...animal, age: animal.age + 1 };
    }
    return animal;
  });
  res.status(200).send({ message: "animal is updated, happy birthday", id });
});

// ========== DELETE =========

app.delete("/animals/:id", (req, res) => {
  const id = req.params.id;
  animals = animals.filter((us) => us.id !== id);
  res.status(200).send({ message: "animal is deleted", id });
});

// ============= PATCH ==========
//
// app.patch("/animals/:id", (req, res) => {
//   const id = req.params.id;
//   animals = animals.map((animal) => {
//     if (animal.id === id) {
//       return { ...animal, ...req.body };
//     }
//     return animal;
//   });
//   res.status(200).send({ message: "animal is updated with patch", id });
// });

// =========== LISTEN =========

app.listen(port, () => {
  console.log(`server is up on ${port}`);
});
