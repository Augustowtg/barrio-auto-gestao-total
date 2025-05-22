
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

// Mock data
const mockItems = [
  { id: 1, name: "Óleo Motor 5W30", category: "Lubrificantes", quantity: 25, minQuantity: 10, price: 120.00 },
  { id: 2, name: "Filtro de Óleo", category: "Filtros", quantity: 18, minQuantity: 15, price: 35.50 },
  { id: 3, name: "Pastilha de Freio", category: "Freios", quantity: 8, minQuantity: 10, price: 89.90 },
  { id: 4, name: "Amortecedor Dianteiro", category: "Suspensão", quantity: 6, minQuantity: 4, price: 350.00 },
  { id: 5, name: "Vela de Ignição", category: "Elétrica", quantity: 40, minQuantity: 20, price: 22.90 },
];

const InventoryList = () => {
  const [items, setItems] = useState(mockItems);
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (quantity: number, minQuantity: number) => {
    if (quantity <= 0) return { label: "Sem Estoque", variant: "destructive" as const };
    if (quantity < minQuantity) return { label: "Baixo", variant: "destructive" as const };
    if (quantity < minQuantity * 2) return { label: "Médio", variant: "accent" as const };
    return { label: "Bom", variant: "secondary" as const };
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Estoque</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Buscar item..."
            className="px-3 py-2 border rounded-md w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button>Novo Item</Button>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Preço (R$)</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item) => {
            const status = getStockStatus(item.quantity, item.minQuantity);
            return (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </TableCell>
                <TableCell>{item.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">Editar</Button>
                    <Button variant="outline" size="sm">Ajustar</Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default InventoryList;
