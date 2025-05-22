
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import AccountsReceivable from "./AccountsReceivable";
import AccountsPayable from "./AccountsPayable";
import CashFlow from "./CashFlow";

const FinancialControl = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock financial data for overview
  const financialOverview = {
    totalReceivable: 5280.00,
    totalPayable: 3450.00,
    currentBalance: 8750.00,
    overdueReceivables: 1200.00,
    overduePayables: 600.00,
    recentTransactions: [
      { id: 1, type: "income", description: "Pagamento OS #045", amount: 420.00, date: "2023-05-15" },
      { id: 2, type: "expense", description: "Fornecedor XYZ Peças", amount: 1250.00, date: "2023-05-14" },
      { id: 3, type: "income", description: "Pagamento OS #044", amount: 850.00, date: "2023-05-13" },
      { id: 4, type: "expense", description: "Aluguel", amount: 2000.00, date: "2023-05-10" },
    ]
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Controle Financeiro</h2>
      </div>
      
      <Tabs defaultValue="overview" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="receivable">Contas a Receber</TabsTrigger>
          <TabsTrigger value="payable">Contas a Pagar</TabsTrigger>
          <TabsTrigger value="cashflow">Fluxo de Caixa</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Saldo Atual
                </CardTitle>
                <CardDescription>
                  Saldo disponível em caixa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  R$ {financialOverview.currentBalance.toFixed(2)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  A Receber
                </CardTitle>
                <CardDescription>
                  Total de contas a receber
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  R$ {financialOverview.totalReceivable.toFixed(2)}
                </div>
                <div className="text-xs text-red-500 mt-1">
                  R$ {financialOverview.overdueReceivables.toFixed(2)} em atraso
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  A Pagar
                </CardTitle>
                <CardDescription>
                  Total de contas a pagar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  R$ {financialOverview.totalPayable.toFixed(2)}
                </div>
                <div className="text-xs text-red-500 mt-1">
                  R$ {financialOverview.overduePayables.toFixed(2)} em atraso
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Transações Recentes</CardTitle>
              <CardDescription>
                Últimas movimentações financeiras
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {financialOverview.recentTransactions.map((transaction) => (
                  <div 
                    key={transaction.id} 
                    className="flex items-center justify-between p-2 border-b last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                        <DollarSign className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium">{transaction.description}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                    <div className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-orange-600'}`}>
                      {transaction.type === 'income' ? '+' : '-'} R$ {transaction.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="receivable">
          <AccountsReceivable />
        </TabsContent>
        
        <TabsContent value="payable">
          <AccountsPayable />
        </TabsContent>
        
        <TabsContent value="cashflow">
          <CashFlow />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialControl;
