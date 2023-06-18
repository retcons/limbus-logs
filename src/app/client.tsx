'use client';
import { useState } from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import Abnormality from './components/Abnormality';
import styles from './page.module.scss';
import type { abnormalities as AbnormalitiesType, logs as LogsType, comments as CommentsType } from '@prisma/client';

export default function HomeClient({
  abnormalities,
}: {
  abnormalities: (AbnormalitiesType & {
    logs: (LogsType & {
      comments: CommentsType[];
    })[];
  })[];
}) {
  // https://react.dev/reference/react/useState#examples-basic
  const [selectedSinner, setSelectedSinner] = useState('all');

  return (
    <>
      <nav className={styles.writer}>
        <span className={styles['writer-head']}>Log Writer</span>
        <ToggleGroup.Root
          className={styles['writer-toggle-group']}
          type='single'
          defaultValue='all'
          aria-label='Log writer'
          onValueChange={(value: string) => setSelectedSinner(value)}
        >
          <ToggleGroup.Item value={'all'} aria-label='All writers'>
            All
          </ToggleGroup.Item>
          <ToggleGroup.Item value={'yi_sang'} aria-label='Yi Sang'>
            Yi Sang
          </ToggleGroup.Item>
          <ToggleGroup.Item value={'faust'} aria-label='Faust'>
            Faust
          </ToggleGroup.Item>
          <ToggleGroup.Item value={'don_quixote'} aria-label='Don Quixote'>
            Don Quixote
          </ToggleGroup.Item>
          <ToggleGroup.Item value={'ryoshu'} aria-label='Ryōshū'>
            Ryōshū
          </ToggleGroup.Item>
          <ToggleGroup.Item value={'meursault'}>Meursault</ToggleGroup.Item>
          <ToggleGroup.Item value={'hong_lu'}>Hong Lu</ToggleGroup.Item>
          <ToggleGroup.Item value={'heathcliff'}>Heathcliff</ToggleGroup.Item>
          <ToggleGroup.Item value={'ishmael'}>Ishmael</ToggleGroup.Item>
          <ToggleGroup.Item value={'rodion'}>Rodion</ToggleGroup.Item>
          <ToggleGroup.Item value={'sinclair'}>Sinclair</ToggleGroup.Item>
          <ToggleGroup.Item value={'outis'}>Outis</ToggleGroup.Item>
        </ToggleGroup.Root>
      </nav>
      <main className={styles.gallery}>
        {abnormalities
          .filter((abnormality) =>
            selectedSinner === 'all'
              ? true
              : abnormality.logs[0].sinner_id === selectedSinner
          )
          .map((abnormality) => {
            return (
              <Abnormality abnormality={abnormality} key={abnormality.name} />
            );
          })}
      </main>
    </>
  );
}
