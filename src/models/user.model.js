export const recruiters = [
  {
    id: 1,
    name: "prateek",
    email: "1@gmail.com",
    password: "1",
  },
];

export class recruiterUser {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export const registerRecruiter = (recruiter) => {
  const { name, email, password } = recruiter;
  const newRecruiter = new recruiterUser(
    recruiters.length + 1,
    name,
    email,
    password
  );
  recruiters.push(newRecruiter);
};

export const authenticateRecruiter = (recruiter) => {
  const { email, password } = recruiter;
  const result = recruiters.find(
    (u) => u.email == email && u.password == password
  );

  return result;
};
