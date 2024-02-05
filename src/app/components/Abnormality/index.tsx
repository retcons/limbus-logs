'use client';

import * as Dialog from '@radix-ui/react-dialog';
import abnormalityStyles from './abnormality.module.scss';
import dialogStyles from './dialog.module.scss';
import Log from '../Log';
import type {
  abnormalities as AbnormalitiesType,
  logs as LogsType,
  comments as CommentsType,
} from '@prisma/client';

// I am declaring the type (shape) of the Abnormality's data here
// This is to keep things looking cleaner and so it can be imported to /client.tsx
export type AbnormalityProps = AbnormalitiesType & {
  logs: (LogsType & {
    comments: CommentsType[];
  })[];
};

// This component represents a 'card' for an abnormality in the gallery
// It has a modal that contains the log information when clicked on
// The benefits of components is that they can be reused and are easier to maintain
// You only need to write the code once; you can use it as many times as you want with other data to avoid repetition
export default function Abnormality({
  abnormality,
}: {
  abnormality: AbnormalityProps
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <figure
          className={abnormalityStyles.abnormality}
          key={abnormality.name}
        >
          {abnormality.image && (
            <div className={abnormalityStyles['image-container']}>
              <img
                src={`https://raw.githubusercontent.com/retcons/limbus-logs/main/images/${abnormality.image}`}
                alt={abnormality.name}
              />
            </div>
          )}
          <figcaption className={abnormalityStyles.footer}>
            <div className={abnormalityStyles.details}>
              <div className={abnormalityStyles.wrapper}>
                <span className={abnormalityStyles.id}>{abnormality.id}</span>
                <img
                  className={abnormalityStyles.risk}
                  src={`https://raw.githubusercontent.com/retcons/limbus-logs/main/images/risk_level/${abnormality.risk}.png`}
                  alt={`${abnormality.name} has a risk level of ${abnormality.risk}`}
                />
              </div>
              <p className={abnormalityStyles.name}>{abnormality.name}</p>
            </div>
          </figcaption>
        </figure>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={dialogStyles.overlay}>
          <Dialog.Content className={dialogStyles.content}>
            <Dialog.Title className={dialogStyles.title}>
              {abnormality.name}
            </Dialog.Title>
            <Dialog.Description>
              {abnormality.desc && (
                <sup className={dialogStyles.description}>
                  {abnormality.desc}
                </sup>
              )}
              <Log logs={abnormality.logs} />
            </Dialog.Description>
            <Dialog.Close asChild>
              <button className={dialogStyles.close} aria-label='close modal'>
                Close
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
