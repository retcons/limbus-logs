'use client';

import * as Dialog from '@radix-ui/react-dialog';
import abnormalityStyles from './abnormality.module.scss';
import dialogStyles from './dialog.module.scss';
import Log from '../Log';
import type { abnormality, comment, log } from '@prisma/client';

export default function Abnormality({
  abnormality,
}: {
  abnormality: abnormality & {
    log: (log & {
      comments: comment[];
    })[];
  };
}) {


  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <figure className={abnormalityStyles.abnormality} key={abnormality.id}>
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
                  src={`https://raw.githubusercontent.com/retcons/limbus-logs/main/images/risk%20level/${abnormality.risk}.png`}
                  alt={`Risk level of ${abnormality.risk}`}
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
              <Log logs={abnormality.log} />
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
