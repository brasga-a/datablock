import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { projects, type Project, type ProjectStatus } from '#/components/mockup/projects'
import { createFileRoute } from '@tanstack/react-router'
import { Activity, ArrowRight, ArrowUpFromLine, ChevronRight, Clock, Code2, Database, FileInput, FilePlusCorner, Leaf, Pen, Plus, Server, SquarePen, Star, UsersRound } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/dashboard')({
  component: RouteComponent,
})

function getLastActivityAt(project: Project): Date {
  const opened = new Date(project.lastOpenedAt).getTime()
  const edited = project.lastEditedAt ? new Date(project.lastEditedAt).getTime() : 0
  return new Date(Math.max(opened, edited))
}

function getProjectActivityLabel(project: Project) {
  const opened = new Date(project.lastOpenedAt).getTime()
  const edited = project.lastEditedAt ? new Date(project.lastEditedAt).getTime() : 0
  const activityType = edited > opened ? 'Edited' : 'Opened'
  const diffMs = Math.max(Date.now() - Math.max(opened, edited), 0)
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour

  let value: number
  let unit: string

  if (diffMs < hour) {
    value = Math.max(1, Math.round(diffMs / minute))
    unit = value === 1 ? 'minute' : 'minutes'
  } else if (diffMs < day) {
    value = Math.round(diffMs / hour)
    unit = value === 1 ? 'hour' : 'hours'
  } else if (diffMs < 30 * day) {
    value = Math.round(diffMs / day)
    unit = value === 1 ? 'day' : 'days'
  } else {
    value = Math.round(diffMs / (30 * day))
    unit = value === 1 ? 'month' : 'months'
  }

  return `${activityType} ${value} ${unit} ago`
}

const PROJECT_COLORS = [
  { bg: 'bg-purple-500/15', icon: 'text-purple-400' },
  { bg: 'bg-amber-500/15', icon: 'text-amber-400' },
  { bg: 'bg-emerald-500/15', icon: 'text-emerald-400' },
  { bg: 'bg-cyan-500/15', icon: 'text-cyan-400' },
  { bg: 'bg-rose-500/15', icon: 'text-rose-400' },
]

function DbIcon({ target }: { target: Project['target'] }) {
  if (target.startsWith('PostgreSQL')) return <Database className="size-3 text-blue-400" />
  if (target.startsWith('MySQL')) return <Database className="size-3 text-orange-400" />
  if (target.startsWith('SQL Server')) return <Server className="size-3 text-indigo-400" />
  return <Leaf className="size-3 text-green-400" />
}

function statusClass(status: ProjectStatus) {
  switch (status) {
    case 'Active': return 'bg-green-500/15 text-green-500 border-green-500/20'
    case 'Draft': return 'bg-amber-500/15 text-amber-500 border-amber-500/20'
    case 'Archived': return 'bg-muted text-muted-foreground border-border'
  }
}

const recentProjects = projects
  .slice()
  .sort((a, b) => getLastActivityAt(b).getTime() - getLastActivityAt(a).getTime())
  .slice(0, 5)

function RouteComponent() {
  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm font-semibold">Recent Projects</CardTitle>
              <button className="flex items-center gap-0.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                View all <ChevronRight className="size-3.5" />
              </button>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              {/* <Carousel className="w-full px-10">
                <CarouselContent className="-ml-3">
                  {recentProjects.map((project, i) => {
                    const color = PROJECT_COLORS[i % PROJECT_COLORS.length]
                    return (
                      <CarouselItem key={project.id} className="pl-3 basis-auto">
                        <div className="w-48 rounded-md border cursor-pointer hover:bg-muted/50 transition-colors overflow-hidden">
                          <div className="p-3 flex flex-col gap-2.5">
                            <div className="flex items-start gap-2.5">
                              <div className={`size-9 rounded-md shrink-0 flex items-center justify-center ${color.bg}`}>
                                <Database className={`size-4.5 ${color.icon}`} />
                              </div>
                              <div className="flex-1 min-w-0 pt-0.5">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-xs font-medium truncate">{project.slug}</span>
                                  <Star className={`size-3.5 shrink-0 ${project.starred ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/50'}`} />
                                </div>
                                <div className="flex items-center gap-1 mt-0.5">
                                  <DbIcon target={project.target} />
                                  <span className="text-[10px] text-muted-foreground">{project.target}</span>
                                </div>
                              </div>
                            </div>
                            <Badge variant="outline" className={`w-fit text-[10px] px-1.5 h-4 ${statusClass(project.status)}`}>
                              {project.status}
                            </Badge>
                          </div>
                          <div className="bg-muted/40 border-t px-3 py-1.5 flex items-center gap-1.5">
                            <Clock className="size-3 text-muted-foreground" />
                            <span className="text-[10px] text-muted-foreground">{getProjectActivityLabel(project)}</span>
                          </div>
                        </div>
                      </CarouselItem>
                    )
                  })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel> */}
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-4">
          <QuickStart/>
          <RecentActivity/>
        </div>
      </div>
    </div>
  )

  function RecentActivity() {
    return <Card className="h-[270px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-3 px-2 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
          <Activity className="text-blue-500 size-5.5" />
          RECENT ACTIVITY
        </CardTitle>
        <Button variant="ghost" className="text-xs text-muted-foreground hover:text-foreground transition-colors h-auto! py-1">
          View all <ArrowRight className="size-3.5" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="w-full h-12.5 justify-between py-6 px-2 flex items-center gap-3">
          <div className="flex items-center gap-3">
            <FilePlusCorner className="size-5.5 text-muted-foreground" />
            <div className="flex flex-col items-start">
              <span className="">agile-nebula-8291</span>
              <span className="text-xs text-muted-foreground">
                Project created
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-0">
            <span className="text-xs text-muted-foreground">2 hours ago</span>
            <span className="text-xs text-muted-foreground">by you</span>
          </div>
        </div>
        <div className="w-full h-12.5 justify-between py-6 px-2 flex items-center gap-3">
          <div className="flex items-center gap-3">
            <Pen className="size-5.5 text-muted-foreground" />
            <div className="flex flex-col items-start">
              <span className="">silent-forge-404</span>
              <span className="text-xs text-muted-foreground">
                Schema updated
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-0">
            <span className="text-xs text-muted-foreground">1 day ago</span>
            <span className="text-xs text-muted-foreground">by you</span>
          </div>
        </div>
        <div className="w-full h-12.5 justify-between py-6 px-2 flex items-center gap-3">
          <div className="flex items-center gap-3">
            <Database className="size-5.5 text-muted-foreground" />
            <div className="flex flex-col items-start">
              <span className="">vivid-horizon-77</span>
              <span className="text-xs text-muted-foreground">
                Snapshot created
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-0">
            <span className="text-xs text-muted-foreground">3 days ago</span>
            <span className="text-xs text-muted-foreground">by you</span>
          </div>
        </div>
        <div className="w-full h-12.5 justify-between py-6 px-2 flex items-center gap-3">
          <div className="flex items-center gap-3">
            <UsersRound className="size-5.5 text-muted-foreground" />
            <div className="flex flex-col items-start">
              <span className="">You invited alex@acme.com</span>
              <span className="text-xs text-muted-foreground">
                To project bold-vertex-11
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-0">
            <span className="text-xs text-muted-foreground">1 week ago</span>
          </div>
        </div>
      </CardContent>
    </Card>
  }

  function QuickStart() {
    return <Card className="h-[270px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-3 px-2 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground h-6.5">
          <Code2 className="text-blue-500 size-5.5" />
          QUICK START
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="ghost" className="w-full h-12.5 justify-between py-6 px-2">
          <div className="flex items-center gap-3">
            <FilePlusCorner className="size-5.5 text-muted-foreground" />
            <div className="flex flex-col items-start">
              <span className="font-medium">Create project</span>
              <span className="text-xs text-muted-foreground">
                Start from an empty schema
              </span>
            </div>
          </div>
          <ChevronRight className="size-4.5" />
        </Button>
        <Button variant="ghost" className="w-full h-12.5 justify-between py-6 px-2">
          <div className="flex items-center gap-3">
            <FileInput className="size-5.5 text-muted-foreground" />
            <div className="flex flex-col items-start">
              <span className="font-medium">Import database</span>
              <span className="text-xs text-muted-foreground">
                Reverse engineer an existing database
              </span>
            </div>
          </div>
          <ChevronRight className="size-4.5" />
        </Button>
        <Button variant="ghost" className="w-full h-12.5 justify-between py-6 px-2">
          <div className="flex items-center gap-3">
            <SquarePen className="size-5.5 text-muted-foreground" />
            <div className="flex flex-col items-start">
              <span className="font-medium">Sketch schema</span>
              <span className="text-xs text-muted-foreground">
                Draft tables and relationships visually
              </span>
            </div>
          </div>
          <ChevronRight className="size-4.5" />
        </Button>
        <Button variant="ghost" className="w-full h-12.5 justify-between py-6 px-2">
          <div className="flex items-center gap-3">
            <ArrowUpFromLine className="size-5.5 text-muted-foreground" />
            <div className="flex flex-col items-start">
              <span className="font-medium">Export schema</span>
              <span className="text-xs text-muted-foreground">
                Export as SQL, JSON, or migration file
              </span>
            </div>
          </div>
          <ChevronRight className="size-4.5" />
        </Button>
      </CardContent>
    </Card>
  }
}
