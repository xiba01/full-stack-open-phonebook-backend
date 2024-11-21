const mongoose = require("mongoose");

const args = process.argv;

if (args.length !== 3 && args.length !== 5) {
  console.log("Invalide number of arugements. Usage:");
  console.log(
    "node mongo.js <password> OR node mongo.js <password> <name> <number>"
  );
  process.exit(1);
}

const password = args[2];
const url = `mongodb+srv://mostafachibacontact:${password}@fullstackopen.ch6ur.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=FullStackOpen`;
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (args.length === 5) {
  const person = new Person({
    name: args[3],
    number: args[4],
  });

  person.save().then((result) => {
    console.log(`added ${args[3]} number ${args[4]} to phonebook`);
    mongoose.connection.close();
  });
} else if (args.length === 3) {
  Person.find({}).then((result) => {
    if (result.length > 0) {
      console.log("phonebook:");
      result.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
    } else {
      console.log("No person added yet.");
    }
    mongoose.connection.close();
  });
}
