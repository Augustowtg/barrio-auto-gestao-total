
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
import { X } from "lucide-react";

const laborFormSchema = z.object({
  name: z.string().min(3, { message: "O nome do serviço é obrigatório" }),
  price: z.string().min(1, { message: "O valor é obrigatório" }),
});

interface LaborOption {
  id: number;
  name: string;
  price: number;
}

interface LaborSelectorProps {
  laborOptions: LaborOption[];
  selectedLabor: LaborOption[];
  onLaborAdded: (labor: LaborOption) => void;
  onLaborRemoved: (id: number) => void;
  onNewLaborCreated: (labor: LaborOption) => void;
}

const LaborSelector = ({ laborOptions, selectedLabor, onLaborAdded, onLaborRemoved, onNewLaborCreated }: LaborSelectorProps) => {
  const [isNewLaborDialogOpen, setIsNewLaborDialogOpen] = useState(false);
  
  const laborForm = useForm<z.infer<typeof laborFormSchema>>({
    resolver: zodResolver(laborFormSchema),
    defaultValues: {
      name: "",
      price: "",
    },
  });

  const onSubmitNewLabor = (values: z.infer<typeof laborFormSchema>) => {
    const newLabor = {
      id: laborOptions.length + 1,
      name: values.name,
      price: parseFloat(values.price),
    };
    
    onNewLaborCreated(newLabor);
    onLaborAdded(newLabor);
    setIsNewLaborDialogOpen(false);
    laborForm.reset();
    
    toast.success("Serviço adicionado com sucesso!");
  };

  return (
    <div className="border p-4 rounded-md bg-slate-50">
      <h3 className="font-medium text-lg mb-4">Mão de Obra</h3>
      
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Select onValueChange={(value) => {
            const laborId = parseInt(value);
            const labor = laborOptions.find(l => l.id === laborId);
            if (labor) onLaborAdded(labor);
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
              <Button variant="outline" type="button" className="sm:w-auto w-full">
                Novo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
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
                  
                  <div className="flex justify-end pt-4">
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
              <div key={labor.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-3 rounded-md border gap-2">
                <span className="font-medium">{labor.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">R$ {labor.price.toFixed(2)}</span>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 w-8 p-0" 
                    onClick={() => onLaborRemoved(labor.id)}
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
  );
};

export default LaborSelector;
