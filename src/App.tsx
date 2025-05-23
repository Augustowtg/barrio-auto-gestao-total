
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Vehicles from "./pages/Vehicles";
import VehicleDetails from "./pages/VehicleDetails";
import Inventory from "./pages/Inventory";
import Expenses from "./pages/Expenses";
import Services from "./pages/Services";
import ServiceOrders from "./pages/ServiceOrders";
import Finance from "./pages/Finance";
import QuickStart from "./pages/QuickStart";
import Settings from "./pages/Settings";
import Navbar from "./components/layout/Navbar";
import MainSidebar from "./components/layout/Sidebar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <MainSidebar />
            <div className="flex-1">
              <Navbar />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/quickstart" element={<QuickStart />} />
                <Route path="/vehicles" element={<Vehicles />} />
                <Route path="/vehicles/:id" element={<VehicleDetails />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/services" element={<Services />} />
                <Route path="/service-orders" element={<ServiceOrders />} />
                <Route path="/finance" element={<Finance />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
