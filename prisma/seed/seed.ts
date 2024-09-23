import { createSeedClient, type SeedClient } from "@snaplet/seed";
import { faker } from "@snaplet/copycat";
import bcryptjs from 'bcryptjs';
import { generateSlug } from "@/utils/generateSlug";
import { careersWithTags } from './careers';

const main = async () => {
  const seed: SeedClient = await createSeedClient();

  // Truncate all tables in the database
  await seed.$resetDatabase();

  // Seed Faculties
  const { faculty: faculties } = await seed.faculty((x) => x(5, () => ({
    name: faker.company.name(),
  })));

  // Seed Tags
  const allTags = Array.from(new Set(careersWithTags.reduce((acc, career) => acc.concat(career.tags), [] as string[])));
  const { tag: tags } = await seed.tag((x) => x(allTags.length, (t) => ({
    name: allTags[t.index],
  })));

  // Seed Careers
  const { career: careers } = await seed.career((x) => x(careersWithTags.length, (c) => {
    const careerData = careersWithTags[c.index];
    return {
      name: careerData.name,
      website: faker.internet.url(),
      study_plan_url: faker.internet.url(),
      location: faker.location.city(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      description: faker.lorem.paragraph(),
      facultyId: faker.helpers.arrayElement(faculties).id,
      slug: generateSlug(careerData.name)
    }
  }));

  // Asignar tags a carreras
  for (let i = 0; i < careers.length; i++) {
    const career = careers[i];
    const careerTags = careersWithTags[i].tags;
    for (const tagName of careerTags) {
      const tag = tags.find(t => t.name === tagName);
      if (tag) {
        await seed.careerTag((x) => x(1, () => ({
          careerId: career.id,
          tagId: tag.id,
        })));
      }
    }
  }

  // Seed Users
  const { user: users } = await seed.user((x) => x(20, (u) => ({
    email: faker.internet.email(),
    username: faker.internet.userName(),
    name: faker.internet.userName(),
    password: bcryptjs.hashSync('password', 10),
    role: faker.helpers.arrayElement(['ASPIRANT', 'STUDENT', 'ADMIN']),
    image: u.index % 2 === 0 ? null : "https://res.cloudinary.com/dxdme71no/image/upload/v1722901389/hufhpfqpgmwr4p5kj1ja.jpg",
  })));

  // Seed Posts
  const { post: posts } = await seed.post((x) => x(30, (t) => {
    const title = faker.lorem.sentence();
    return {
      title,
      content: faker.lorem.paragraphs(),
      slug: generateSlug(title),
      authorId: faker.helpers.arrayElement(users).id,
      careerId: faker.helpers.arrayElement(careers).id,
      createdAt: faker.date.past(),
    }
  }));

  // Seed Images
  const { image: images } = await seed.image(x => x(30, t => {
    return {
      url: "https://res.cloudinary.com/dxdme71no/image/upload/v1722901389/hufhpfqpgmwr4p5kj1ja.jpg",
      PostId: faker.helpers.arrayElement(posts).id,
    }
  }));

  // Seed Interests
  await seed.interest((x) => x(40, (i) => ({
    userId: faker.helpers.arrayElement(users).id,
    careerId: faker.helpers.arrayElement(careers).id,
  })));

  // Seed PostLikes
  await seed.postLike((x) => x(100, (tl) => ({
    userId: faker.helpers.arrayElement(users).id,
    PostId: faker.helpers.arrayElement(posts).id,
  })));

  console.log("Database seeded successfully!");

  process.exit();
};

main().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});