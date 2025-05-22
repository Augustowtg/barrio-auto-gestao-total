
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

// Mock data
const mockExpenses = [
  { id: 1, description: "Compra de ferramentas", category: "Equipamentos", amount: 1200.00, date: "2023-07-15", status: "paid" },
  { id: 2, description: "Aluguel do espaço", category: "Instalações", amount: 2500.00, date: "2023-07-01", status: "paid" },
  { id: 3, description: "Lote de peças suspensão", category: "Estoque", amount: 3800.00, date: "2023-07-12", status: "pending" },
  { id: 4, description: "Salários - Junho", category: "Funcionários", amount: 7500.00, date: "2023-07-05", status: "paid" },
  { id: 5, description: "Serviços contábeis", category: "Serviços", amount: 450.00, date: "2023-07-20", status: "pending" },
];

const ExpenseList = () => {
  const [expenses, setExpenses] = useState(mockExpenses);
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredExpenses = expenses.filter(expense => 
    expense.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
    expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Despesas</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Buscar despesa..."
            className="px-3 py-2 border rounded-md w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button>Nova Despesa</Button>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Descrição</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredExpenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.description}</TableCell>
              <TableCell>{expense.category}</TableCell>
              <TableCell>{formatCurrency(expense.amount)}</TableCell>
              <TableCell>{formatDate(expense.date)}</TableCell>
              <TableCell>
                <Badge variant={expense.status === 'paid' ? 'secondary' : 'outline'}>
                  {expense.status === 'paid' ? 'Pago' : 'Pendente'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">Editar</Button>
                  {expense.status === 'pending' && (
                    <Button variant="secondary" size="sm">Marcar como Pago</Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExpenseList;
