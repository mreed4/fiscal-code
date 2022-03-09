const months = { 1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "H", 7: "L", 8: "M", 9: "P", 10: "R", 11: "S", 12: "T" };

const fiscalCode = (person) => {
  let name = person.name,
    surname = person.surname,
    gender = person.gender,
    dob = person.dob;

  const consonants = (str) => str.replace(/[aeiou]/g, ""),
    vowels = (str) => str.replace(/[^aeiou]/g, "");
};
