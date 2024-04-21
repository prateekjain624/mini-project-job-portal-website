import { applicants } from "./applicant.model.js";

export const alljobs = [
  {
    id: 1,
    jobcategory: "Tech",
    jobdesignation: "DevOps",
    joblocation: "abc",
    companyname: "abc",
    salary: "123",
    numberofopenings: "123",
    skillsrequired: ["React", "NodeJs", "Angular"],
    applying: "2024-04-30",
    jobposted: "2024-04-17T09:57:14.366Z",
    applicants: applicants,
  },
  {
    id: 2,
    jobcategory: "Tech",
    jobdesignation: "DevOps",
    joblocation: "indore",
    companyname: "coding ninja",
    salary: "123",
    numberofopenings: "123",
    skillsrequired: ["React", "NodeJs", "Angular"],
    applying: "2024-04-30",
    jobposted: "2024-04-17T09:57:14.366Z",
    applicants: applicants,
  },
  {
    id: 3,
    jobcategory: "Tech",
    jobdesignation: "DevOps",
    joblocation: "abc",
    companyname: "abc",
    salary: "123",
    numberofopenings: "123",
    skillsrequired: ["React", "NodeJs", "Angular"],
    applying: "2024-04-30",
    jobposted: "2024-04-17T09:57:14.366Z",
    applicants: applicants,
  },
];

export default class jobModel {
  constructor(
    id,
    jobcategory,
    jobdesignation,
    joblocation,
    companyname,
    salary,
    applying,
    skillsrequired,
    numberofopenings,
    recruiteremail
  ) {
    this.id = id;
    this.jobcategory = jobcategory;
    this.jobdesignation = jobdesignation;
    this.joblocation = joblocation;
    this.companyname = companyname;
    this.salary = salary;
    this.numberofopenings = numberofopenings;

    this.skillsrequired = skillsrequired;
    this.applying = applying;
    this.jobposted = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    this.email = recruiteremail;
    this.applicants = applicants;
  }
}

// add job function

export const addJobs = (jobdetails, recruiteremail) => {
  const {
    job_category,
    job_designation,
    job_location,
    company_name,
    salary,
    Numberofposition,
    skills_required,
    applyby,
  } = jobdetails;

  const newJob = new jobModel(
    alljobs.length + 1,
    job_category,
    job_designation,
    job_location,
    company_name,
    salary,
    applyby,
    skills_required,
    Numberofposition,
    recruiteremail
  );

  return alljobs.push(newJob);
};

// to show all job function

export const getAllJob = () => {
  return alljobs.length;
};

// to show each job function

export const jobById = (id) => {
  const findJob = alljobs.find((job) => job.id == id);

  return findJob;
};

// to up date the job function

export const updatejob = (jobdetails) => {
  const {
    id,
    job_category,
    job_designation,
    job_location,
    company_name,
    salary,
    Numberofposition,
    skills_required,
    applyby,
  } = jobdetails;
  const index = alljobs.findIndex((job) => job.id == id);

  if (index !== -1) {
    const updatedJob = {
      ...alljobs[index], // Copy the existing job object
      jobcategory: job_category,
      jobdesignation: job_designation,
      joblocation: job_location,
      companyname: company_name,
      salary: salary,
      numberofopenings: Numberofposition,
      skillsrequired: skills_required,
      applying: applyby,
    };

    alljobs[index] = updatedJob;
    console.log(updatedJob);

    return updatedJob;
  } else {
    return null;
  }
};

// to delete a job function

export const deleteJob = (id) => {
  const index = alljobs.findIndex((job) => job.id == id);
  alljobs.splice(index, 1);
};

export const searchResult = (name) => {
  const data = alljobs.filter((job) => {
    if (job.companyname == name) {
      return job;
    }
  });
  return data;
};

// Function to fetch paginated jobs
export const getJobsByPage = (pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = pageNumber * pageSize;

  // Slice the jobs array to return a subset based on pagination parameters
  return alljobs.slice(startIndex, endIndex);
};
