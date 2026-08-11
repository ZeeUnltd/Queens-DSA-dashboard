import type { CSSProperties, PropsWithChildren } from 'react'
import { Link } from '@tanstack/react-router'
import { LogOut, Menu } from 'lucide-react'
import brandLogo from '../../assets/Brand-Logo.svg'
import { DASHBOARD_COPY, DASHBOARD_NAVIGATION } from '../../constants/dashboard'
import { Icons } from '../../constants/icons'
import { useAuth } from '../../context/AuthContext'
import type { DashboardView } from '../../types/dashboard'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'

const navigationIcons = {
  summary: Icons.category,
  'accounts-opened': Icons.profile2User,
  'balance-movements': Icons.bank,
  'kpi-performance': Icons.statusUp,
} as const

type DashboardShellProps = PropsWithChildren<{
  activeView: DashboardView
}>

function DashboardShell({ activeView, children }: DashboardShellProps) {
  const { session, logout } = useAuth()
  const user = session?.userDetails
  const fullName = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim()
  const initials = `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase()
  const handleLogout = () => {
    logout()
    window.location.assign('/login')
  }

  return (
    <TooltipProvider>
      <SidebarProvider  style={{ '--sidebar-width': '13rem' } as CSSProperties}>
        <Sidebar className="border-r border-[#f2f2f2] bg-white" collapsible="offcanvas">
          <SidebarHeader className="px-8 pb-10 pt-6">
            <Link to="/dashboard" aria-label="QueensMonie dashboard">
              <img className="h-auto w-40.75" src={brandLogo} alt="QueensMonie" />
            </Link>
          </SidebarHeader>

          <SidebarContent className="px-3">
            <SidebarMenu className="gap-3">
              {DASHBOARD_NAVIGATION.filter((item) => user?.isRM || !['accounts-opened', 'balance-movements'].includes(item.id)).map((item) => {
                const Icon = navigationIcons[item.id]
                const isActive = item.id === activeView

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      render={<Link to={item.href} />}
                      isActive={isActive}
                      size="lg"
                      tooltip={item.label}
                      className={isActive ? 'bg-qm-brand text-white hover:bg-qm-brand hover:text-white data-active:!bg-qm-brand data-active:!text-white' : 'text-qm-ink hover:bg-[#fff4f4]'}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="gap-7 px-5 pb-6">
            <a className="flex items-center gap-2 text-sm font-medium text-qm-ink" href="#help-center">
              <Icons.group className="h-4.75 w-4.75" />
              {DASHBOARD_COPY.helpCenter}
            </a>
            <button className="flex items-center gap-2 text-sm font-medium text-qm-brand" type="button" onClick={handleLogout}>
              <LogOut className="h-4.75 w-4.75" />
              {DASHBOARD_COPY.logout}
            </button>
          </SidebarFooter>
        </Sidebar>

        <main className="min-w-0 flex-1 bg-white">
          <header className="flex h-[66px] items-center justify-between border-b border-[#f3f3f3] px-5 md:justify-end md:px-10">
            <SidebarTrigger className="md:hidden" aria-label="Open dashboard navigation">
              <Menu />
            </SidebarTrigger>
            <div className="flex items-center gap-5 text-xs">
              <button className="rounded-full text-qm-brand focus:outline-none focus-visible:ring-4 focus-visible:ring-qm-brand/20" type="button" aria-label="Notifications">
                <Icons.notification className="h-[18px] w-[18px]" />
              </button>
              <button className="flex items-center gap-2 font-medium text-qm-brand" type="button" onClick={handleLogout}>
                <Avatar className="h-8 w-8 border border-qm-border"><AvatarFallback className="bg-[#edf3f8] text-[10px] font-bold text-qm-brand">{initials}</AvatarFallback></Avatar>
                <span className="hidden text-left sm:block"><span className="block text-[10px] font-semibold text-qm-ink">{fullName}</span><span className="block text-[10px] text-qm-brand">Sign Out</span></span>
              </button>
            </div>
          </header>
          <div className="mx-auto w-full px-5 py-8 md:px-12 md:py-9">{children}</div>
        </main>
      </SidebarProvider>
    </TooltipProvider>
  )
}

export default DashboardShell
