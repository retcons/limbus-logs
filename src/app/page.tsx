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
        <sup>Managed by <a href="https://github.com/retcons">jordan</a>, please direct any corrections, concerns, etc. to me.
        last updated: refraction railway line 2 - september 14. NOTE: SOME COMMENTS ARE MISSING!! F-01-11-15 Level 2 as well as O-06-21-16 + O-04-21-22 are missing comments. i'll add them later i prommy okay?</sup>
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
