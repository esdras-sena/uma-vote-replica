import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  project: string;
  onProjectChange: (value: string) => void;
  oracle: string;
  onOracleChange: (value: string) => void;
}

export const SearchFilters = ({
  searchQuery,
  onSearchChange,
  project,
  onProjectChange,
  oracle,
  onOracleChange,
}: SearchFiltersProps) => {
  return (
    <div className="flex gap-4 px-6 py-6">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-11 bg-secondary border-border h-12 placeholder:text-muted-foreground"
        />
      </div>
      
      <Select value={project} onValueChange={onProjectChange}>
        <SelectTrigger className="w-40 bg-secondary border-border h-12">
          <SelectValue placeholder="Project" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Projects</SelectItem>
          <SelectItem value="eclipse">Eclipse</SelectItem>
          <SelectItem value="polymarket">Polymarket</SelectItem>
        </SelectContent>
      </Select>
      
      <Select value={oracle} onValueChange={onOracleChange}>
        <SelectTrigger className="w-44 bg-secondary border-border h-12">
          <SelectValue placeholder="All Oracles" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Oracles</SelectItem>
          <SelectItem value="optimistic">Optimistic Oracle</SelectItem>
          <SelectItem value="skinny">Skinny Oracle</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
