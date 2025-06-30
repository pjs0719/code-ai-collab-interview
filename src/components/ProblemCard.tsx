
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ChevronRight } from "lucide-react";

interface Problem {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  timeLimit: number;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation: string;
  }>;
  constraints: string[];
  tags: string[];
}

interface ProblemCardProps {
  problem: Problem;
  isSelected?: boolean;
  onClick: (problem: Problem) => void;
}

const ProblemCard = ({ problem, isSelected, onClick }: ProblemCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card 
      className={`cursor-pointer hover:shadow-md transition-all duration-200 border ${
        isSelected 
          ? 'ring-2 ring-blue-500 border-blue-200' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => onClick(problem)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-gray-900">{problem.title}</h3>
              <Badge className={getDifficultyColor(problem.difficulty)}>
                {problem.difficulty}
              </Badge>
              <Badge variant="outline" className="border-gray-300 text-gray-600">
                {problem.category}
              </Badge>
            </div>
            
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {problem.description}
            </p>
            
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{problem.timeLimit}분</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mt-2">
              {problem.tags.slice(0, 3).map((tag) => (
                <span 
                  key={tag}
                  className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs border border-blue-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <ChevronRight className="h-5 w-5 text-gray-400 ml-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProblemCard;
