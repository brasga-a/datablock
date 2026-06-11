import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/project/$projectId/profile')({ component: Profile });

function Profile() {
  return <div />;
}
