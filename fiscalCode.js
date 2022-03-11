const generateFiscalCode = (person) => {
  const months = { 1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "H", 7: "L", 8: "M", 9: "P", 10: "R", 11: "S", 12: "T" };

  let name = person.name,
    surname = person.surname,
    gender = person.gender,
    dob = person.dob.split("/").map((n) => +n),
    namePart,
    surnamePart,
    genderAndDobPart;

  // Generates arrays of consonants or vowels, based on what is passed into it
  const consonants = (str) => str.match(/[^aeiou]/gi),
    vowels = (str) => str.match(/[aeiou]/gi);

  // The number of consonants and vowels in name and surname
  let consonantsInName = consonants(name).length,
    vowelsInName = vowels(name).length,
    consonantsInSurname = consonants(surname).length,
    vowelsInSurname = vowels(surname).length;

  const generateSurnamePart = (consonantsInSurname) => {
    let arr = consonants(surname);
    let part =
      surname.length < 3
        ? [...surname].concat(["x"])
        : consonantsInSurname >= 3
        ? arr.slice(0, 3)
        : consonantsInSurname < 3
        ? arr.slice(0, 2).concat(vowels(surname).slice(0, 1))
        : "ERROR"; // This should never be returned

    return part;
  };

  const generateNamePart = (consonantsInName) => {
    let arr = consonants(name);
    let part =
      name.length < 3
        ? [...name].concat(["x"])
        : consonantsInName > 3
        ? [arr[0] + arr[2] + arr[3]]
        : consonantsInName === 3
        ? arr
        : consonantsInName < 3
        ? arr.slice(0, 2).concat(vowels(name).slice(0, 1))
        : "ERROR"; // This should never be returned

    return part;
  };

  const generateGenderAndDobPart = (gender, dob) => {
    let [day, month, year] = dob;
    year = String(year).slice(2);
    month = months[month];
    day = gender === "F" ? day + 40 : gender === "M" && day < 10 ? 0 + String(day) : day;
    return [year, month, day];
  };

  // Tie it all together
  surnamePart = generateSurnamePart(consonantsInSurname);
  namePart = generateNamePart(consonantsInName);
  genderAndDobPart = generateGenderAndDobPart(gender, dob);

  let parts = [surnamePart, namePart, genderAndDobPart];
  let fiscalCode = parts
    .map((part) => part.join(""))
    .join("")
    .toUpperCase();

  return fiscalCode;
};
