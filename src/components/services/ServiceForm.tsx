
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import VehicleSelector from "./VehicleSelector";
import LaborSelector from "./LaborSelector";
import InventorySelector from "./InventorySelector";

// Mock vehicle data
const mockVehicles = [
  { id: 1, plate: "ABC1234", make: "Toyota", model: "Corolla", year: 2019, owner: "Carlos Silva", lastService: "2023-05-15" },
  { id: 2, plate: "DEF5678", make: "Honda", model: "Civic", year: 2020, owner: "Ana Oliveira", lastService: "2023-06-22" },
  { id: 3, plate: "GHI9012", make: "Fiat", model: "Uno", year: 2015, owner: "Roberto Santos", lastService: "2023-07-05" },
  { id: 4, plate: "JKL3456", make: "Volkswagen", model: "Gol", year: 2018, owner: "Maria Souza", lastService: "2023-06-10" },
  { id: 5, plate: "MNO7890", make: "Chevrolet", model: "Onix", year: 2021, owner: "João Ferreira", lastService: "2023-07-18" },
];

// Mock inventory data
const mockInventory = [
  { id: 1, name: "Óleo de Motor 10W40", category: "Lubrificantes", price: 45.90, quantity: 18 },
  { id: 2, name: "Filtro de Óleo", category: "Filtros", price: 25.50, quantity: 12 },
  { id: 3, name: "Filtro de Ar", category: "Filtros", price: 32.00, quantity: 3 },
  { id: 4, name: "Pastilha de Freio Dianteira", category: "Freios", price: 120.00, quantity: 8 },
  { id: 5, name: "Fluido de Freio DOT4", category: "Lubrificantes", price: 28.50, quantity: 15 },
  { id: 6, name: "Vela de Ignição", category: "Elétrica", price: 22.00, quantity: 24 },
  { id: 7, name: "Correia Dentada", category: "Motor", price: 75.00, quantity: 5 },
  { id: 8, name: "Amortecedor Dianteiro", category: "Suspensão", price: 350.00, quantity: 4 },
];

// Mock labor options
const mockLaborOptions = [
  { id: 1, name: "Troca de Óleo", price: 50.00 },
  { id: 2, name: "Troca de Filtros", price: 30.00 },
  { id: 3, name: "Troca de Pastilhas de Freio", price: 80.00 },
  { id: 4, name: "Alinhamento e Balanceamento", price: 120.00 },
  { id: 5, name: "Diagnóstico Elétrico", price: 100.00 },
  { id: 6, name: "Revisão Completa", price: 250.00 },
  { id: 7, name: "Troca de Correia Dentada", price: 200.00 },
  { id: 8, name: "Troca de Amortecedores", price: 180.00 },
];

const formSchema = z.object({
  date: z.string().min(1, { message: "A data é obrigatória" }),
  vehicleId: z.string().min(1, { message: "Selecione um veículo" }),
  type: z.string().min(1, { message: "Selecione o tipo de serviço" }),
  description: z.string().optional(),
  cost: z.string().min(1, { message: "Informe o valor do serviço" }),
  status: z.string().min(1, { message: "Selecione o status do serviço" }),
});

interface ServiceFormProps {
  onSuccess?: () => void;
  initialData?: any;
}

const ServiceForm = ({ onSuccess, initialData }: ServiceFormProps) => {
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [laborOptions, setLaborOptions] = useState(mockLaborOptions);
  const [selectedLabor, setSelectedLabor] = useState<Array<typeof mockLaborOptions[0]>>([]);
  const [selectedInventory, setSelectedInventory] = useState<Array<typeof mockInventory[0] & { usedQuantity: number }>>([]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      date: new Date().toISOString().split('T')[0],
      vehicleId: "",
      type: "",
      description: "",
      cost: "",
      status: "Agendado",
    },
  });

  // Calculate total cost
  useEffect(() => {
    const laborTotal = selectedLabor.reduce((sum, item) => sum + item.price, 0);
    const inventoryTotal = selectedInventory.reduce((sum, item) => sum + (item.price * item.usedQuantity), 0);
    const total = (laborTotal + inventoryTotal).toFixed(2);
    form.setValue("cost", total);
  }, [selectedLabor, selectedInventory, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Service form submitted:", values);
    console.log("Selected labor:", selectedLabor);
    console.log("Selected inventory:", selectedInventory);
    toast.success("Serviço registrado com sucesso!");
    
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleVehicleAdded = (vehicle: typeof mockVehicles[0]) => {
    setVehicles([...vehicles, vehicle]);
  };

  const handleLaborAdded = (labor: typeof mockLaborOptions[0]) => {
    if (!selectedLabor.find(l => l.id === labor.id)) {
      setSelectedLabor([...selectedLabor, labor]);
    }
  };

  const handleLaborRemoved = (id: number) => {
    setSelectedLabor(selectedLabor.filter(item => item.id !== id));
  };

  const handleNewLaborCreated = (labor: typeof mockLaborOptions[0]) => {
    setLaborOptions([...laborOptions, labor]);
  };

  const handleInventoryAdded = (item: typeof mockInventory[0], quantity: number = 1) => {
    const existingItem = selectedInventory.find(i => i.id === item.id);
    
    if (existingItem) {
      setSelectedInventory(
        selectedInventory.map(i => 
          i.id === item.id 
            ? { ...i, usedQuantity: Math.min(i.usedQuantity + quantity, i.quantity) } 
            : i
        )
      );
    } else {
      setSelectedInventory([...selectedInventory, { ...item, usedQuantity: Math.min(quantity, item.quantity) }]);
    }
  };

  const handleInventoryRemoved = (id: number) => {
    setSelectedInventory(selectedInventory.filter(item => item.id !== id));
  };

  const handleInventoryQuantityUpdated = (id: number, quantity: number) => {
    const item = selectedInventory.find(i => i.id === id);
    if (item) {
      const validQuantity = Math.max(1, Math.min(quantity, item.quantity));
      setSelectedInventory(
        selectedInventory.map(i => 
          i.id === id 
            ? { ...i, usedQuantity: validQuantity } 
            : i
        )
      );
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Serviço</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Manutenção">Manutenção</SelectItem>
                        <SelectItem value="Reparo">Reparo</SelectItem>
                        <SelectItem value="Revisão">Revisão</SelectItem>
                        <SelectItem value="Diagnóstico">Diagnóstico</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <VehicleSelector 
            vehicles={vehicles}
            selectedVehicleId={form.watch("vehicleId")}
            onVehicleChange={(vehicleId) => form.setValue("vehicleId", vehicleId)}
            onVehicleAdded={handleVehicleAdded}
          />
          
          <LaborSelector 
            laborOptions={laborOptions}
            selectedLabor={selectedLabor}
            onLaborAdded={handleLaborAdded}
            onLaborRemoved={handleLaborRemoved}
            onNewLaborCreated={handleNewLaborCreated}
          />
          
          <InventorySelector 
            inventory={mockInventory}
            selectedInventory={selectedInventory}
            onInventoryAdded={handleInventoryAdded}
            onInventoryRemoved={handleInventoryRemoved}
            onInventoryQuantityUpdated={handleInventoryQuantityUpdated}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observações</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Observações adicionais sobre o serviço"
                    {...field}
                    value={field.value || ""}
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor Total (R$)</FormLabel>
                  <FormControl>
                    <Input 
                      readOnly
                      {...field}
                      className="bg-gray-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Agendado">Agendado</SelectItem>
                        <SelectItem value="Em andamento">Em andamento</SelectItem>
                        <SelectItem value="Concluído">Concluído</SelectItem>
                        <SelectItem value="Aguardando aprovação">Aguardando aprovação</SelectItem>
                        <SelectItem value="Cancelado">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex justify-end pt-4">
            <Button type="submit" className="w-full sm:w-auto">
              Salvar Serviço
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ServiceForm;
