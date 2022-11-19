const fiscalCode = (person) => {
  const months = { 1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "H", 7: "L", 8: "M", 9: "P", 10: "R", 11: "S", 12: "T" };

  let { firstName, surname, gender, dob } = person;
  dob = person.dob.split("/").map((n) => +n);
  let namePart, surnamePart, genderAndDobPart;

  // Generates arrays of consonants or vowels, based on what is passed into it
  function getLetters(string, type = "consonants") {
    if (type === "consonants") {
      return string.match(/[^aeiou]/gi);
    } else {
      return string.match(/[aeiou]/gi);
    }
  }

  // The number of consonants and vowels in name and surname
  let consonantsInFirstNsame = getLetters(firstName).length;
  let consonantsInSurname = getLetters(surname).length;

  function generateSurnamePart(num) {
    let arr = getLetters(surname, "consonants");
    let part =
      surname.length < 3
        ? [...surname].concat(["x"])
        : num >= 3
        ? arr.slice(0, 3)
        : num < 3
        ? arr.slice(0, 2).concat(getLetters(surname, "vowels").slice(0, 1))
        : "ERROR"; // This should never be returned

    return part;
  }

  function generateNamePart(num) {
    let arr = getletters(firstName, "consonants");
    let part =
      firstName.length < 3
        ? [...firstName].reverse().concat(["x"])
        : num > 3
        ? [arr[0] + arr[2] + arr[3]]
        : num === 3
        ? arr
        : num < 3
        ? arr.slice(0, 2).concat(getLetters(firstName, "vowels").slice(0, 1))
        : "ERROR"; // This should never be returned

    return part;
  };

  function generateGenderAndDobPart(gender, dob) {
    let part;
    const [day, month, year] = dob;

    year = String(year).slice(2);
    month = months[month];
    day = gender === "F" ? day + 40 : gender === "M" && day < 10 ? 0 + String(day) : day;

    part = [year, month, day];

    return part;
  };

  // Tie it all together
  surnamePart = generateSurnamePart(consonantsInSurname);
  namePart = generateNamePart(consonantsInName);
  genderAndDobPart = generateGenderAndDobPart(gender, dob);

  let parts = [surnamePart, namePart, genderAndDobPart];
  let final = parts
    .map((part) => part.join(""))
    .join("")
    .toUpperCase();

  return final;
};
