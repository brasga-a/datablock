import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/project/$projectId/history')({ component: History });

function History() {
  return <div />;
}
