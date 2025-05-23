
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2 } from "lucide-react";

// Mock data para os serviços profissionais
const mockProfessionalServices = [
  { id: 1, name: "Troca de Óleo", description: "Troca completa do óleo do motor", category: "Manutenção", duration: 30, price: 120.00 },
  { id: 2, name: "Alinhamento e Balanceamento", description: "Serviço completo de alinhamento e balanceamento", category: "Suspensão", duration: 60, price: 80.00 },
  { id: 3, name: "Troca de Pastilhas de Freio", description: "Substituição das pastilhas de freio dianteiras", category: "Freios", duration: 45, price: 250.00 },
  { id: 4, name: "Revisão Geral", description: "Revisão completa do veículo", category: "Manutenção", duration: 120, price: 350.00 },
  { id: 5, name: "Troca de Correia Dentada", description: "Substituição da correia dentada do motor", category: "Motor", duration: 90, price: 420.00 },
];

const Services = () => {
  const [services, setServices] = useState(mockProfessionalServices);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Manutenção":
        return "bg-blue-100 text-blue-800";
      case "Suspensão":
        return "bg-purple-100 text-purple-800";
      case "Freios":
        return "bg-red-100 text-red-800";
      case "Motor":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleServiceAdded = () => {
    setIsFormOpen(false);
    // Em uma aplicação real, isso atualizaria a lista via API
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Serviços</h2>
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Buscar serviço..."
            className="w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Serviço
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Novo Serviço</DialogTitle>
              </DialogHeader>
              <ServiceForm onSuccess={handleServiceAdded} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Duração (min)</TableHead>
            <TableHead>Preço (R$)</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredServices.map((service) => (
            <TableRow key={service.id}>
              <TableCell className="font-medium">{service.name}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(service.category)}`}>
                  {service.category}
                </span>
              </TableCell>
              <TableCell>{service.description}</TableCell>
              <TableCell>{service.duration}</TableCell>
              <TableCell>R$ {service.price.toFixed(2)}</TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" size="sm">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Componente de formulário para criar/editar serviços
const ServiceForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    duration: "",
    price: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Novo serviço:", formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nome do Serviço</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="category">Categoria</Label>
        <Input
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="duration">Duração (minutos)</Label>
          <Input
            id="duration"
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="price">Preço (R$)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button type="submit">Salvar Serviço</Button>
      </div>
    </form>
  );
};

export default Services;
