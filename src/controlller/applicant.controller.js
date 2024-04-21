import { addingApplicant } from "../models/applicant.model.js";
import { sendEmail } from "../middleware/sendemail.js";
// import { searchResult } from "../models/job.model.js";

export class applicantController {
  addingApplicants = (req, res) => {
    const { name, email, contact } = req.body;
    const resumePath = req.file.filename;
    // console.log(applicantDetails);
    addingApplicant(name, email, contact, resumePath);

    sendEmail(email, name);

    res.redirect("/alljob");
  };

  searchJob = (req, res, next) => {
    const { name } = req.body;
    const jobs = searchResult(name);

    return res.render("joblisting", {
      jobs: jobs,
      userEmail: req.session.userEmail,
      username: req.session.userName,
    });
  };
}
