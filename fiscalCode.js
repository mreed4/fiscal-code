const months = { 1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "H", 7: "L", 8: "M", 9: "P", 10: "R", 11: "S", 12: "T" };

const generateFiscalCode = (person) => {
  let name = person.name,
    surname = person.surname,
    gender = person.gender,
    dob = person.dob,
    namePart,
    surnamePart,
    genderPart,
    dobPart;

  const consonants = (str) => str.match(/[^aeiou]/gi),
    vowels = (str) => str.match(/[aeiou]/gi);

  let consonantsInName = consonants(name).length,
    vowelsInName = vowels(name).length,
    consonantsInSurname = consonants(surname).length,
    vowelsInSurname = vowels(surname).length;

  const generateSurnamePart = (consonantsInSurname) => {
    let part =
      surname.length < 3
        ? [...surname].concat(["x"])
        : consonantsInSurname >= 3
        ? consonants(surname).slice(0, 3)
        : consonantsInSurname < 3
        ? consonants(surname).slice(0, 2).concat(vowels(surname).slice(0, 1))
        : "XXX";

    return part;
  };

  surnamePart = generateSurnamePart(consonantsInSurname);

  let parts = [surnamePart];

  let fiscalCode = parts.map((part) => part.join("").toUpperCase()).join("");

  return fiscalCode;
};

let test = {
  name: "Matt",
  surname: "Edabit",
  gender: "M",
  dob: "1/1/1900",
};

/*
test = {
  name: "Helen",
  surname: "Fox",
  gender: "F",
  dob: "1/12/1950",
};
*/

console.log(generateFiscalCode(test));
