
import { Car, DollarSign, Package, Users, Wrench, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ServiceForm from "@/components/services/ServiceForm";

const QuickStart = () => {
  const navigate = useNavigate();
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <h1 className="text-3xl font-bold mb-6">Iniciar</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Acesse rapidamente as principais funcionalidades do sistema
      </p>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Button 
          className="h-24 text-lg" 
          variant="outline"
          onClick={() => handleNavigation('/vehicles')}
        >
          <Car className="mr-2 h-6 w-6" />
          Gerenciar Veículos
        </Button>
        
        <Button 
          className="h-24 text-lg" 
          variant="outline"
          onClick={() => handleNavigation('/inventory')}
        >
          <Package className="mr-2 h-6 w-6" />
          Gerenciar Estoque
        </Button>
        
        <Button 
          className="h-24 text-lg" 
          variant="outline"
          onClick={() => handleNavigation('/service-orders')}
        >
          <Wrench className="mr-2 h-6 w-6" />
          Ordens de Serviço
        </Button>
        
        <Button 
          className="h-24 text-lg" 
          variant="outline"
          onClick={() => handleNavigation('/finance')}
        >
          <DollarSign className="mr-2 h-6 w-6" />
          Gestão Financeira
        </Button>
      </div>
      
      <div className="flex justify-center mb-8">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="h-16 px-8 text-lg" size="lg">
              <Plus className="mr-2 h-6 w-6" />
              Nova Ordem de Serviço
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Nova Ordem de Serviço</DialogTitle>
            </DialogHeader>
            <ServiceForm onSuccess={() => handleNavigation('/service-orders')} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default QuickStart;
