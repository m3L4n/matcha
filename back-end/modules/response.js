exports.success = (result) => {
  return {
    code: 200,
    status: "success",
    result: result,
  };
};

exports.error = (message) => {
  return {
    code: 400,
    status: "error",
    message: message,
  };
};

exports.isErr = (err) => {
  return err instanceof Error;
};

exports.checkAndChange = (obj) => {
  if (this.isErr(obj)) {
    return this.error(obj.message);
  } else {
    return this.success(obj);
  }
};
