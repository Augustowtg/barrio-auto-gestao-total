
import { Car, DollarSign, Package, Users } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard 
          title="Veículos Ativos"
          value="38"
          icon={Car}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard 
          title="Itens em Estoque"
          value="254"
          icon={Package}
          description="14 itens abaixo do mínimo"
        />
        <StatsCard 
          title="Total de Despesas"
          value="R$ 12.450,00"
          icon={DollarSign}
          trend={{ value: 8, isPositive: false }}
        />
        <StatsCard 
          title="Clientes"
          value="107"
          icon={Users}
          trend={{ value: 5, isPositive: true }}
        />
      </div>
      
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 mb-8">
        <Card className="p-5">
          <h2 className="text-xl font-bold mb-4">Serviços Recentes</h2>
          <div className="space-y-3">
            {[
              { client: "Carlos Silva", vehicle: "Toyota Corolla (ABC1234)", service: "Troca de óleo e filtros", date: "21/05/2023" },
              { client: "Ana Oliveira", vehicle: "Honda Civic (DEF5678)", service: "Reparo na suspensão", date: "22/05/2023" },
              { client: "Roberto Santos", vehicle: "Fiat Uno (GHI9012)", service: "Troca de pastilhas de freio", date: "23/05/2023" },
              { client: "Maria Souza", vehicle: "Volkswagen Gol (JKL3456)", service: "Diagnóstico elétrico", date: "24/05/2023" },
            ].map((item, i) => (
              <div key={i} className="p-3 border rounded-md hover:bg-muted/50">
                <div className="flex justify-between">
                  <span className="font-medium">{item.client}</span>
                  <span className="text-sm text-muted-foreground">{item.date}</span>
                </div>
                <div className="text-sm text-muted-foreground">{item.vehicle}</div>
                <div className="text-sm mt-1">{item.service}</div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card className="p-5">
          <h2 className="text-xl font-bold mb-4">Estoque Crítico</h2>
          <div className="space-y-3">
            {[
              { name: "Pastilha de Freio", category: "Freios", quantity: 2, minQuantity: 10 },
              { name: "Filtro de Ar", category: "Filtros", quantity: 3, minQuantity: 10 },
              { name: "Lâmpada de Farol", category: "Elétrica", quantity: 5, minQuantity: 15 },
              { name: "Fluido de Freio", category: "Lubrificantes", quantity: 1, minQuantity: 8 },
            ].map((item, i) => (
              <div key={i} className="p-3 border rounded-md hover:bg-muted/50">
                <div className="flex justify-between">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-destructive font-medium">
                    {item.quantity} / {item.minQuantity}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">{item.category}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      <Card className="p-5">
        <h2 className="text-xl font-bold mb-4">Serviços Agendados</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="pb-3 font-medium">Data</th>
                <th className="pb-3 font-medium">Hora</th>
                <th className="pb-3 font-medium">Cliente</th>
                <th className="pb-3 font-medium">Veículo</th>
                <th className="pb-3 font-medium">Serviço</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: "25/05/2023", time: "09:00", client: "João Ferreira", vehicle: "Chevrolet Onix (MNO7890)", service: "Revisão completa", status: "Confirmado" },
                { date: "25/05/2023", time: "11:30", client: "Sandra Lima", vehicle: "Hyundai HB20 (PQR1234)", service: "Troca de pneus", status: "Aguardando" },
                { date: "26/05/2023", time: "14:00", client: "Eduardo Costa", vehicle: "Renault Sandero (STU5678)", service: "Alinhamento e balanceamento", status: "Confirmado" },
                { date: "26/05/2023", time: "16:30", client: "Patrícia Alves", vehicle: "Ford Ka (VWX9012)", service: "Diagnóstico de motor", status: "Confirmado" },
              ].map((item, i) => (
                <tr key={i} className="border-b last:border-b-0">
                  <td className="py-3">{item.date}</td>
                  <td>{item.time}</td>
                  <td>{item.client}</td>
                  <td>{item.vehicle}</td>
                  <td>{item.service}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.status === "Confirmado" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Index;
