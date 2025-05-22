
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="border-b bg-white py-3 px-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h1 className="font-bold text-xl text-primary">Auto Mechanic Pro</h1>
      </div>
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Pesquisar..." 
          className="pl-10 w-full rounded-md border border-input py-2 text-sm" 
        />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">Ajuda</Button>
        <Button size="sm">Novo Serviço</Button>
      </div>
    </nav>
  );
};

export default Navbar;
