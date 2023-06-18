import prisma from '../index';
import sinners from './sinners.json';

async function main() {
  const createSinners = await prisma.sinners.createMany({
    data: sinners,
    skipDuplicates: true
  })

  return createSinners;
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
