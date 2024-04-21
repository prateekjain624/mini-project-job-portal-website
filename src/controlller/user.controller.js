import {
  registerRecruiter,
  authenticateRecruiter,
} from "../models/user.model.js";

import { getAllApplicant } from "../models/applicant.model.js";

export default class userController {
  gethomePage = (req, res, next) => {
    // Retrieve the username from the session
    const { userName } = req.session;

    // Render the home page with the username if available
    return res.render("home", {
      userEmail: req.session.userEmail,
      username: userName,
      errors: null,
    });
  };

  getlogin = (req, res, next) => {
    return res.render("login", { error: null });
  };

  getapplicant = (req, res, next) => {
    const applicants = getAllApplicant();
    // console.log(applicants);

    return res.render("applicantlist", {
      applicants: applicants,
      username: req.session.userName,
    });
  };

  RegisterRecruiter = (req, res) => {
    // Register the recruiter
    registerRecruiter(req.body);

    return res.redirect("/login");
  };

  loginRecruiter = (req, res) => {
    const recruiterDetails = req.body;
    const recruiter = authenticateRecruiter(recruiterDetails);

    if (!recruiter) {
      return res.render("login", { errorMsg: "Invalid Credential" });
    }

    // Set session variables upon successful login
    req.session.userEmail = recruiter.email;
    req.session.userName = recruiter.name;

    return res.redirect("/alljob");
  };

  userLogout = (req, res) => {
    req.session.destroy((err) => {
      if (err) res.status(401).send(err);
      else res.redirect("/login");
    });
  };
}
