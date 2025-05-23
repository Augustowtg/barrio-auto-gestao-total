
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

// Mock vehicle data
const mockVehicles = [
  { id: 1, plate: "ABC1234", make: "Toyota", model: "Corolla", year: 2019, owner: "Carlos Silva" },
  { id: 2, plate: "DEF5678", make: "Honda", model: "Civic", year: 2020, owner: "Ana Oliveira" },
  { id: 3, plate: "GHI9012", make: "Fiat", model: "Uno", year: 2015, owner: "Roberto Santos" },
  { id: 4, plate: "JKL3456", make: "Volkswagen", model: "Gol", year: 2018, owner: "Maria Souza" },
  { id: 5, plate: "MNO7890", make: "Chevrolet", model: "Onix", year: 2021, owner: "João Ferreira" },
];

// Mock inventory data
const mockInventory = [
  { id: 1, name: "Óleo de Motor 10W40", category: "Lubrificantes", price: 45.90, quantity: 18 },
  { id: 2, name: "Filtro de Óleo", category: "Filtros", price: 25.50, quantity: 12 },
  { id: 3, name: "Filtro de Ar", category: "Filtros", price: 32.00, quantity: 3 },
  { id: 4, name: "Pastilha de Freio Dianteira", category: "Freios", price: 120.00, quantity: 8 },
  { id: 5, name: "Fluido de Freio DOT4", category: "Lubrificantes", price: 28.50, quantity: 15 },
];

// Mock labor options
const mockLaborOptions = [
  { id: 1, name: "Troca de Óleo", price: 50.00 },
  { id: 2, name: "Troca de Filtros", price: 30.00 },
  { id: 3, name: "Troca de Pastilhas de Freio", price: 80.00 },
  { id: 4, name: "Alinhamento e Balanceamento", price: 120.00 },
  { id: 5, name: "Diagnóstico Elétrico", price: 100.00 },
];

// Form schema
const formSchema = z.object({
  type: z.string().min(1, { message: "Selecione o tipo de documento" }),
  customerName: z.string().min(3, { message: "Nome do cliente é obrigatório" }),
  customerDocument: z.string().min(11, { message: "CPF/CNPJ é obrigatório" }),
  vehicleId: z.string().optional(),
  items: z.array(z.object({
    id: z.number(),
    name: z.string(),
    quantity: z.number(),
    price: z.number()
  })).default([]),
  services: z.array(z.object({
    id: z.number(),
    name: z.string(),
    price: z.number()
  })).default([]),
  useServiceOrder: z.boolean().default(false),
  serviceOrderId: z.string().optional(),
});

interface FiscalDocumentFormProps {
  onSuccess?: () => void;
}

const FiscalDocumentForm = ({ onSuccess }: FiscalDocumentFormProps) => {
  const [activeTab, setActiveTab] = useState("nfe");
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [selectedServices, setSelectedServices] = useState<any[]>([]);
  const [searchInventory, setSearchInventory] = useState("");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: activeTab.toUpperCase(),
      customerName: "",
      customerDocument: "",
      vehicleId: "",
      items: [],
      services: [],
      useServiceOrder: false,
      serviceOrderId: "",
    },
  });
  
  // Filter inventory based on search term
  const filteredInventory = mockInventory.filter(item => 
    item.name.toLowerCase().includes(searchInventory.toLowerCase()) ||
    item.category.toLowerCase().includes(searchInventory.toLowerCase())
  );

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    form.setValue("type", value.toUpperCase());
  };

  // Add item to selected items
  const addItem = (item: any) => {
    const exists = selectedItems.find(i => i.id === item.id);
    if (exists) {
      setSelectedItems(
        selectedItems.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        )
      );
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  // Remove item from selected items
  const removeItem = (id: number) => {
    setSelectedItems(selectedItems.filter(item => item.id !== id));
  };

  // Add service to selected services
  const addService = (service: any) => {
    const exists = selectedServices.find(s => s.id === service.id);
    if (!exists) {
      setSelectedServices([...selectedServices, service]);
    }
  };

  // Remove service from selected services
  const removeService = (id: number) => {
    setSelectedServices(selectedServices.filter(service => service.id !== id));
  };

  // Calculate total
  const calculateTotal = () => {
    const itemsTotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const servicesTotal = selectedServices.reduce((sum, service) => sum + service.price, 0);
    return (itemsTotal + servicesTotal).toFixed(2);
  };

  // Update form values when selected items or services change
  useEffect(() => {
    form.setValue("items", selectedItems);
    form.setValue("services", selectedServices);
  }, [selectedItems, selectedServices, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Fiscal document form submitted:", values);
    toast.success("Documento fiscal emitido com sucesso!");
    
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="p-4">
      <Tabs defaultValue="nfe" onValueChange={handleTabChange}>
        <TabsList className="w-full mb-4">
          <TabsTrigger value="nfe" className="flex-1">NF-e</TabsTrigger>
          <TabsTrigger value="nfce" className="flex-1">NFC-e</TabsTrigger>
          <TabsTrigger value="nfse" className="flex-1">NFS-e</TabsTrigger>
        </TabsList>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Cliente</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do cliente" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="customerDocument"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF/CNPJ</FormLabel>
                    <FormControl>
                      <Input placeholder="000.000.000-00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {activeTab !== "nfce" && (
              <FormField
                control={form.control}
                name="vehicleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Veículo</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o veículo (opcional)" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockVehicles.map((vehicle) => (
                            <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                              {vehicle.plate} - {vehicle.make} {vehicle.model} ({vehicle.owner})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <FormField
              control={form.control}
              name="useServiceOrder"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Usar Ordem de Serviço Existente
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Preenche automaticamente com os dados de uma OS
                    </p>
                  </div>
                </FormItem>
              )}
            />
            
            {form.watch("useServiceOrder") && (
              <FormField
                control={form.control}
                name="serviceOrderId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ordem de Serviço</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a OS" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">OS #001 - Toyota Corolla (Carlos Silva)</SelectItem>
                          <SelectItem value="2">OS #002 - Honda Civic (Ana Oliveira)</SelectItem>
                          <SelectItem value="3">OS #003 - Fiat Uno (Roberto Santos)</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <div className="border p-4 rounded-md bg-slate-50">
              <h3 className="font-medium text-lg mb-4">
                {activeTab === "nfse" ? "Serviços" : "Produtos"}
              </h3>
              
              <div className="space-y-4">
                {activeTab !== "nfse" && (
                  <>
                    <Input 
                      placeholder="Buscar no estoque..." 
                      value={searchInventory}
                      onChange={(e) => setSearchInventory(e.target.value)}
                    />
                    
                    {filteredInventory.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 bg-white rounded-md border">
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
                              onClick={() => addItem(item)}
                              type="button"
                              disabled={item.quantity === 0}
                            >
                              Adicionar
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
                
                {activeTab === "nfse" && (
                  <div className="mb-4">
                    <Select onValueChange={(value) => {
                      const serviceId = parseInt(value);
                      const service = mockLaborOptions.find(s => s.id === serviceId);
                      if (service) addService(service);
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockLaborOptions.map((service) => (
                          <SelectItem key={service.id} value={service.id.toString()}>
                            {service.name} - R$ {service.price.toFixed(2)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                {/* Display selected items or services */}
                <div>
                  {activeTab !== "nfse" && selectedItems.length > 0 && (
                    <div className="space-y-2 mt-4">
                      <h4 className="text-sm font-medium">Itens Selecionados</h4>
                      {selectedItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center bg-white p-2 rounded-md border">
                          <div>
                            <div>{item.name}</div>
                            <div className="text-sm text-muted-foreground">
                              R$ {item.price.toFixed(2)} x {item.quantity} = R$ {(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => removeItem(item.id)}
                            type="button"
                          >
                            Remover
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {activeTab === "nfse" && selectedServices.length > 0 && (
                    <div className="space-y-2 mt-4">
                      <h4 className="text-sm font-medium">Serviços Selecionados</h4>
                      {selectedServices.map((service) => (
                        <div key={service.id} className="flex justify-between items-center bg-white p-2 rounded-md border">
                          <div>
                            <div>{service.name}</div>
                            <div className="text-sm text-muted-foreground">
                              R$ {service.price.toFixed(2)}
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => removeService(service.id)}
                            type="button"
                          >
                            Remover
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center py-4 border-t">
              <div className="font-semibold text-lg">
                Total: R$ {calculateTotal()}
              </div>
              <div className="flex gap-2">
                <Button type="submit">Emitir Documento</Button>
              </div>
            </div>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default FiscalDocumentForm;
