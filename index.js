import express from "express";
import ejslayout from "express-ejs-layouts";
import path from "path";
import userController from "./src/controlller/user.controller.js";
import jobController from "./src/controlller/job.controller.js";
import { applicantController } from "./src/controlller/applicant.controller.js";
import session from "express-session";
import { auth } from "./src/middleware/auth.js";
import { uploadFile } from "./src/middleware/fileupload.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middleware/lastvisit.js";
import { validateRequest } from "./src/middleware/registervalidate.js";
import { loginValidate } from "./src/middleware/loginvalidation.js";

const app = express();

const usercontroller = new userController();
const jobcontroller = new jobController();
const applicantcontroller = new applicantController();

app.use(ejslayout);
app.use(express.static("public"));

app.use(cookieParser());
app.use(setLastVisit);
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// path to render views
app.set("views", path.join(path.resolve(), "src", "views"));
app.set("view engine", "ejs");

// recruiter route controller

app.get("/", usercontroller.gethomePage);
app.get("/login", usercontroller.getlogin);
app.get("/logout", usercontroller.userLogout);
app.post("/register", validateRequest, usercontroller.RegisterRecruiter);
app.post("/login", loginValidate, usercontroller.loginRecruiter);

// job route controller

app.get("/newjobform", auth, jobcontroller.getNewJobForm);
app.post("/job", auth, jobcontroller.addnewjob);
app.get("/job/update/:id", auth, jobcontroller.getupdateJobview);
app.post("/update-job", auth, jobcontroller.updateJob);
app.get("/alljob", jobcontroller.getalljobs);
app.get("/jobDetail/:id", jobcontroller.viewdetails);
app.post("/job/delete/:id", auth, jobcontroller.deletejob);
app.get("/applicants/:id", auth, usercontroller.getapplicant);
app.get("/errorpage", jobcontroller.errorPage);

// applicant route controller

app.post(
  "/submitApplication",
  uploadFile.single("resume"),

  applicantcontroller.addingApplicants
);
app.post("/search", applicantcontroller.searchJob);

export default app;
