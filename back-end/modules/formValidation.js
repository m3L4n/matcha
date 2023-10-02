const { error } = require("./response");

function filterValidation(user) {
  if (user.action && (len(user.action) !== 0 && user.action !== "filter")) {
    return error('Filter action is invalid');
  }

  if (user.age && (user.age < 0 || user.age > 60)) {
    return error('Invalid age gap filter');
  }

  if (user.location && (user.location < 0 || user.location > 600)) {
    return error('Invalid location gap filter');
  }

  if (user.fame && (user.fame < 0 || user.fame > 5200)) {
    return error('Invalid fame gap filter');
  }
  return "ok";
}

function sortValidation(sortParams) {
  for (const [key, value] of Object.entries(sortParams)) {
    if (value != "" && value != "ascending" && value != "descending") {
      console.log("oh NO");
      return error(`Invalid ${key} sort params`);
    }
  }
  return "ok";
}

module.exports = {
  filterValidation,
  sortValidation,
}
