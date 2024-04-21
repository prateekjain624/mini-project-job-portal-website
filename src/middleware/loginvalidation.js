export const loginValidate = (req, res, next) => {
  const { email, password } = req.body;
  const error = [];

  if (!email || email.trim() == "") {
    error.push("email is required");
  }
  if (!password || password.trim() == "") {
    error.push("password is required");
  }

  if (error.length > 0) {
    return res.render("login", {
      userEmail: "",
      username: "",
      error: error[0],
    });
  }
  next();
};
