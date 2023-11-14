function isNotEmptyButNaN(param) {
  if (param !== "" && (isNaN(param) || !isFinite(param))) {
    return true;
  }
  return false;
}

function searchValidation(searchParams) {
  if (searchParams.action !== "" && searchParams.action !== "search") {
    return "Invalid action criteria";
  }

  if (isNotEmptyButNaN(searchParams.age)) {
    return "Invalid age criteria";
  }

  if (isNotEmptyButNaN(searchParams.location)) {
    return "Invalid location criteria";
  }

  if (isNotEmptyButNaN(searchParams.fame)) {
    return "Invalid fame rating criteria";
  }
  if (
    searchParams.action === "search" &&
    searchParams.fame === "" &&
    searchParams.age === "" &&
    searchParams.location === "" &&
    searchParams.tags === ""
  ) {
    return "Empty search criteria";
  }
  return "ok";
}

module.exports = {
  searchValidation,
};
