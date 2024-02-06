import * as ToggleGroup from '@radix-ui/react-toggle-group';
import type { Dispatch, SetStateAction } from 'react';
import styles from './index.module.scss'

type Props = { selectedSinner: string; setSelectedSinner: Dispatch<SetStateAction<string>> }

export default function SinnerToggle({ selectedSinner, setSelectedSinner }: Props) {

  return (
    <ToggleGroup.Root
      className={styles['toggle-group']}
      type='single'
      defaultValue='all'
      value={selectedSinner}
      aria-label='Log writer'
      onValueChange={(value: string) => { value === '' ? setSelectedSinner('all') : setSelectedSinner(value) }}
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
      {/* <ToggleGroup.Item value={'dante'}>Dante</ToggleGroup.Item> */}
      <ToggleGroup.Item value={'sinclair'}>Sinclair</ToggleGroup.Item>
      <ToggleGroup.Item value={'outis'}>Outis</ToggleGroup.Item>
      <ToggleGroup.Item value={'gregor'}>Gregor</ToggleGroup.Item>
    </ToggleGroup.Root>

  )
}