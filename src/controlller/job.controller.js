import {
  addJobs,
  getAllJob,
  jobById,
  updatejob,
  deleteJob,
  getJobsByPage,
} from "../models/job.model.js";

export default class jobController {
  getNewJobForm = (req, res, next) => {
    return res.render("addnewjob", {
      userEmail: req.session.userEmail,
      username: req.session.userName,
      error: null,
    });
  };

  addnewjob = (req, res, next) => {
    const jobDetails = req.body;

    addJobs(jobDetails, req.session.userEmail);

    return res.redirect("/alljob");
  };

  getalljobs = (req, res, next) => {
    const TotalJobCount = getAllJob();
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const pageSize = parseInt(req.query.pageSize) || 6; // Default page size

    const jobs = getJobsByPage(pageNumber, pageSize);
    return res.render("joblisting", {
      jobs: jobs,
      userEmail: req.session.userEmail,
      username: req.session.userName,
      currentPage: pageNumber,
      pageSize: pageSize,
      totalJobsCount: TotalJobCount,
    });
  };

  viewdetails = (req, res, next) => {
    const id = req.params.id;
    const job = jobById(id);
    if (!job) {
      return res.status(404).send("Job not found");
    }
    return res.render("viewdetails", {
      job: job,
      userEmail: req.session.userEmail,
      username: req.session.userName,
    });
  };

  getupdateJobview = (req, res, next) => {
    const id = req.params.id;
    const job = jobById(id);

    const userEmail = req.session.userEmail;

    if (job.email !== userEmail) {
      const msg = "You can only edit the jobs you've posted";
      return res.render("errorpage", {
        username: req.session.userName,
        msg: msg,
      });
    } else {
      return res.render("updatejob", {
        job: job,
        username: req.session.userName,
        msg: null,
      });
    }
  };

  updateJob = (req, res, next) => {
    const jobDetails = req.body;
    console.log(jobDetails);

    const updatedjob = updatejob(jobDetails);

    if (!updatedjob) {
      return res.render("errorpage");
    }

    return res.redirect(`/jobDetail/${updatedjob.id}`);
  };

  deletejob = (req, res, next) => {
    const id = req.params.id;
    const job = jobById(id);

    if (!job) {
      return res.status(404).send("Job not found");
    }

    const userEmail = req.session.userEmail;

    if (job.email !== userEmail) {
      return res.status(403).send("Unauthorized");
    }

    deleteJob(id);

    return res.redirect("/alljob");
  };

  errorPage = (req, res, next) => {
    const msg = "Only recruiter is allowed to access this page";
    return res.render("errorpage", {
      userEmail: req.session.userEmail,
      username: req.session.userName,
      msg,
    });
  };
}
