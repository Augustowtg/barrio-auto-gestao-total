
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import PayableForm from "./PayableForm";

// Mock data
const mockPayables = [
  { id: 1, description: "Fornecedor XYZ Peças", category: "Fornecedores", amount: 1250.00, dueDate: "2023-05-20", status: "Pendente", paymentMethod: "Boleto", reference: "NF #001234" },
  { id: 2, description: "Aluguel", category: "Instalações", amount: 2000.00, dueDate: "2023-05-10", status: "Pago", paymentMethod: "Transferência", reference: "Contrato #5678" },
  { id: 3, description: "Energia Elétrica", category: "Utilidades", amount: 450.00, dueDate: "2023-05-15", status: "Atrasado", paymentMethod: "Débito Automático", reference: "Fatura #9876" },
  { id: 4, description: "Internet e Telefone", category: "Utilidades", amount: 200.00, dueDate: "2023-05-18", status: "Pendente", paymentMethod: "Cartão de Crédito", reference: "Fatura #5432" },
  { id: 5, description: "Salários", category: "Funcionários", amount: 4500.00, dueDate: "2023-05-05", status: "Pago", paymentMethod: "Transferência", reference: "Folha 05/2023" },
];

const AccountsPayable = () => {
  const [payables, setPayables] = useState(mockPayables);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const filteredPayables = payables.filter(payable => 
    payable.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payable.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payable.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pago":
        return "bg-green-100 text-green-800";
      case "Pendente":
        return "bg-yellow-100 text-yellow-800";
      case "Atrasado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handlePayableAdded = () => {
    setIsFormOpen(false);
    // In a real app, we would fetch the updated payables from the API
  };

  const markAsPaid = (id: number) => {
    setPayables(
      payables.map(payable => 
        payable.id === id 
          ? { ...payable, status: "Pago" } 
          : payable
      )
    );
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Contas a Pagar</h3>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Buscar conta..."
            className="px-3 py-2 border rounded-md w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button>Nova Conta a Pagar</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Nova Conta a Pagar</DialogTitle>
              </DialogHeader>
              <PayableForm onSuccess={handlePayableAdded} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Descrição</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Valor (R$)</TableHead>
            <TableHead>Vencimento</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Método Pagamento</TableHead>
            <TableHead>Referência</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPayables.map((payable) => (
            <TableRow key={payable.id}>
              <TableCell>{payable.description}</TableCell>
              <TableCell>{payable.category}</TableCell>
              <TableCell>{payable.amount.toFixed(2)}</TableCell>
              <TableCell>{new Date(payable.dueDate).toLocaleDateString('pt-BR')}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(payable.status)}`}>
                  {payable.status}
                </span>
              </TableCell>
              <TableCell>{payable.paymentMethod}</TableCell>
              <TableCell>{payable.reference}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {payable.status !== "Pago" && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => markAsPaid(payable.id)}
                    >
                      Marcar como Pago
                    </Button>
                  )}
                  <Button variant="outline" size="sm">Detalhes</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AccountsPayable;
