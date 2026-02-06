import { Outlet } from 'react-router-dom'
import { AppSidebar } from '@/components/app-sidebar.jsx'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar.jsx'

export function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Layout