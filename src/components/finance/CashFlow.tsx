import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";

// Mock data for cash flow
const cashFlowData = [
  { date: "01/08", entradas: 1200, saidas: 800, saldo: 400 },
  { date: "02/08", entradas: 1500, saidas: 900, saldo: 600 },
  { date: "03/08", entradas: 800, saidas: 1100, saldo: -300 },
  { date: "04/08", entradas: 2000, saidas: 1000, saldo: 1000 },
  { date: "05/08", entradas: 1300, saidas: 700, saldo: 600 },
  { date: "06/08", entradas: 900, saidas: 1200, saldo: -300 },
  { date: "07/08", entradas: 1600, saidas: 800, saldo: 800 },
  { date: "08/08", entradas: 1100, saidas: 600, saldo: 500 },
  { date: "09/08", entradas: 1400, saidas: 1000, saldo: 400 },
  { date: "10/08", entradas: 1000, saidas: 500, saldo: 500 },
  { date: "11/08", entradas: 1700, saidas: 900, saldo: 800 },
  { date: "12/08", entradas: 1200, saidas: 700, saldo: 500 },
  { date: "13/08", entradas: 1500, saidas: 1100, saldo: 400 },
  { date: "14/08", entradas: 800, saidas: 600, saldo: 200 },
  { date: "15/08", entradas: 2100, saidas: 1000, saldo: 1100 },
  { date: "16/08", entradas: 1300, saidas: 800, saldo: 500 },
  { date: "17/08", entradas: 900, saidas: 1300, saldo: -400 },
  { date: "18/08", entradas: 1600, saidas: 700, saldo: 900 },
  { date: "19/08", entradas: 1100, saidas: 500, saldo: 600 },
  { date: "20/08", entradas: 1400, saidas: 900, saldo: 500 },
  { date: "21/08", entradas: 1000, saidas: 600, saldo: 400 },
  { date: "22/08", entradas: 1800, saidas: 1000, saldo: 800 },
  { date: "23/08", entradas: 1200, saidas: 800, saldo: 400 },
  { date: "24/08", entradas: 1500, saidas: 900, saldo: 600 },
  { date: "25/08", entradas: 800, saidas: 1100, saldo: -300 },
  { date: "26/08", entradas: 2000, saidas: 1000, saldo: 1000 },
  { date: "27/08", entradas: 1300, saidas: 700, saldo: 600 },
  { date: "28/08", entradas: 900, saidas: 1200, saldo: -300 },
  { date: "29/08", entradas: 1600, saidas: 800, saldo: 800 },
  { date: "30/08", entradas: 1100, saidas: 600, saldo: 500 },
];

const CashFlow = () => {
  // Calculate total receivables and payables
  const totalReceivables = cashFlowData.reduce((sum, item) => sum + item.entradas, 0);
  const totalPayables = cashFlowData.reduce((sum, item) => sum + item.saidas, 0);
  const balance = totalReceivables - totalPayables;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entradas do Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {totalReceivables.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saídas do Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              R$ {totalPayables.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="chart" className="w-full">
        <TabsList>
          <TabsTrigger value="chart">Gráfico</TabsTrigger>
          <TabsTrigger value="daily">Fluxo Diário</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chart">
          <Card>
            <CardHeader>
              <CardTitle>Fluxo de Caixa - Últimos 30 Dias</CardTitle>
              <CardDescription>
                Visualização das entradas e saídas ao longo do tempo
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={cashFlowData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={(value) => `R$ ${Number(value).toFixed(0)}`} />
                  <Tooltip 
                    formatter={(value: number | string) => [`R$ ${Number(value).toFixed(2)}`, '']}
                    labelFormatter={(label) => `Data: ${label}`}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="entradas" stroke="#10b981" strokeWidth={2} name="Entradas" />
                  <Line type="monotone" dataKey="saidas" stroke="#ef4444" strokeWidth={2} name="Saídas" />
                  <Line type="monotone" dataKey="saldo" stroke="#3b82f6" strokeWidth={2} name="Saldo Acumulado" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle>Resumo Diário</CardTitle>
              <CardDescription>
                Entradas e saídas por dia
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={cashFlowData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={(value) => `R$ ${Number(value).toFixed(0)}`} />
                  <Tooltip 
                    formatter={(value: number | string) => [`R$ ${Number(value).toFixed(2)}`, '']}
                    labelFormatter={(label) => `Data: ${label}`}
                  />
                  <Legend />
                  <Bar dataKey="entradas" fill="#10b981" name="Entradas" />
                  <Bar dataKey="saidas" fill="#ef4444" name="Saídas" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CashFlow;
