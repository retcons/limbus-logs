import * as Tabs from '@radix-ui/react-tabs';
import tabsStyles from './tabs.module.scss';
import logStyles from './log.module.scss';
import type { comment, log } from '@prisma/client';

export default function Log({
  logs,
}: {
  logs: (log & {
    comments: comment[];
  })[];
}) {
  return (
    <Tabs.Root className={tabsStyles.root} defaultValue='0'>
      <Tabs.List className={tabsStyles.list} aria-label='Manage your account'>
        {logs.map((log) => (
          <Tabs.Trigger
            className={tabsStyles.trigger}
            value={`${log.observation_level}`}
            key={log.id}
          >
            {log.observation_level === 0
              ? 'Lacking data'
              : `Observation Level ${log.observation_level}`}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {logs.map((log) => (
        <Tabs.Content
          className={tabsStyles.content}
          value={`${log.observation_level}`}
          key={log.id}
        >
          <p className={logStyles.text}>{log.text}</p>
          {log.comments && (
            <aside className={logStyles.comments}>
              {log.comments.map((comment) => (
                <p className={logStyles[comment.sinner_id]} key={comment.id}>
                  → {comment.text}
                </p>
              ))}
            </aside>
          )}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
