export const applicants = [
  {
    id: 1,
    name: "prateek",
    email: "prateek@gmail.com",
    contact: "12345678",
    resumePath: "resumes/1713437965920-Lecture 7 Notes-3323.pdf",
  },
];

export class applicantModel {
  constructor(id, name, email, contact, resumePath) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.contact = contact;
    this.resumePath = resumePath;
  }
}

export const addingApplicant = (name, email, contact, resumePath) => {
  const newApplicant = new applicantModel(
    applicants.length + 1,
    name,
    email,
    contact,
    resumePath
  );
  applicants.push(newApplicant);
  console.log(applicants);
};

export const getAllApplicant = () => {
  return applicants;
};
