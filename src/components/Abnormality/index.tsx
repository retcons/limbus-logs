'use client';

import * as Dialog from '@radix-ui/react-dialog';
import abnormalityStyles from './abnormality.module.scss';
import dialogStyles from './dialog.module.scss';
import Log from './Log';
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
  abnormality: AbnormalityProps;
}) {
  if (!abnormality) {
    return (
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <figure className={abnormalityStyles.abnormality}>
            <figcaption className={abnormalityStyles.footer}>
              <div className={abnormalityStyles.details}>
                <div className={abnormalityStyles.wrapper}>
                  <h3 className={abnormalityStyles['class-code']}>UNKNOWN</h3>
                  <img
                    className={abnormalityStyles.riskLevel}
                    src={`https://raw.githubusercontent.com/retcons/limbus-logs/main/images/risk_level/UNKNOWN.png`}
                    alt={`UNKNOWN has a risk level of UNKNOWN`}
                  />
                </div>
                <p className={abnormalityStyles.name}>UNKNOWN</p>
              </div>
            </figcaption>
          </figure>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={dialogStyles.overlay}>
            <Dialog.Content className={dialogStyles.content}>
              <Dialog.Title className={dialogStyles.title}>
                UNKNOWN
              </Dialog.Title>
              <Dialog.Description asChild>
                Abnormality not found
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
                onError={(e) => {
                  e.currentTarget.src =
                    'https://raw.githubusercontent.com/retcons/limbus-logs/main/images/placeholder.png';
                }}
              />
            </div>
          )}
          <figcaption className={abnormalityStyles.footer}>
              <div className={abnormalityStyles.wrapper}>
                <h3 className={abnormalityStyles['class-code']}>
                  {abnormality.classCode}
                </h3>
                <img
                  className={abnormalityStyles['risk-level']}
                  src={`https://raw.githubusercontent.com/retcons/limbus-logs/main/images/risk_level/${abnormality.riskLevel}.png`}
                  alt={`Risk level of ${abnormality.riskLevel}`}
                />
              </div>
              <p className={abnormalityStyles.name}>{abnormality.name}</p>
          </figcaption>
        </figure>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={dialogStyles.overlay}>
          <Dialog.Content
            className={dialogStyles.content}
            aria-describedby={`${abnormality.name}-info`}
          >
            <Dialog.Title className={dialogStyles.title}>
              {abnormality.name}
            </Dialog.Title>
            {abnormality.desc && (
              <sup className={dialogStyles.description}>{abnormality.desc}</sup>
            )}
            <Dialog.Description asChild>
              {abnormality.logs.length > 0 ? (
                <Log logs={abnormality.logs} />
              ) : (
                <span>No logs found</span>
              )}
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
