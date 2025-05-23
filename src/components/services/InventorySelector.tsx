
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

interface SelectedInventoryItem extends InventoryItem {
  usedQuantity: number;
}

interface InventorySelectorProps {
  inventory: InventoryItem[];
  selectedInventory: SelectedInventoryItem[];
  onInventoryAdded: (item: InventoryItem, quantity?: number) => void;
  onInventoryRemoved: (id: number) => void;
  onInventoryQuantityUpdated: (id: number, quantity: number) => void;
}

const InventorySelector = ({ 
  inventory, 
  selectedInventory, 
  onInventoryAdded, 
  onInventoryRemoved, 
  onInventoryQuantityUpdated 
}: InventorySelectorProps) => {
  const [searchInventory, setSearchInventory] = useState("");

  // Filter inventory based on search term
  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchInventory.toLowerCase()) ||
    item.category.toLowerCase().includes(searchInventory.toLowerCase())
  );

  return (
    <div className="border p-4 rounded-md bg-slate-50">
      <h3 className="font-medium text-lg mb-4">Peças e Produtos</h3>
      
      <div className="space-y-4">
        <Input 
          placeholder="Buscar no estoque..." 
          value={searchInventory}
          onChange={(e) => setSearchInventory(e.target.value)}
          className="w-full"
        />
        
        {filteredInventory.length > 0 && searchInventory && (
          <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto p-2 bg-white rounded-md border">
            {filteredInventory.map((item) => (
              <div 
                key={item.id} 
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 hover:bg-slate-50 rounded-md gap-2"
              >
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {item.category} | Estoque: {item.quantity} | R$ {item.price.toFixed(2)}
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => onInventoryAdded(item)}
                  type="button"
                  disabled={item.quantity === 0 || selectedInventory.some(i => i.id === item.id && i.usedQuantity === i.quantity)}
                  className="sm:w-auto w-full"
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
              <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-3 rounded-md border gap-3">
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-muted-foreground">
                    R$ {item.price.toFixed(2)} x {item.usedQuantity} = R$ {(item.price * item.usedQuantity).toFixed(2)}
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="flex items-center">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-8 w-8 p-0 rounded-r-none"
                      onClick={() => onInventoryQuantityUpdated(item.id, item.usedQuantity - 1)}
                      disabled={item.usedQuantity <= 1}
                      type="button"
                    >
                      -
                    </Button>
                    <Input 
                      type="number" 
                      className="h-8 w-16 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      value={item.usedQuantity}
                      min={1}
                      max={item.quantity}
                      onChange={(e) => onInventoryQuantityUpdated(item.id, parseInt(e.target.value) || 1)}
                    />
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-8 w-8 p-0 rounded-l-none"
                      onClick={() => onInventoryQuantityUpdated(item.id, item.usedQuantity + 1)}
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
                    onClick={() => onInventoryRemoved(item.id)}
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

export default InventorySelector;
