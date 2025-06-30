
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { 
  Code2,
  BookOpen,
  TreePine,
  TrendingUp,
  Database,
  Zap
} from "lucide-react";

interface Category {
  name: string;
  icon: React.ElementType;
  count: number;
}

interface CategoryGridProps {
  categories: Category[];
  onCategorySelect: (categoryName: string) => void;
}

const CategoryGrid = ({ categories, onCategorySelect }: CategoryGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {categories.map((category) => (
        <Card 
          key={category.name}
          className="cursor-pointer hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-gray-300"
          onClick={() => onCategorySelect(category.name)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                  <category.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-base text-gray-900">{category.name}</CardTitle>
                  <p className="text-sm text-gray-500">{category.count}개 문제</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default CategoryGrid;
