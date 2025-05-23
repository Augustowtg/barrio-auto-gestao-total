
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
  SidebarMenuItem 
} from "@/components/ui/sidebar";

const MainSidebar = () => {
  const menuItems = [
    { title: "Iniciar", icon: Play, url: "/quickstart" },
    { title: "Dashboard", icon: Database, url: "/" },
    { title: "Veículos", icon: Car, url: "/vehicles" },
    { title: "Estoque", icon: Package, url: "/inventory" },
    { title: "Serviços", icon: Wrench, url: "/services" },
    { title: "Ordem de Serviço", icon: ClipboardList, url: "/service-orders" },
    { title: "Financeiro", icon: DollarSign, url: "/finance" },
    { title: "Despesas", icon: Receipt, url: "/expenses" },
    { title: "Configurações", icon: Settings, url: "/settings" }
  ];

  const isActive = (path: string) => {
    return window.location.pathname === path;
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.url}
                      className={cn(
                        "flex items-center gap-3",
                        isActive(item.url) ? "text-white bg-sidebar-accent" : ""
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
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
