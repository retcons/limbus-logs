import prisma from '@/prisma';
import styles from './page.module.scss';
import HomeClient from './client';

export const revalidate = 60 // revalidate this page every 60 seconds

export default async function Home() {
  // Fetch all abnormalities, then its logs, then the logs' comments
  const abnormalities = await prisma.abnormalities.findMany({
    include: {
      logs: {
        orderBy: {
          observation_level: 'asc',
        },
        include: {
          comments: {
            orderBy: {
              order: 'asc',
            },
          },
        },
      },
    },
  });

  return (
    <>
      <header className={styles.intro}>
        <h1>Limbus Company Observation Log Library</h1>
        <span>
          <strong>SPOILERS AHEAD, PROCEED WITH CAUTION!</strong>
        </span>
        <span>
          Collection of observation logs in Limbus Company. Some may be combined
          due to identical entries, but not all. Additional comments from other
          sinners will be color-coded accordingly.
        </span>
        <sup>last updated: canto iv part iii - june 22 2023</sup>
      </header>
      {/*
       * Because of React adding server components
       * We split files into client and server components
       * The short of it is that where we fetch data is separated from where we interact with data
       * (i.e. Buttons, inputs, etc.)
       */}
      <HomeClient abnormalities={abnormalities} />
    </>
  );
}
