'use client';
import { useState } from 'react';
import SinnerToggle from './components/Filter/SinnerToggle';
import Abnormality, { type AbnormalityProps } from './components/Abnormality';
import styles from './page.module.scss';

export default function HomeClient({
  abnormalities,
}: {
  abnormalities: AbnormalityProps[];
}) {
  // https://react.dev/reference/react/useState#examples-basic
  // We are using React's useState to manage the state of the selected sinner
  // aka Check what Sinner is currently selected in the filter
  const [search, setSearch] = useState('');
  const [selectedSinner, setSelectedSinner] = useState('all');

  return (
    <>
      <nav className={styles.filter}>
        <section className={styles['filter-section']}>
          <label className={styles['filter-label']}>Abnormality</label>
          <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} className={styles['search']} />
        </section>
        <section className={styles['filter-section']}>
          <label className={styles['filter-label']}>Log Writer</label>
          <SinnerToggle selectedSinner={selectedSinner} setSelectedSinner={setSelectedSinner} />
        </section>
      </nav>
      <main className={styles.gallery}>
        {abnormalities
          /* Filter down the abnormality list to match the search query AND if a sinner wrote a log for it */
          .filter((abnormality) => {
            return abnormality.name.toLowerCase().includes(search.toLowerCase()) &&
              selectedSinner === 'all'
              ? true
              : abnormality.logs.some((log) => log.sinner_id === selectedSinner)
          }
          )
          /* Return the abnormalities that meet this criteria with the Abnormality component */
          .map((abnormality) => {
            return (
              <Abnormality abnormality={abnormality} key={abnormality.name} />
            );
          })}
      </main>
    </>
  );
}
