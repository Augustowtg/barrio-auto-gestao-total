
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import VehicleForm from "./VehicleForm";

// Mock data - in a real app this would come from an API or database
const mockVehicles = [
  { id: 1, plate: "ABC1234", make: "Toyota", model: "Corolla", year: 2019, owner: "Carlos Silva", lastService: "2023-05-15" },
  { id: 2, plate: "DEF5678", make: "Honda", model: "Civic", year: 2020, owner: "Ana Oliveira", lastService: "2023-06-22" },
  { id: 3, plate: "GHI9012", make: "Fiat", model: "Uno", year: 2015, owner: "Roberto Santos", lastService: "2023-07-05" },
  { id: 4, plate: "JKL3456", make: "Volkswagen", model: "Gol", year: 2018, owner: "Maria Souza", lastService: "2023-06-10" },
  { id: 5, plate: "MNO7890", make: "Chevrolet", model: "Onix", year: 2021, owner: "João Ferreira", lastService: "2023-07-18" },
];

const VehicleList = () => {
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  
  const filteredVehicles = vehicles.filter(vehicle => 
    vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Veículos</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Buscar veículo..."
            className="px-3 py-2 border rounded-md w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={() => setShowAddForm(true)}>Novo Veículo</Button>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Placa</TableHead>
            <TableHead>Marca</TableHead>
            <TableHead>Modelo</TableHead>
            <TableHead>Ano</TableHead>
            <TableHead>Proprietário</TableHead>
            <TableHead>Último Serviço</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredVehicles.map((vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell>{vehicle.plate}</TableCell>
              <TableCell>{vehicle.make}</TableCell>
              <TableCell>{vehicle.model}</TableCell>
              <TableCell>{vehicle.year}</TableCell>
              <TableCell>{vehicle.owner}</TableCell>
              <TableCell>{new Date(vehicle.lastService).toLocaleDateString('pt-BR')}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/vehicles/${vehicle.id}`}>Ver Histórico</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <VehicleForm 
        open={showAddForm} 
        onOpenChange={setShowAddForm}
        onSuccess={() => setShowAddForm(false)}
      />
    </div>
  );
};

export default VehicleList;
