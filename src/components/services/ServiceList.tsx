
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data - in a real app this would come from an API
const mockServices = [
  { id: 1, date: "2023-05-15", vehicle: "Toyota Corolla (ABC1234)", owner: "Carlos Silva", type: "Manutenção", description: "Troca de óleo e filtros", status: "Concluído", cost: 320.00 },
  { id: 2, date: "2023-05-22", vehicle: "Honda Civic (DEF5678)", owner: "Ana Oliveira", type: "Reparo", description: "Troca de amortecedores", status: "Em andamento", cost: 850.00 },
  { id: 3, date: "2023-05-23", vehicle: "Fiat Uno (GHI9012)", owner: "Roberto Santos", type: "Manutenção", description: "Troca de pastilhas de freio", status: "Concluído", cost: 250.00 },
  { id: 4, date: "2023-05-24", vehicle: "Volkswagen Gol (JKL3456)", owner: "Maria Souza", type: "Diagnóstico", description: "Diagnóstico elétrico", status: "Aguardando aprovação", cost: 150.00 },
  { id: 5, date: "2023-05-25", vehicle: "Chevrolet Onix (MNO7890)", owner: "João Ferreira", type: "Reparo", description: "Substituição de correia dentada", status: "Agendado", cost: 420.00 },
];

const ServiceList = () => {
  const [services, setServices] = useState(mockServices);
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredServices = services.filter(service => 
    service.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Concluído":
        return "bg-green-100 text-green-800";
      case "Em andamento":
        return "bg-blue-100 text-blue-800";
      case "Aguardando aprovação":
        return "bg-yellow-100 text-yellow-800";
      case "Agendado":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Serviços</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Buscar serviço..."
            className="px-3 py-2 border rounded-md w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button>Novo Serviço</Button>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Veículo</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Valor (R$)</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredServices.map((service) => (
            <TableRow key={service.id}>
              <TableCell>{new Date(service.date).toLocaleDateString('pt-BR')}</TableCell>
              <TableCell>{service.vehicle}</TableCell>
              <TableCell>{service.owner}</TableCell>
              <TableCell>{service.type}</TableCell>
              <TableCell>{service.description}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(service.status)}`}>
                  {service.status}
                </span>
              </TableCell>
              <TableCell>{service.cost.toFixed(2)}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm">Detalhes</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ServiceList;
