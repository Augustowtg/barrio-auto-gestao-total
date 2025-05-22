
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

// Mock vehicle data
const mockVehicles = [
  { id: 1, plate: "ABC1234", make: "Toyota", model: "Corolla", year: 2019, owner: "Carlos Silva", lastService: "2023-05-15" },
  { id: 2, plate: "DEF5678", make: "Honda", model: "Civic", year: 2020, owner: "Ana Oliveira", lastService: "2023-06-22" },
  { id: 3, plate: "GHI9012", make: "Fiat", model: "Uno", year: 2015, owner: "Roberto Santos", lastService: "2023-07-05" },
  { id: 4, plate: "JKL3456", make: "Volkswagen", model: "Gol", year: 2018, owner: "Maria Souza", lastService: "2023-06-10" },
  { id: 5, plate: "MNO7890", make: "Chevrolet", model: "Onix", year: 2021, owner: "João Ferreira", lastService: "2023-07-18" },
];

const formSchema = z.object({
  date: z.string().min(1, { message: "A data é obrigatória" }),
  vehicleId: z.string().min(1, { message: "Selecione um veículo" }),
  type: z.string().min(1, { message: "Selecione o tipo de serviço" }),
  description: z.string().min(5, { message: "A descrição deve ter pelo menos 5 caracteres" }),
  cost: z.string().min(1, { message: "Informe o valor do serviço" }),
  status: z.string().min(1, { message: "Selecione o status do serviço" }),
});

// New vehicle form schema
const vehicleFormSchema = z.object({
  plate: z.string().length(7, { message: "A placa deve ter 7 caracteres" }),
  make: z.string().min(1, { message: "A marca é obrigatória" }),
  model: z.string().min(1, { message: "O modelo é obrigatório" }),
  year: z.string().min(4, { message: "O ano deve ter 4 dígitos" }),
  owner: z.string().min(3, { message: "O nome do proprietário é obrigatório" }),
});

interface ServiceFormProps {
  onSuccess?: () => void;
  initialData?: any;
}

const ServiceForm = ({ onSuccess, initialData }: ServiceFormProps) => {
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [isNewVehicleDialogOpen, setIsNewVehicleDialogOpen] = useState(false);
  
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
              name="vehicleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Veículo</FormLabel>
                  <div className="flex gap-2">
                    <FormControl className="flex-1">
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o veículo" />
                        </SelectTrigger>
                        <SelectContent>
                          {vehicles.map((vehicle) => (
                            <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                              {vehicle.make} {vehicle.model} ({vehicle.plate})
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
          </div>
          
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
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Descreva o serviço a ser realizado"
                    {...field}
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
                  <FormLabel>Valor (R$)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01" 
                      min="0"
                      placeholder="0.00"
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
