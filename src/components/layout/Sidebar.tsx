
import { Link } from "react-router-dom";
import { 
  Settings, 
  Package, 
  Car, 
  DollarSign, 
  Database, 
  Wrench,
  Receipt,
  Play,
  ClipboardList
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarHeader
} from "@/components/ui/sidebar";

const MainSidebar = () => {
  const menuItems = [
    { title: "Iniciar", icon: Play, url: "/", color: "text-green-600" },
    { title: "Dashboard", icon: Database, url: "/dashboard", color: "text-blue-600" },
    { title: "Veículos", icon: Car, url: "/vehicles", color: "text-purple-600" },
    { title: "Estoque", icon: Package, url: "/inventory", color: "text-orange-600" },
    { title: "Serviços", icon: Wrench, url: "/services", color: "text-gray-600" },
    { title: "Ordem de Serviço", icon: ClipboardList, url: "/service-orders", color: "text-indigo-600" },
    { title: "Financeiro", icon: DollarSign, url: "/finance", color: "text-emerald-600" },
    { title: "Despesas", icon: Receipt, url: "/expenses", color: "text-red-600" },
    { title: "Configurações", icon: Settings, url: "/settings", color: "text-gray-500" }
  ];

  const isActive = (path: string) => {
    return window.location.pathname === path;
  }

  return (
    <Sidebar className="border-r border-border/40 bg-sidebar/60 backdrop-blur-xl">
      <SidebarHeader className="border-b border-border/40 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <Wrench className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-sidebar-foreground">Auto Mechanic</h2>
            <p className="text-xs text-muted-foreground">Pro</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-3 py-2">
            Menu Principal
          </SidebarGroupLabel>
          <SidebarGroupContent className="space-y-1">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={cn(
                      "w-full rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      "hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                      "group-data-[collapsible=icon]:justify-center",
                      isActive(item.url) && "bg-primary/10 text-primary hover:bg-primary/15"
                    )}
                  >
                    <Link 
                      to={item.url}
                      className="flex items-center gap-3 w-full"
                    >
                      <item.icon className={cn("h-4 w-4 flex-shrink-0", item.color)} />
                      <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default MainSidebar;
