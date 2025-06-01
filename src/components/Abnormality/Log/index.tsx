import * as Tabs from '@radix-ui/react-tabs';
import { idToName } from '@/app/scripts/names';
import tabsStyles from './tabs.module.scss';
import logStyles from './log.module.scss';
import sinnerColours from '../../../app/styles/sinners.module.scss';
import type {
  logs as LogsTypes,
  comments as CommentsType,
} from '@prisma/client';

type Props = LogsTypes & {
  comments: CommentsType[];
};

// Log is for the observation logs of an abnormality
// which are displayed in the Abnormality component's modal
export default function Log({ logs }: { logs: Props[] }) {
  return (
    <Tabs.Root
      className={tabsStyles.root}
      defaultValue={`${logs[0]?.observationLevel ?? 0}`}
    >
      {/* This is where the Oberservation Level tabs are displayed
       * 0 is No Data, 1 is Observation Level 1, etc.
       */}
      <Tabs.List className={tabsStyles.list} aria-label='Observation level'>
        {logs.map((entry) => (
          <Tabs.Trigger
            className={tabsStyles.trigger}
            value={`${entry.observationLevel}`}
            key={entry.id}
          >
            {entry.observationLevel === 0
              ? 'Lacking data'
              : `Observation Level ${entry.observationLevel}`}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {logs.map((entry) => (
        <Tabs.Content
          className={tabsStyles.content}
          value={`${entry.observationLevel}`}
          key={entry.id}
        >
          <article>
            <p className={logStyles.text}>{entry.text}</p>
            {/* This is where the sinners' comments are displayed if any */}
            {entry.comments.length !== 0 && (
              <div className={logStyles.comments}>
                {entry.comments.map((comment) => (
                  <p className={comment.sinnerId} key={comment.id}>
                    → {comment.text} [{idToName(comment.sinnerId)}]
                  </p>
                ))}
              </div>
            )}
          </article>
          <footer className={logStyles.footer}>
            Written by <strong>{idToName(entry.sinnerId)}</strong>
          </footer>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
