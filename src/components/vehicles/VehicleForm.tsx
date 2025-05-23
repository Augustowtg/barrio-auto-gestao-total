
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface VehicleFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const VehicleForm = ({ open, onOpenChange, onSuccess }: VehicleFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    plate: "",
    make: "",
    model: "",
    year: "",
    owner: "",
    phone: "",
    email: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Veículo cadastrado com sucesso!",
      description: `${formData.make} ${formData.model} (${formData.plate}) foi adicionado.`
    });
    
    setFormData({
      plate: "",
      make: "",
      model: "",
      year: "",
      owner: "",
      phone: "",
      email: ""
    });
    
    onOpenChange(false);
    onSuccess?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Novo Veículo</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="plate">Placa</Label>
              <Input
                id="plate"
                value={formData.plate}
                onChange={(e) => setFormData({...formData, plate: e.target.value})}
                placeholder="ABC1234"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="year">Ano</Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: e.target.value})}
                min="1900"
                max={new Date().getFullYear()}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="make">Marca</Label>
              <Input
                id="make"
                value={formData.make}
                onChange={(e) => setFormData({...formData, make: e.target.value})}
                placeholder="Toyota"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="model">Modelo</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => setFormData({...formData, model: e.target.value})}
                placeholder="Corolla"
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="owner">Proprietário</Label>
            <Input
              id="owner"
              value={formData.owner}
              onChange={(e) => setFormData({...formData, owner: e.target.value})}
              placeholder="Nome do proprietário"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="(11) 99999-9999"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="cliente@email.com"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Cadastrar Veículo
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleForm;
