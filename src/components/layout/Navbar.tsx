
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ServiceForm from "@/components/services/ServiceForm";
import { useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import PayableForm from "@/components/finance/PayableForm";
import ReceivableForm from "@/components/finance/ReceivableForm";

const Navbar = () => {
  const navigate = useNavigate();

  const handleServiceAdded = () => {
    navigate("/service-orders");
  };

  const handleReceivableAdded = () => {
    navigate("/finance");
  };

  const handlePayableAdded = () => {
    navigate("/finance");
  };

  return (
    <nav className="h-14 border-b border-border/40 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="h-full flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <h1 className="font-semibold text-lg text-foreground ml-4">Auto Mechanic Pro</h1>
        </div>
        
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Pesquisar..." 
              className="w-full h-9 pl-10 pr-4 bg-background/60 border border-border/40 rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all duration-200" 
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 px-3 rounded-lg bg-background/60 border border-border/40 hover:bg-background/80 transition-all duration-200"
          >
            Ajuda
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                size="sm"
                className="h-8 px-3 rounded-lg bg-primary/90 hover:bg-primary text-primary-foreground shadow-sm transition-all duration-200"
              >
                <Plus className="h-4 w-4 mr-1" />
                Novo
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-56 bg-background/95 backdrop-blur-xl border border-border/40 shadow-xl rounded-xl p-2"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem 
                    onSelect={(e) => e.preventDefault()}
                    className="rounded-lg px-3 py-2 cursor-pointer hover:bg-accent/60 transition-colors"
                  >
                    Nova Ordem de Serviço
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] rounded-xl border border-border/40 bg-background/95 backdrop-blur-xl">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">Nova Ordem de Serviço</DialogTitle>
                  </DialogHeader>
                  <ServiceForm onSuccess={handleServiceAdded} />
                </DialogContent>
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem 
                    onSelect={(e) => e.preventDefault()}
                    className="rounded-lg px-3 py-2 cursor-pointer hover:bg-accent/60 transition-colors"
                  >
                    Nova Conta a Receber
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] rounded-xl border border-border/40 bg-background/95 backdrop-blur-xl">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">Nova Conta a Receber</DialogTitle>
                  </DialogHeader>
                  <ReceivableForm onSuccess={handleReceivableAdded} />
                </DialogContent>
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem 
                    onSelect={(e) => e.preventDefault()}
                    className="rounded-lg px-3 py-2 cursor-pointer hover:bg-accent/60 transition-colors"
                  >
                    Nova Conta a Pagar
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] rounded-xl border border-border/40 bg-background/95 backdrop-blur-xl">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">Nova Conta a Pagar</DialogTitle>
                  </DialogHeader>
                  <PayableForm onSuccess={handlePayableAdded} />
                </DialogContent>
              </Dialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
