import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/project/$projectId/data')({ component: DataViewer });

function DataViewer() {
  return <div />;
}
