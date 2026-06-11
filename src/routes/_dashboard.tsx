import { Header } from '#/components/menu/header';
import Sidebar from '#/components/menu/sidebar';
import { Button } from '#/components/ui/button';
import { Kbd } from '#/components/ui/kbd';
import { Separator } from '#/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '#/components/ui/tooltip';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Box, LayoutDashboard } from 'lucide-react';

export const Route = createFileRoute('/_dashboard')({ component: DashboardLayout });

function DashboardLayout() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex-1 flex overflow-hidden">
        <aside className="relative z-0 h-full w-12 flex flex-col items-center justify-start gap-2 not-first:shrink-0 border-r bg-sidebar py-2">
          <TooltipProvider delay={0}>
                <Tooltip>
                    <TooltipTrigger render={<Button variant="ghost" size="icon-lg" className="rounded-md text-muted-foreground"/>}>
                        <LayoutDashboard className="size-5" />
                    </TooltipTrigger>
                    <TooltipContent side="right" align="center" className="rounded-sm bg-foreground text-background text-xs" sideOffset={10}>
                        Dashboard
                        <Separator orientation="vertical" className="bg-muted-foreground/50 mx-1" />
                        <div className="flex items-center gap-1.5 mr-1">
                            <Kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">G</Kbd>
                            <Kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">D</Kbd>
                        </div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </aside>
        <main className="max-w-7xl mx-auto px-5 sm:px-6 py-8 space-y-5 overflow-auto no-scrollbar flex-1 min-h-0 w-full flex flex-col">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
