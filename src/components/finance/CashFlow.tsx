
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data
const mockCashFlowData = [
  { name: '01/05', income: 1500, expense: 1200, balance: 300 },
  { name: '02/05', income: 900, expense: 600, balance: 300 },
  { name: '03/05', income: 1200, expense: 800, balance: 400 },
  { name: '04/05', income: 500, expense: 1500, balance: -1000 },
  { name: '05/05', income: 2000, expense: 500, balance: 1500 },
  { name: '06/05', income: 1800, expense: 1200, balance: 600 },
  { name: '07/05', income: 700, expense: 500, balance: 200 },
  { name: '08/05', income: 1100, expense: 900, balance: 200 },
  { name: '09/05', income: 1400, expense: 1100, balance: 300 },
  { name: '10/05', income: 900, expense: 700, balance: 200 },
];

const monthlyData = [
  { name: 'Jan', income: 15000, expense: 12000, balance: 3000 },
  { name: 'Fev', income: 18000, expense: 14000, balance: 4000 },
  { name: 'Mar', income: 20000, expense: 16000, balance: 4000 },
  { name: 'Abr', income: 22000, expense: 18000, balance: 4000 },
  { name: 'Mai', income: 19000, expense: 16000, balance: 3000 },
  { name: 'Jun', income: 21000, expense: 17000, balance: 4000 },
];

const CashFlow = () => {
  const [period, setPeriod] = useState("daily");
  
  const data = period === "daily" ? mockCashFlowData : monthlyData;
  
  const totalIncome = data.reduce((sum, item) => sum + item.income, 0);
  const totalExpense = data.reduce((sum, item) => sum + item.expense, 0);
  const totalBalance = totalIncome - totalExpense;
  
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Fluxo de Caixa</h3>
        <div>
          <Select defaultValue="daily" onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Diário</SelectItem>
              <SelectItem value="monthly">Mensal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Entradas
            </CardTitle>
            <CardDescription>
              Total de receitas no período
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {totalIncome.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Saídas
            </CardTitle>
            <CardDescription>
              Total de despesas no período
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              R$ {totalExpense.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Saldo
            </CardTitle>
            <CardDescription>
              Diferença entre entradas e saídas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              R$ {totalBalance.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Fluxo de Caixa {period === "daily" ? "Diário" : "Mensal"}</CardTitle>
          <CardDescription>
            Visualização das entradas e saídas de recursos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
                <Legend />
                <Bar dataKey="income" name="Entradas" fill="#22c55e" />
                <Bar dataKey="expense" name="Saídas" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Saldo {period === "daily" ? "Diário" : "Mensal"}</CardTitle>
          <CardDescription>
            Diferença entre entradas e saídas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
                <Legend />
                <Bar dataKey="balance" name="Saldo" fill={totalBalance >= 0 ? "#22c55e" : "#ef4444"} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CashFlow;
