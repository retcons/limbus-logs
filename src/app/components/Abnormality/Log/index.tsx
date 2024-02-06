import * as Tabs from '@radix-ui/react-tabs';
import { idToName } from '@/app/scripts/names';
import tabsStyles from './tabs.module.scss';
import logStyles from './log.module.scss';
import sinnerColours from '../../../styles/sinners.module.scss';
import type { logs as LogsTypes, comments as CommentsType } from '@prisma/client';


type Props = LogsTypes & {
  comments: CommentsType[];
}

// Log is for the observation logs of an abnormality
// which are displayed in the Abnormality component's modal
export default function Log({
  logs,
}: {
  logs: Props[];
}) {
  return (
    <Tabs.Root
      className={tabsStyles.root}
      defaultValue={`${logs[0].observation_level}`}
    >
      {/* This is where the Oberservation Level tabs are displayed 
        * 0 is No Data, 1 is Observation Level 1, etc.
      */}
      <Tabs.List className={tabsStyles.list} aria-label='Observation level'>
        {/* We loop over the array of logs to create the tabs themselves */}
        {logs?.map((entry) => (
          <Tabs.Trigger
            className={tabsStyles.trigger}
            value={`${entry.observation_level}`}
            key={entry.id}
          >
            {entry.observation_level === 0
              ? 'Lacking data'
              : `Observation Level ${entry.observation_level}`}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {/* We loop over the array of log text to create the tab's content */}
      {logs?.map((entry) => (
        <Tabs.Content
          className={tabsStyles.content}
          value={`${entry.observation_level}`}
          key={entry.id}
        >
          {/* This is where the log's text is displayed */}
          <article className={logStyles.text}>
            <p>{entry.text}</p>
          </article>
          {/* This is where other sinners' comments are displayed, if any */}
          {entry.comments.length !== 0 && (
            <aside className={logStyles.comments}>
              {/* If there are comments, then we map over the array of comments to put them in their respective <p></p> tags
                * They are colour coded based on the sinner_id from log.module.scss 
              */}
              {entry.comments?.map((comment) => (
                <p className={sinnerColours[comment.sinner_id]} key={comment.id}>
                  → {comment.text}
                </p>
              ))}
            </aside>
          )}
          <footer className={logStyles.footer}>
            Written by <strong>{idToName(entry.sinner_id)}</strong>
          </footer>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
