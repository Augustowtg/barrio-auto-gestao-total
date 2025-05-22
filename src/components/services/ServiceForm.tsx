
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

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
  labor: z.array(z.object({
    id: z.number(),
    name: z.string(),
    price: z.number()
  })).default([]),
  inventoryItems: z.array(z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    usedQuantity: z.number()
  })).default([]),
});

// Vehicle form schema
const vehicleFormSchema = z.object({
  plate: z.string().length(7, { message: "A placa deve ter 7 caracteres" }),
  make: z.string().min(1, { message: "A marca é obrigatória" }),
  model: z.string().min(1, { message: "O modelo é obrigatório" }),
  year: z.string().min(4, { message: "O ano deve ter 4 dígitos" }),
  owner: z.string().min(3, { message: "O nome do proprietário é obrigatório" }),
});

// Labor form schema
const laborFormSchema = z.object({
  name: z.string().min(3, { message: "O nome do serviço é obrigatório" }),
  price: z.string().min(1, { message: "O valor é obrigatório" }),
});

interface ServiceFormProps {
  onSuccess?: () => void;
  initialData?: any;
}

const ServiceForm = ({ onSuccess, initialData }: ServiceFormProps) => {
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [isNewVehicleDialogOpen, setIsNewVehicleDialogOpen] = useState(false);
  const [isNewLaborDialogOpen, setIsNewLaborDialogOpen] = useState(false);
  const [searchInventory, setSearchInventory] = useState("");
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
      labor: [],
      inventoryItems: [],
    },
  });
  
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

  const laborForm = useForm<z.infer<typeof laborFormSchema>>({
    resolver: zodResolver(laborFormSchema),
    defaultValues: {
      name: "",
      price: "",
    },
  });

  // Filter inventory based on search term
  const filteredInventory = mockInventory.filter(item => 
    item.name.toLowerCase().includes(searchInventory.toLowerCase()) ||
    item.category.toLowerCase().includes(searchInventory.toLowerCase())
  );

  // Calculate total cost
  useEffect(() => {
    const laborTotal = selectedLabor.reduce((sum, item) => sum + item.price, 0);
    const inventoryTotal = selectedInventory.reduce((sum, item) => sum + (item.price * item.usedQuantity), 0);
    const total = (laborTotal + inventoryTotal).toFixed(2);
    form.setValue("cost", total);
  }, [selectedLabor, selectedInventory, form]);

  useEffect(() => {
    form.setValue("labor", selectedLabor);
    form.setValue("inventoryItems", selectedInventory);
  }, [selectedLabor, selectedInventory, form]);

  const getSelectedVehicle = (id: string) => {
    return vehicles.find(vehicle => vehicle.id.toString() === id);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Service form submitted:", values);
    toast.success("Serviço registrado com sucesso!");
    
    if (onSuccess) {
      onSuccess();
    }
  };
  
  const onSubmitNewVehicle = (values: z.infer<typeof vehicleFormSchema>) => {
    console.log("New vehicle form submitted:", values);
    
    // Add the new vehicle to the list
    const newVehicle = {
      id: vehicles.length + 1,
      plate: values.plate,
      make: values.make,
      model: values.model,
      year: parseInt(values.year),
      owner: values.owner,
      lastService: new Date().toISOString().split('T')[0],
    };
    
    setVehicles([...vehicles, newVehicle]);
    
    // Set the new vehicle as selected in the service form
    form.setValue("vehicleId", newVehicle.id.toString());
    
    // Close the dialog
    setIsNewVehicleDialogOpen(false);
    
    toast.success("Veículo adicionado com sucesso!");
  };

  const onSubmitNewLabor = (values: z.infer<typeof laborFormSchema>) => {
    const newLabor = {
      id: laborOptions.length + 1,
      name: values.name,
      price: parseFloat(values.price),
    };
    
    setLaborOptions([...laborOptions, newLabor]);
    addLabor(newLabor);
    
    // Close the dialog
    setIsNewLaborDialogOpen(false);
    
    toast.success("Serviço adicionado com sucesso!");
  };

  const addLabor = (labor: typeof mockLaborOptions[0]) => {
    setSelectedLabor([...selectedLabor, labor]);
  };

  const removeLabor = (id: number) => {
    setSelectedLabor(selectedLabor.filter(item => item.id !== id));
  };

  const addInventoryItem = (item: typeof mockInventory[0], quantity: number = 1) => {
    // Check if item already exists in selected inventory
    const existingItem = selectedInventory.find(i => i.id === item.id);
    
    if (existingItem) {
      // Update quantity if it already exists
      setSelectedInventory(
        selectedInventory.map(i => 
          i.id === item.id 
            ? { ...i, usedQuantity: Math.min(i.usedQuantity + quantity, i.quantity) } 
            : i
        )
      );
    } else {
      // Add new item
      setSelectedInventory([...selectedInventory, { ...item, usedQuantity: Math.min(quantity, item.quantity) }]);
    }
  };

  const removeInventoryItem = (id: number) => {
    setSelectedInventory(selectedInventory.filter(item => item.id !== id));
  };

  const updateInventoryItemQuantity = (id: number, quantity: number) => {
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
    <div className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          
          {/* Vehicle Selection Section */}
          <div className="border p-4 rounded-md bg-slate-50">
            <h3 className="font-medium text-lg mb-4">Informações do Veículo</h3>
            
            <FormField
              control={form.control}
              name="vehicleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Placa do Veículo</FormLabel>
                  <div className="flex gap-2">
                    <FormControl className="flex-1">
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
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
                    </FormControl>
                    <Dialog open={isNewVehicleDialogOpen} onOpenChange={setIsNewVehicleDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" type="button">Novo</Button>
                      </DialogTrigger>
                      <DialogContent>
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
                            
                            <div className="flex justify-end">
                              <Button type="submit">Adicionar Veículo</Button>
                            </div>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Display selected vehicle details */}
            {form.watch("vehicleId") && (
              <div className="mt-4 p-3 bg-white rounded-md border">
                {(() => {
                  const vehicle = getSelectedVehicle(form.watch("vehicleId"));
                  return vehicle ? (
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="font-semibold">Marca:</span> {vehicle.make}</div>
                      <div><span className="font-semibold">Modelo:</span> {vehicle.model}</div>
                      <div><span className="font-semibold">Ano:</span> {vehicle.year}</div>
                      <div><span className="font-semibold">Proprietário:</span> {vehicle.owner}</div>
                      <div><span className="font-semibold">Último Serviço:</span> {new Date(vehicle.lastService).toLocaleDateString('pt-BR')}</div>
                    </div>
                  ) : null;
                })()}
              </div>
            )}
          </div>
          
          {/* Labor Services Section */}
          <div className="border p-4 rounded-md bg-slate-50">
            <h3 className="font-medium text-lg mb-4">Mão de Obra</h3>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <Select onValueChange={(value) => {
                  const laborId = parseInt(value);
                  const labor = laborOptions.find(l => l.id === laborId);
                  if (labor) addLabor(labor);
                }}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Selecione o serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    {laborOptions.map((labor) => (
                      <SelectItem key={labor.id} value={labor.id.toString()}>
                        {labor.name} - R$ {labor.price.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Dialog open={isNewLaborDialogOpen} onOpenChange={setIsNewLaborDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" type="button">Novo</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Adicionar Novo Serviço</DialogTitle>
                    </DialogHeader>
                    <Form {...laborForm}>
                      <form onSubmit={laborForm.handleSubmit(onSubmitNewLabor)} className="space-y-4">
                        <FormField
                          control={laborForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome do Serviço</FormLabel>
                              <FormControl>
                                <Input placeholder="Troca de Óleo" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={laborForm.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Valor (R$)</FormLabel>
                              <FormControl>
                                <Input placeholder="50.00" type="number" step="0.01" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex justify-end">
                          <Button type="submit">Adicionar Serviço</Button>
                        </div>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
              
              {/* Display selected labor services */}
              {selectedLabor.length > 0 && (
                <div className="space-y-2">
                  {selectedLabor.map((labor) => (
                    <div key={labor.id} className="flex justify-between items-center bg-white p-2 rounded-md border">
                      <span>{labor.name}</span>
                      <div className="flex items-center gap-2">
                        <span>R$ {labor.price.toFixed(2)}</span>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0" 
                          onClick={() => removeLabor(labor.id)}
                          type="button"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Inventory Items Section */}
          <div className="border p-4 rounded-md bg-slate-50">
            <h3 className="font-medium text-lg mb-4">Peças e Produtos</h3>
            
            <div className="space-y-4">
              <Input 
                placeholder="Buscar no estoque..." 
                value={searchInventory}
                onChange={(e) => setSearchInventory(e.target.value)}
              />
              
              {filteredInventory.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-64 overflow-y-auto p-2 bg-white rounded-md border">
                  {filteredInventory.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex justify-between items-center p-2 hover:bg-slate-50 rounded-md"
                    >
                      <div>
                        <div>{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Estoque: {item.quantity} | R$ {item.price.toFixed(2)}
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => addInventoryItem(item)}
                        type="button"
                        disabled={item.quantity === 0 || selectedInventory.some(i => i.id === item.id && i.usedQuantity === i.quantity)}
                      >
                        Adicionar
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Display selected inventory items */}
              {selectedInventory.length > 0 && (
                <div className="space-y-2 mt-4">
                  <h4 className="text-sm font-medium">Itens Selecionados</h4>
                  {selectedInventory.map((item) => (
                    <div key={item.id} className="flex justify-between items-center bg-white p-2 rounded-md border">
                      <div>
                        <div>{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          R$ {item.price.toFixed(2)} x {item.usedQuantity} = R$ {(item.price * item.usedQuantity).toFixed(2)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 w-8 p-0 rounded-r-none"
                            onClick={() => updateInventoryItemQuantity(item.id, item.usedQuantity - 1)}
                            disabled={item.usedQuantity <= 1}
                            type="button"
                          >
                            -
                          </Button>
                          <Input 
                            type="number" 
                            className="h-8 w-12 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            value={item.usedQuantity}
                            min={1}
                            max={item.quantity}
                            onChange={(e) => updateInventoryItemQuantity(item.id, parseInt(e.target.value) || 1)}
                          />
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 w-8 p-0 rounded-l-none"
                            onClick={() => updateInventoryItemQuantity(item.id, item.usedQuantity + 1)}
                            disabled={item.usedQuantity >= item.quantity}
                            type="button"
                          >
                            +
                          </Button>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0" 
                          onClick={() => removeInventoryItem(item.id)}
                          type="button"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Description and other fields */}
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          
          <div className="flex justify-end">
            <Button type="submit">Salvar Serviço</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ServiceForm;
