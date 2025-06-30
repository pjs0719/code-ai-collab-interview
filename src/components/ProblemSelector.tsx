
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Clock, 
  Star,
  ChevronRight,
  Tag,
  TrendingUp,
  BookOpen,
  Code2,
  Database,
  TreePine,
  Zap
} from "lucide-react";

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
  popularity: number;
  acceptance: number;
}

interface ProblemSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (problem: Problem) => void;
  currentProblem?: Problem;
}

const SAMPLE_PROBLEMS: Problem[] = [
  {
    id: 1,
    title: "Remove Duplicates",
    difficulty: "Easy",
    category: "Array",
    timeLimit: 30,
    description: "주어진 정수 배열에서 중복된 요소를 제거하는 함수를 작성하세요.",
    examples: [
      {
        input: "arr = [1,2,2,3,4,4,5]",
        output: "[1,2,3,4,5]",
        explanation: "중복된 요소들을 제거하고 고유한 값들만 반환합니다."
      }
    ],
    constraints: [
      "1 ≤ arr.length ≤ 10⁴",
      "-10³ ≤ arr[i] ≤ 10³",
      "순서는 유지되어야 합니다"
    ],
    tags: ["array", "hash-table"],
    popularity: 95,
    acceptance: 87
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    timeLimit: 25,
    description: "괄호로 이루어진 문자열이 올바른지 판단하는 함수를 작성하세요.",
    examples: [
      {
        input: 's = "()"',
        output: "true",
        explanation: "올바른 괄호 쌍입니다."
      }
    ],
    constraints: [
      "1 ≤ s.length ≤ 10⁴",
      "s는 '(', ')', '{', '}', '[', ']'로만 구성됩니다"
    ],
    tags: ["stack", "string"],
    popularity: 92,
    acceptance: 73
  },
  {
    id: 3,
    title: "Binary Tree Inorder",
    difficulty: "Medium",
    category: "Tree",
    timeLimit: 35,
    description: "이진 트리의 중위 순회 결과를 반환하는 함수를 작성하세요.",
    examples: [
      {
        input: "root = [1,null,2,3]",
        output: "[1,3,2]",
        explanation: "중위 순회: 왼쪽 → 루트 → 오른쪽"
      }
    ],
    constraints: [
      "노드의 개수는 [0, 100] 범위입니다",
      "-100 ≤ Node.val ≤ 100"
    ],
    tags: ["tree", "dfs", "binary-tree"],
    popularity: 88,
    acceptance: 65
  },
  {
    id: 4,
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Dynamic Programming",
    timeLimit: 40,
    description: "연속된 부분 배열의 최대 합을 구하는 함수를 작성하세요.",
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "[4,-1,2,1]의 합이 6으로 최대입니다."
      }
    ],
    constraints: [
      "1 ≤ nums.length ≤ 10⁵",
      "-10⁴ ≤ nums[i] ≤ 10⁴"
    ],
    tags: ["array", "dynamic-programming", "divide-and-conquer"],
    popularity: 85,
    acceptance: 49
  },
  {
    id: 5,
    title: "Merge Two Lists",
    difficulty: "Easy",
    category: "Linked List",
    timeLimit: 30,
    description: "정렬된 두 연결 리스트를 하나의 정렬된 리스트로 병합하세요.",
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]",
        explanation: "두 리스트를 병합하여 정렬된 리스트를 만듭니다."
      }
    ],
    constraints: [
      "두 리스트의 노드 개수는 [0, 50] 범위입니다",
      "-100 ≤ Node.val ≤ 100"
    ],
    tags: ["linked-list", "recursion"],
    popularity: 90,
    acceptance: 61
  },
  {
    id: 6,
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "Dynamic Programming",
    timeLimit: 20,
    description: "n개의 계단을 오르는 서로 다른 방법의 수를 구하세요.",
    examples: [
      {
        input: "n = 3",
        output: "3",
        explanation: "1+1+1, 1+2, 2+1의 3가지 방법이 있습니다."
      }
    ],
    constraints: [
      "1 ≤ n ≤ 45"
    ],
    tags: ["math", "dynamic-programming", "memoization"],
    popularity: 93,
    acceptance: 52
  }
];

const CATEGORIES = [
  { name: "Array", icon: Code2, count: 15 },
  { name: "String", icon: BookOpen, count: 12 },
  { name: "Tree", icon: TreePine, count: 8 },
  { name: "Dynamic Programming", icon: TrendingUp, count: 10 },
  { name: "Stack", icon: Database, count: 6 },
  { name: "Linked List", icon: Zap, count: 7 }
];

const ProblemSelector = ({ isOpen, onClose, onSelect, currentProblem }: ProblemSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popularity");

  const filteredProblems = useMemo(() => {
    let filtered = SAMPLE_PROBLEMS.filter(problem => {
      const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           problem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesDifficulty = selectedDifficulty === "all" || problem.difficulty === selectedDifficulty;
      const matchesCategory = selectedCategory === "all" || problem.category === selectedCategory;
      
      return matchesSearch && matchesDifficulty && matchesCategory;
    });

    // Sort problems
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return b.popularity - a.popularity;
        case "difficulty":
          const diffOrder = { "Easy": 1, "Medium": 2, "Hard": 3 };
          return diffOrder[a.difficulty] - diffOrder[b.difficulty];
        case "acceptance":
          return b.acceptance - a.acceptance;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedDifficulty, selectedCategory, sortBy]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleSelect = (problem: Problem) => {
    onSelect(problem);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden bg-white">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <DialogTitle className="text-xl font-bold text-gray-900">문제 선택</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="browse" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100">
            <TabsTrigger value="browse" className="data-[state=active]:bg-white">
              문제 탐색
            </TabsTrigger>
            <TabsTrigger value="categories" className="data-[state=active]:bg-white">
              카테고리별
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="flex-1 overflow-hidden">
            <div className="space-y-4 h-full flex flex-col">
              {/* Search and Filters */}
              <div className="flex flex-wrap gap-3 p-1">
                <div className="relative flex-1 min-w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="문제 제목이나 태그로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-blue-500"
                  />
                </div>
                
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="w-32 border-gray-300">
                    <SelectValue placeholder="난이도" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">모든 난이도</SelectItem>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40 border-gray-300">
                    <SelectValue placeholder="카테고리" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">모든 카테고리</SelectItem>
                    {CATEGORIES.map(category => (
                      <SelectItem key={category.name} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32 border-gray-300">
                    <SelectValue placeholder="정렬" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">인기도</SelectItem>
                    <SelectItem value="difficulty">난이도</SelectItem>
                    <SelectItem value="acceptance">정답률</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Problem List */}
              <div className="flex-1 overflow-auto space-y-2 pr-2">
                {filteredProblems.map((problem) => (
                  <Card 
                    key={problem.id} 
                    className={`cursor-pointer hover:shadow-md transition-all duration-200 border ${
                      currentProblem?.id === problem.id 
                        ? 'ring-2 ring-blue-500 border-blue-200' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleSelect(problem)}
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
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" />
                              <span>인기도 {problem.popularity}%</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3" />
                              <span>정답률 {problem.acceptance}%</span>
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
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="flex-1 overflow-hidden">
            <div className="grid grid-cols-2 gap-4 p-4">
              {CATEGORIES.map((category) => (
                <Card 
                  key={category.name}
                  className="cursor-pointer hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-gray-300"
                  onClick={() => {
                    setSelectedCategory(category.name);
                    // Switch to browse tab after selecting category
                    const browseTab = document.querySelector('[value="browse"]') as HTMLElement;
                    browseTab?.click();
                  }}
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
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ProblemSelector;
