export const validateRequest = (req, res, next) => {
  const { name, email, password } = req.body;
  let error = [];

  if (!name || name.trim() === "") {
    error.push("Name is required");
  }

  if (!email || email.trim() === "") {
    error.push("Email is required");
  }

  if (!password || password.trim() === "") {
    error.push("Password is required");
  }
  console.log(error[0]);
  if (error.length > 0) {
    return res
      .status(400)
      .render("home", { userEmail: "", username: "", errors: error });
  }
  next();
};
