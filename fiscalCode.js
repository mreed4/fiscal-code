const fiscalCode = (person) => {
  let { name: firstName, surname, gender, dob } = person;
  const months = { 1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "H", 7: "L", 8: "M", 9: "P", 10: "R", 11: "S", 12: "T" };
  dob = person.dob.split("/").map((n) => +n);

  function getLetters(string, letterType = "consonants") {
		let vowels = string.match(/[aeiou]/gi);
		let consonants = string.match(/[^aeiou]/gi);
    if (letterType !== "consonants") { return vowels }
		return consonants;
  }

  function generateSurnamePart(num) {
    let arr = getLetters(surname);
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
    let arr = getLetters(firstName);
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
  }

  function generateGenderAndDobPart(letter, date) {
    let part;
    let [day, month, year] = date;

    year = String(year).slice(2);
    month = months[month];
    day = letter === "F" ? day + 40 : letter === "M" && day < 10 ? 0 + String(day) : day;

    part = [year, month, day];

    return part;
  }

  let consonantsInFirstName = getLetters(firstName).length;
  let consonantsInSurname = getLetters(surname).length;
  let surnamePart = generateSurnamePart(consonantsInSurname);
  let firstNamePart = generateNamePart(consonantsInFirstName);
  let genderAndDobPart = generateGenderAndDobPart(gender, dob);

  let parts = [surnamePart, firstNamePart, genderAndDobPart];
  let final = parts
    .map((part) => part.join(""))
    .join("")
    .toUpperCase();

  return final;
};