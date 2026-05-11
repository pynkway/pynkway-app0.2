import { categories, type ServiceCategory } from "@/data/listings";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  selected: ServiceCategory | "all";
  onSelect: (cat: ServiceCategory | "all") => void;
}

const CategoryFilter = ({ selected, onSelect }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onSelect(cat.value)}
          className={cn(
            "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border",
            selected === cat.value
              ? "gradient-brand text-primary-foreground border-transparent shadow-lg shadow-primary/20"
              : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
          )}
        >
          <span className="mr-1.5">{cat.icon}</span>
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
