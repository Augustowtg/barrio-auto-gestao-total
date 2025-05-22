
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";

// Mock data - in a real app this would come from an API
const mockVehicles = [
  { 
    id: "1", 
    plate: "ABC1234", 
    make: "Toyota", 
    model: "Corolla", 
    year: 2019, 
    color: "Prata",
    owner: "Carlos Silva",
    phone: "(11) 98765-4321",
    services: [
      { id: 1, date: "2023-05-15", type: "Revisão", description: "Troca de óleo e filtros", cost: 320.00, mileage: 45000 },
      { id: 2, date: "2023-03-10", type: "Reparo", description: "Substituição de amortecedores dianteiros", cost: 850.00, mileage: 43500 },
      { id: 3, date: "2023-01-22", type: "Manutenção", description: "Troca de pastilhas de freio", cost: 250.00, mileage: 42000 },
      { id: 4, date: "2022-11-05", type: "Revisão", description: "Revisão completa + alinhamento", cost: 520.00, mileage: 40000 },
    ],
    parts: [
      { id: 1, name: "Amortecedor dianteiro direito", date: "2023-03-10", warranty: "12 meses", cost: 320.00 },
      { id: 2, name: "Amortecedor dianteiro esquerdo", date: "2023-03-10", warranty: "12 meses", cost: 320.00 },
      { id: 3, name: "Pastilhas de freio", date: "2023-01-22", warranty: "6 meses", cost: 150.00 },
      { id: 4, name: "Filtro de óleo", date: "2023-05-15", warranty: "3 meses", cost: 35.00 },
      { id: 5, name: "Óleo 5W30 (4L)", date: "2023-05-15", warranty: "N/A", cost: 180.00 },
    ]
  },
];

const VehicleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Find the vehicle with the matching ID
  const vehicle = mockVehicles.find(v => v.id === id);
  
  if (!vehicle) {
    return (
      <div className="p-6 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-4">Veículo não encontrado</h2>
        <Button asChild>
          <Link to="/vehicles">Voltar para Lista de Veículos</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center gap-3">
            <Link to="/vehicles" className="text-muted-foreground hover:text-primary">
              Veículos
            </Link>
            <span className="text-muted-foreground">/</span>
            <h1 className="text-2xl font-bold">{vehicle.make} {vehicle.model}</h1>
            <Badge className="ml-2">{vehicle.plate}</Badge>
          </div>
          <p className="text-muted-foreground mt-1">
            {vehicle.year} • {vehicle.color} • Proprietário: {vehicle.owner}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Editar Veículo</Button>
          <Button>Novo Serviço</Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="services">Histórico de Serviços</TabsTrigger>
          <TabsTrigger value="parts">Peças Instaladas</TabsTrigger>
          <TabsTrigger value="notes">Anotações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Veículo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-sm text-muted-foreground">Marca:</div>
                  <div>{vehicle.make}</div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-sm text-muted-foreground">Modelo:</div>
                  <div>{vehicle.model}</div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-sm text-muted-foreground">Ano:</div>
                  <div>{vehicle.year}</div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-sm text-muted-foreground">Placa:</div>
                  <div>{vehicle.plate}</div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-sm text-muted-foreground">Cor:</div>
                  <div>{vehicle.color}</div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-sm text-muted-foreground">Última Quilometragem:</div>
                  <div>{vehicle.services[0]?.mileage.toLocaleString()} km</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Informações do Cliente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-sm text-muted-foreground">Nome:</div>
                  <div>{vehicle.owner}</div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-sm text-muted-foreground">Telefone:</div>
                  <div>{vehicle.phone}</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Últimas Manutenções</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {vehicle.services.slice(0, 3).map((service) => (
                    <div key={service.id} className="border-b pb-2 last:border-0 last:pb-0">
                      <div className="flex justify-between">
                        <span className="font-medium">{service.type}</span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(service.date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <div className="text-sm">{service.description}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Histórico Completo de Serviços</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Quilometragem</TableHead>
                    <TableHead>Valor (R$)</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vehicle.services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>{new Date(service.date).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>{service.type}</TableCell>
                      <TableCell>{service.description}</TableCell>
                      <TableCell>{service.mileage.toLocaleString()} km</TableCell>
                      <TableCell>{service.cost.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">Detalhes</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="parts">
          <Card>
            <CardHeader>
              <CardTitle>Peças Instaladas</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Peça</TableHead>
                    <TableHead>Data de Instalação</TableHead>
                    <TableHead>Garantia</TableHead>
                    <TableHead>Valor (R$)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vehicle.parts.map((part) => (
                    <TableRow key={part.id}>
                      <TableCell>{part.name}</TableCell>
                      <TableCell>{new Date(part.date).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>{part.warranty}</TableCell>
                      <TableCell>{part.cost.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Anotações</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea 
                className="w-full h-48 p-4 border rounded-md" 
                placeholder="Adicionar anotações sobre o veículo..."
              ></textarea>
              <div className="mt-4 flex justify-end">
                <Button>Salvar Anotações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VehicleDetails;
