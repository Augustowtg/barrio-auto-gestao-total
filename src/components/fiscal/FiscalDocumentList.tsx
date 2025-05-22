
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, FileMinus, FilePlus } from "lucide-react";
import FiscalDocumentForm from "./FiscalDocumentForm";

// Mock data for fiscal documents
const mockNFe = [
  { id: 1, number: "001234", type: "NF-e", date: "2023-05-15", customer: "Carlos Silva", value: 420.00, status: "Emitida", items: [{ name: "Filtro de Óleo", quantity: 1, price: 35.50 }, { name: "Óleo Motor 5W30", quantity: 5, price: 45.90 }] },
  { id: 2, number: "001235", type: "NF-e", date: "2023-05-16", customer: "Maria Souza", value: 850.00, status: "Processando", items: [{ name: "Amortecedor Dianteiro", quantity: 2, price: 350.00 }, { name: "Pastilha de Freio", quantity: 1, price: 89.90 }] },
];

const mockNFCe = [
  { id: 3, number: "000123", type: "NFC-e", date: "2023-05-17", customer: "João Ferreira", value: 150.00, status: "Emitida", items: [{ name: "Vela de Ignição", quantity: 4, price: 22.90 }, { name: "Filtro de Ar", quantity: 1, price: 32.00 }] },
  { id: 4, number: "000124", type: "NFC-e", date: "2023-05-18", customer: "Ana Oliveira", value: 75.90, status: "Cancelada", items: [{ name: "Fluido de Freio DOT4", quantity: 2, price: 28.50 }] },
];

const mockNFSe = [
  { id: 5, number: "000045", type: "NFS-e", date: "2023-05-19", customer: "Roberto Santos", value: 320.00, status: "Emitida", items: [{ name: "Troca de Óleo", quantity: 1, price: 50.00 }, { name: "Revisão Completa", quantity: 1, price: 250.00 }] },
  { id: 6, number: "000046", type: "NFS-e", date: "2023-05-20", customer: "Fernanda Lima", value: 450.00, status: "Aguardando", items: [{ name: "Alinhamento e Balanceamento", quantity: 1, price: 120.00 }, { name: "Troca de Pastilhas de Freio", quantity: 1, price: 80.00 }, { name: "Diagnóstico Elétrico", quantity: 1, price: 100.00 }] },
];

const FiscalDocumentList = () => {
  const [activeTab, setActiveTab] = useState("nfe");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Get the appropriate documents based on active tab
  const getDocuments = () => {
    switch (activeTab) {
      case "nfe": return mockNFe;
      case "nfce": return mockNFCe;
      case "nfse": return mockNFSe;
      default: return [];
    }
  };
  
  const documents = getDocuments();
  
  // Filter documents based on search term
  const filteredDocuments = documents.filter(doc => 
    doc.number.includes(searchTerm) || 
    doc.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Emitida":
        return "bg-green-100 text-green-800";
      case "Processando":
        return "bg-blue-100 text-blue-800";
      case "Aguardando":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelada":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "NF-e":
        return <FileText className="h-4 w-4 mr-2" />;
      case "NFC-e":
        return <FileMinus className="h-4 w-4 mr-2" />;
      case "NFS-e":
        return <FilePlus className="h-4 w-4 mr-2" />;
      default:
        return <FileText className="h-4 w-4 mr-2" />;
    }
  };

  const handleDocumentAdded = () => {
    setIsFormOpen(false);
    // In a real app, we would fetch the updated documents from the API
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Documentos Fiscais</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Buscar documento..."
            className="px-3 py-2 border rounded-md w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button>Novo Documento Fiscal</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Novo Documento Fiscal</DialogTitle>
              </DialogHeader>
              <FiscalDocumentForm onSuccess={handleDocumentAdded} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Tabs defaultValue="nfe" className="mb-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="nfe">NF-e</TabsTrigger>
          <TabsTrigger value="nfce">NFC-e</TabsTrigger>
          <TabsTrigger value="nfse">NFS-e</TabsTrigger>
        </TabsList>
        <TabsContent value="nfe">
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Nota Fiscal Eletrônica de Produto (NF-e) - Usada para registrar vendas de produtos, como peças automotivas.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="nfce">
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Nota Fiscal de Consumidor Eletrônica (NFC-e) - Utilizada em vendas diretas ao consumidor, no ponto de venda.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="nfse">
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Nota Fiscal de Serviço Eletrônica (NFS-e) - Aplica-se à prestação de serviços mecânicos como revisões, trocas de óleo, etc.
            </p>
          </div>
        </TabsContent>
      </Tabs>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Número</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Valor (R$)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredDocuments.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell>{doc.number}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {getDocumentIcon(doc.type)}
                  {doc.type}
                </div>
              </TableCell>
              <TableCell>{new Date(doc.date).toLocaleDateString('pt-BR')}</TableCell>
              <TableCell>{doc.customer}</TableCell>
              <TableCell>{doc.value.toFixed(2)}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(doc.status)}`}>
                  {doc.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">Visualizar</Button>
                  <Button variant="outline" size="sm">DANFE</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FiscalDocumentList;
