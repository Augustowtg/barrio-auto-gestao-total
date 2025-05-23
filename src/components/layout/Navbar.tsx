
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
    <nav className="border-b bg-white py-3 px-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h1 className="font-bold text-xl text-primary">Auto Mechanic Pro</h1>
      </div>
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Pesquisar..." 
          className="pl-10 w-full rounded-md border border-input py-2 text-sm" 
        />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">Ajuda</Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              Novo
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Nova Ordem de Serviço
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Nova Ordem de Serviço</DialogTitle>
                </DialogHeader>
                <ServiceForm onSuccess={handleServiceAdded} />
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Nova Conta a Receber
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Nova Conta a Receber</DialogTitle>
                </DialogHeader>
                <ReceivableForm onSuccess={handleReceivableAdded} />
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Nova Conta a Pagar
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Nova Conta a Pagar</DialogTitle>
                </DialogHeader>
                <PayableForm onSuccess={handlePayableAdded} />
              </DialogContent>
            </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
