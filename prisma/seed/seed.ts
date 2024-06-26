import { createSeedClient } from "@snaplet/seed";
import { faker } from "@snaplet/copycat";

const main = async () => {
  const seed = await createSeedClient();

  // Truncate all tables in the database
  await seed.$resetDatabase();

  // Seed Faculties
  const { faculty: faculties } = await seed.faculty((x) => x(5, () => ({
    name: faker.company.name(),
  })));

  // Seed Careers
  const {career: careers} = await seed.career((x) => x(15, (c) => ({
    name: faker.person.jobTitle(),
    website: faker.internet.url(),
    study_plan_url: faker.internet.url(),
    location: faker.location.city(),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    description: faker.lorem.paragraph(),
    facultyId: faker.helpers.arrayElement(faculties).id,
  })));

  // Seed Users
  const {user: users} = await seed.user((x) => x(20, (u) => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: faker.helpers.arrayElement(['ASPIRANT', 'STUDENT', 'ADMIN']),
  })));

  // Seed Testimonies
  const {testimony: testimonies} = await seed.testimony((x) => x(30, (t) => ({
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(),
    userId: faker.helpers.arrayElement(users).id,
    careerId: faker.helpers.arrayElement(careers).id,
  })));

  // Seed Questions
  const {question: questions} = await seed.question((x) => x(25, (q) => ({
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(),
    userId: faker.helpers.arrayElement(users).id,
    careerId: faker.helpers.arrayElement(careers).id,
  })));

  // Seed Answers
  await seed.answer((x) => x(50, (a) => ({
    content: faker.lorem.paragraph(),
    userId: faker.helpers.arrayElement(users).id,
    questionId: faker.helpers.arrayElement(questions).id,
  })));

  // Seed Comments
  await seed.comment((x) => x(60, (c) => ({
    content: faker.lorem.paragraph(),
    userId: faker.helpers.arrayElement(users).id,
    testimonyId: faker.helpers.arrayElement(testimonies).id,
  })));

  // Seed Interests
  await seed.interest((x) => x(40, (i) => ({
    userId: faker.helpers.arrayElement(users).id,
    careerId: faker.helpers.arrayElement(careers).id,
  })));

  // Seed TestimonyLikes
  await seed.testimonyLike((x) => x(100, (tl) => ({
    userId: faker.helpers.arrayElement(users).id,
    testimonyId: faker.helpers.arrayElement(testimonies).id,
  })));

  // Seed QuestionLikes
  await seed.questionLike((x) => x(80, (ql) => ({
    userId: faker.helpers.arrayElement(users).id,
    questionId: faker.helpers.arrayElement(questions).id,
  })));

  console.log("Database seeded successfully!");

  process.exit();
};

main().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});