const { error } = require("./response");

function isNotEmptyButNaN(param) {
  if (param !== "" && (isNaN(param) || !isFinite())) {
    return true;
  }
  return false;
}

function searchValidation(searchParams) {
  // TODO implement tags
  if (searchParams.action !== "" && searchParams.action !== "search") {
    return error("Invalid action criteria");
  }

  if (isNotEmptyButNaN(searchParams.age)) {
    return error("Invalid age criteria");
  }

  if (isNotEmptyButNaN(searchParams.location)) {
    return error("Invalid location criteria");
  }

  if (isNotEmptyButNaN(searchParams.fame)) {
    return error("Invalid fame rating criteria");
  }
  return "ok";
}

module.exports = {
  searchValidation,
}
