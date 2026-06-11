import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/project/$projectId/schema')({ component: SchemaEditor });

function SchemaEditor() {
  return <div />;
}
