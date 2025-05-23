
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface InventoryAdjustFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemName: string;
  currentQuantity: number;
  onSuccess?: () => void;
}

const InventoryAdjustForm = ({ open, onOpenChange, itemName, currentQuantity, onSuccess }: InventoryAdjustFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    type: "",
    quantity: "",
    reason: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newQuantity = formData.type === "add" 
      ? currentQuantity + parseInt(formData.quantity)
      : currentQuantity - parseInt(formData.quantity);
    
    toast({
      title: "Estoque ajustado com sucesso!",
      description: `${itemName} agora tem ${newQuantity} unidades em estoque.`
    });
    
    setFormData({
      type: "",
      quantity: "",
      reason: ""
    });
    
    onOpenChange(false);
    onSuccess?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajustar Estoque - {itemName}</DialogTitle>
        </DialogHeader>
        
        <div className="mb-4 p-3 bg-muted rounded-md">
          <p className="text-sm text-muted-foreground">Quantidade atual: <span className="font-medium">{currentQuantity}</span></p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Tipo de Ajuste</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de ajuste" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="add">Adicionar ao Estoque</SelectItem>
                <SelectItem value="remove">Remover do Estoque</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="quantity">Quantidade</Label>
            <Input
              id="quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: e.target.value})}
              required
              min="1"
              max={formData.type === "remove" ? currentQuantity : undefined}
            />
          </div>
          
          <div>
            <Label htmlFor="reason">Motivo do Ajuste</Label>
            <Textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              placeholder="Descreva o motivo do ajuste..."
              required
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Ajustar Estoque
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryAdjustForm;
