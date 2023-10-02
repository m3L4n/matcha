function filterValidation(action, age, location, fame, tags) {
  if (action && (len(action) !== 0 && action !== "filter")) {
    throw new Error('Filter action is invalid');
  }

  if (age && (age < 0 || age > 60)) {
    throw new Error('Invalid age gap filter');
  }

  if (location && (location < 0 || location > 600)) {
    throw new Error('Invalid location gap filter');
  }

  if (fame && (fame < 0 || fame > 5200)) {
    throw new Error('Invalid fame gap filter');
  }
}

function sortValidation(sortParams) {
  for (const [key, value] of Object.entries(sortParams)) {
    if (value != "" && value != "ascending" && value != "descending") {
      throw new Error(`Invalid ${key} sort params`);
    }
  }
}

module.exports = {
  filterValidation,
  sortValidation,
}
