
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import ReceivableForm from "./ReceivableForm";

// Mock data
const mockReceivables = [
  { id: 1, description: "OS #045 - Troca de óleo e filtros", customer: "Carlos Silva", amount: 320.00, dueDate: "2023-05-20", status: "Pendente", paymentMethod: "Cartão de Crédito", reference: "OS #045" },
  { id: 2, description: "OS #044 - Troca de amortecedores", customer: "Ana Oliveira", amount: 850.00, dueDate: "2023-05-15", status: "Pago", paymentMethod: "Transferência", reference: "OS #044" },
  { id: 3, description: "OS #043 - Troca de pastilhas de freio", customer: "Roberto Santos", amount: 250.00, dueDate: "2023-05-10", status: "Atrasado", paymentMethod: "Boleto", reference: "OS #043" },
  { id: 4, description: "OS #042 - Diagnóstico elétrico", customer: "Maria Souza", amount: 150.00, dueDate: "2023-05-05", status: "Pago", paymentMethod: "Dinheiro", reference: "OS #042" },
  { id: 5, description: "OS #041 - Substituição de correia dentada", customer: "João Ferreira", amount: 420.00, dueDate: "2023-05-25", status: "Pendente", paymentMethod: "Cartão de Débito", reference: "OS #041" },
];

const AccountsReceivable = () => {
  const [receivables, setReceivables] = useState(mockReceivables);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const filteredReceivables = receivables.filter(receivable => 
    receivable.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receivable.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receivable.reference.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleReceivableAdded = () => {
    setIsFormOpen(false);
    // In a real app, we would fetch the updated receivables from the API
  };

  const markAsPaid = (id: number) => {
    setReceivables(
      receivables.map(receivable => 
        receivable.id === id 
          ? { ...receivable, status: "Pago" } 
          : receivable
      )
    );
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Contas a Receber</h3>
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
              <Button>Nova Conta a Receber</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Nova Conta a Receber</DialogTitle>
              </DialogHeader>
              <ReceivableForm onSuccess={handleReceivableAdded} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Descrição</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Valor (R$)</TableHead>
            <TableHead>Vencimento</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Método Pagamento</TableHead>
            <TableHead>Referência</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredReceivables.map((receivable) => (
            <TableRow key={receivable.id}>
              <TableCell>{receivable.description}</TableCell>
              <TableCell>{receivable.customer}</TableCell>
              <TableCell>{receivable.amount.toFixed(2)}</TableCell>
              <TableCell>{new Date(receivable.dueDate).toLocaleDateString('pt-BR')}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(receivable.status)}`}>
                  {receivable.status}
                </span>
              </TableCell>
              <TableCell>{receivable.paymentMethod}</TableCell>
              <TableCell>{receivable.reference}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {receivable.status !== "Pago" && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => markAsPaid(receivable.id)}
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

export default AccountsReceivable;
