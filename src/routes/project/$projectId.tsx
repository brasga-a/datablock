import { Header } from '#/components/menu/header';
import Sidebar from '#/components/menu/sidebar';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/project/$projectId')({ component: ProjectLayout });

function ProjectLayout() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <aside className="w-xs border-r overflow-auto bg-sidebar">
          <div className="h-10 border-b flex items-center justify-start">
            <h2 className="text-xs text-muted-foreground px-4">
              NODES
            </h2>
          </div>
          {/* Add project-specific menu items here */}
        </aside>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
