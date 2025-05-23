
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

const vehicleFormSchema = z.object({
  plate: z.string().length(7, { message: "A placa deve ter 7 caracteres" }),
  make: z.string().min(1, { message: "A marca é obrigatória" }),
  model: z.string().min(1, { message: "O modelo é obrigatório" }),
  year: z.string().min(4, { message: "O ano deve ter 4 dígitos" }),
  owner: z.string().min(3, { message: "O nome do proprietário é obrigatório" }),
});

interface Vehicle {
  id: number;
  plate: string;
  make: string;
  model: string;
  year: number;
  owner: string;
  lastService: string;
}

interface VehicleSelectorProps {
  vehicles: Vehicle[];
  selectedVehicleId: string;
  onVehicleChange: (vehicleId: string) => void;
  onVehicleAdded: (vehicle: Vehicle) => void;
}

const VehicleSelector = ({ vehicles, selectedVehicleId, onVehicleChange, onVehicleAdded }: VehicleSelectorProps) => {
  const [isNewVehicleDialogOpen, setIsNewVehicleDialogOpen] = useState(false);
  
  const vehicleForm = useForm<z.infer<typeof vehicleFormSchema>>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
      plate: "",
      make: "",
      model: "",
      year: "",
      owner: "",
    },
  });

  const getSelectedVehicle = (id: string) => {
    return vehicles.find(vehicle => vehicle.id.toString() === id);
  };

  const onSubmitNewVehicle = (values: z.infer<typeof vehicleFormSchema>) => {
    const newVehicle = {
      id: vehicles.length + 1,
      plate: values.plate,
      make: values.make,
      model: values.model,
      year: parseInt(values.year),
      owner: values.owner,
      lastService: new Date().toISOString().split('T')[0],
    };
    
    onVehicleAdded(newVehicle);
    onVehicleChange(newVehicle.id.toString());
    setIsNewVehicleDialogOpen(false);
    vehicleForm.reset();
    
    toast.success("Veículo adicionado com sucesso!");
  };

  return (
    <div className="border p-4 rounded-md bg-slate-50">
      <h3 className="font-medium text-lg mb-4">Informações do Veículo</h3>
      
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Select 
            onValueChange={onVehicleChange} 
            value={selectedVehicleId}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Selecione a placa do veículo" />
            </SelectTrigger>
            <SelectContent>
              {vehicles.map((vehicle) => (
                <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                  {vehicle.plate} - {vehicle.make} {vehicle.model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog open={isNewVehicleDialogOpen} onOpenChange={setIsNewVehicleDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" type="button" className="sm:w-auto w-full">
                Novo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Veículo</DialogTitle>
              </DialogHeader>
              <Form {...vehicleForm}>
                <form onSubmit={vehicleForm.handleSubmit(onSubmitNewVehicle)} className="space-y-4">
                  <FormField
                    control={vehicleForm.control}
                    name="plate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Placa</FormLabel>
                        <FormControl>
                          <Input placeholder="ABC1234" {...field} maxLength={7} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={vehicleForm.control}
                      name="make"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Marca</FormLabel>
                          <FormControl>
                            <Input placeholder="Honda" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={vehicleForm.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Modelo</FormLabel>
                          <FormControl>
                            <Input placeholder="Civic" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={vehicleForm.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ano</FormLabel>
                          <FormControl>
                            <Input placeholder="2020" type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={vehicleForm.control}
                      name="owner"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Proprietário</FormLabel>
                          <FormControl>
                            <Input placeholder="João Silva" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <Button type="submit">Adicionar Veículo</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Display selected vehicle details */}
        {selectedVehicleId && (
          <div className="mt-4 p-3 bg-white rounded-md border">
            {(() => {
              const vehicle = getSelectedVehicle(selectedVehicleId);
              return vehicle ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div><span className="font-semibold">Marca:</span> {vehicle.make}</div>
                  <div><span className="font-semibold">Modelo:</span> {vehicle.model}</div>
                  <div><span className="font-semibold">Ano:</span> {vehicle.year}</div>
                  <div><span className="font-semibold">Proprietário:</span> {vehicle.owner}</div>
                  <div className="sm:col-span-2"><span className="font-semibold">Último Serviço:</span> {new Date(vehicle.lastService).toLocaleDateString('pt-BR')}</div>
                </div>
              ) : null;
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleSelector;
