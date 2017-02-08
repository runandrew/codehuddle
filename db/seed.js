const db = require('APP/db');
const faker = require('faker');

const organizations = Array(...Array(25)).map(e => ({
  name: faker.company.companyName()
}));

const bigOs = ['O(1)', 'O(logN)', 'O(N * logN)', 'O(N)', 'O(N^2)', 'O(N!)'];

const rand = (min, max) => {
  if (!max) {
    max = min;
    min = 0;
  }
  min = min || 0;
  return Math.round(Math.random() * (max - min)) + min;
};

const uniqueRand = max => {
  const uniqueArr = Array(...Array(max)).map((_, i) => i + 1);
  return () => {
    if (max === 0) return null;
    const num = rand(max - 1);
    const uniqueVal = uniqueArr[num];
    uniqueArr[num] = uniqueArr[max - 1];
    max--;
    return uniqueVal;
  };
};

const seedOrganizations = () => db.Promise.map(organizations, organization => db.model('organizations').create(organization));

const seedAdminUsers = () => db.Promise.map(Array(...Array(10)).map(_ => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: '1234',
  isAdmin: true
})), user => db.model('users').create(user));

const seedUsers = () => db.Promise.map(Array(...Array(50)).map(_ => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: '1234',
  organization_name: organizations[rand(organizations.length - 1)].name
})), user => db.model('users').create(user));

const seedProblems = () => db.Promise.map(Array(...Array(200)).map(_ => ({
  name: faker.lorem.words(),
  description: faker.lorem.sentence(),
  difficulty: ['easy', 'medium', 'hard'][rand(2)],
  organization_name: organizations[rand(organizations.length - 1)].name,
  author_id: rand(11, 60)
})), problem => db.model('problems').create(problem));

const seedSolutions = () => db.Promise.map(Array(...Array(400)).map(_ => ({
  code: faker.lorem.paragraph(),
  bigO: bigOs[rand(bigOs.length - 1)],
  problem_id: rand(1, 200)
})), solution => db.model('solutions').create(solution));

const seedInterviews = () => db.Promise.map(Array(...Array(50)).map(_ => ({
  candidateName: faker.name.findName(),
  interviewer_id: rand(11, 60),
  date: faker.date.future(),
  position: faker.name.jobType(),
  status: ['planned', 'done'][rand(1)],
  candidateOverallRating: rand(5),
  comments: faker.lorem.sentence()
})), interview => db.model('interviews').create(interview));

const randNumGenerator = uniqueRand(200);

const seedInterviewProblems = () => db.Promise.map(Array(...Array(200)).map((_, i) => ({
  problem_id: randNumGenerator(),
  interview_id: rand(1, 50)
})), problem => db.model('interviewProblems').create(problem));

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedOrganizations)
  .then(organizations => console.log(`Seeded ${organizations.length} organizations OK`))
  .then(seedAdminUsers)
  .then(users => console.log(`Seeded ${users.length} admins OK`))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .then(seedProblems)
  .then(problems => console.log(`Seeded ${problems.length} problems OK`))
  .then(seedSolutions)
  .then(solutions => console.log(`Seeded ${solutions.length} solutions OK`))
  .then(seedInterviews)
  .then(interviews => console.log(`Seeded ${interviews.length} interviews OK`))
  .then(seedInterviewProblems)
  .then(interviewProblems => console.log(`Seeded ${interviewProblems.length} interviewProblems OK`))
  .catch(error => console.error(error))    
  .finally(() => db.close());
