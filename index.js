const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

morgan.token("body", (req) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  } else {
    return " ";
  }
});

app.use(express.json());
// app.use(morgan("tiny"));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(cors());

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generatedId = () => {
  const id = Math.floor(Math.random() * 5000);
  return String(id);
};

app.get("/", (request, response) => {
  response.send("<h1>Phonebook</h1>");
});

app.get("/api/persons", (request, response) => {
  response.send(persons);
});

app.get("/info", (request, response) => {
  const numOfPersons = persons.length;
  const requestTime = new Date();
  response.send(
    `<p>Phonebook has info for ${numOfPersons} people</p><br/><p>${requestTime}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  person ? response.json(person) : response.status(404).end();
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const existingPerson = persons.find((person) => person.name === body.name);

  if (!body.name || !body.name) {
    return response.status(400).json({ error: "name or number is missing" });
  }

  if (existingPerson) {
    return response.status(400).json({ error: "number already exist" });
  }

  const person = {
    id: generatedId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
