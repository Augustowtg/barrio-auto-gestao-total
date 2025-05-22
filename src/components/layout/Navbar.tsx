
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ServiceForm from "@/components/services/ServiceForm";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleServiceAdded = () => {
    navigate("/services");
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
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              Novo Serviço
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Novo Serviço</DialogTitle>
            </DialogHeader>
            <ServiceForm onSuccess={handleServiceAdded} />
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  );
};

export default Navbar;
