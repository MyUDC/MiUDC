import { createSeedClient, type SeedClient } from "@snaplet/seed";
import { faker } from "@snaplet/copycat";
import bcryptjs from 'bcryptjs';
import { generateSlug } from "@/utils/generateSlug";

const main = async () => {
  const seed: SeedClient = await createSeedClient();

  // Truncate all tables in the database
  await seed.$resetDatabase();

  // Seed Faculties
  const { faculty: faculties } = await seed.faculty((x) => x(5, () => ({
    name: faker.company.name(),
  })));

  // Seed Careers
  const { career: careers } = await seed.career((x) => x(15, (c) => {
    const name = faker.person.jobTitle();

    return {
      name,
      website: faker.internet.url(),
      study_plan_url: faker.internet.url(),
      location: faker.location.city(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      description: faker.lorem.paragraph(),
      facultyId: faker.helpers.arrayElement(faculties).id,
      slug: generateSlug(name)
    }
  }));

  // Seed Users
  const { user: users } = await seed.user((x) => x(20, (u) => ({
    email: faker.internet.email(),
    name: faker.internet.userName(),
    password: bcryptjs.hashSync('password', 10),
    role: faker.helpers.arrayElement(['ASPIRANT', 'STUDENT', 'ADMIN']),
    image: u.index % 2 === 0 ? null : "https://res.cloudinary.com/dxdme71no/image/upload/v1722901389/hufhpfqpgmwr4p5kj1ja.jpg",
  })));

  // Seed Testimonies
  const { testimony: testimonies } = await seed.testimony((x) => x(30, (t) => {
    const title = faker.lorem.sentence();
    return {
      title,
      content: faker.lorem.paragraphs(),
      slug: generateSlug(title),
      userId: faker.helpers.arrayElement(users).id,
      careerId: faker.helpers.arrayElement(careers).id,
      createdAt: faker.date.past(),
    }
  }));

  // Seed Questions
  const { question: questions } = await seed.question((x) => x(25, (q) => ({
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
    createdAt: faker.date.past(),
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