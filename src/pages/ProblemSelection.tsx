
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Code } from "lucide-react";
import ProblemCard from "@/components/ProblemCard";
import ProblemFilters from "@/components/ProblemFilters";
import CategoryGrid from "@/components/CategoryGrid";
import { 
  Code2,
  BookOpen,
  TreePine,
  TrendingUp,
  Database,
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
    tags: ["array", "hash-table"]
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
    tags: ["stack", "string"]
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
    tags: ["tree", "dfs", "binary-tree"]
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
    tags: ["array", "dynamic-programming", "divide-and-conquer"]
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
    tags: ["linked-list", "recursion"]
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
    tags: ["math", "dynamic-programming", "memoization"]
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

const ProblemSelection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("title");
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

  const filteredProblems = useMemo(() => {
    let filtered = SAMPLE_PROBLEMS.filter(problem => {
      const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           problem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesDifficulty = selectedDifficulty === "all" || problem.difficulty === selectedDifficulty;
      const matchesCategory = selectedCategory === "all" || problem.category === selectedCategory;
      
      return matchesSearch && matchesDifficulty && matchesCategory;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "difficulty":
          const diffOrder = { "Easy": 1, "Medium": 2, "Hard": 3 };
          return diffOrder[a.difficulty] - diffOrder[b.difficulty];
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedDifficulty, selectedCategory, sortBy]);

  const handleSelect = (problem: Problem) => {
    setSelectedProblem(problem);
  };

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  const handleConfirm = () => {
    if (selectedProblem) {
      // 선택된 문제와 함께 이전 페이지로 돌아가기
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                뒤로가기
              </Button>
              <div className="flex items-center space-x-2">
                <Code className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">문제 선택</h1>
              </div>
            </div>

            {selectedProblem && (
              <Button
                onClick={handleConfirm}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                선택 완료
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-gray-100 mb-6">
            <TabsTrigger value="browse" className="data-[state=active]:bg-white">
              문제 탐색
            </TabsTrigger>
            <TabsTrigger value="categories" className="data-[state=active]:bg-white">
              카테고리별
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            <ProblemFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedDifficulty={selectedDifficulty}
              onDifficultyChange={setSelectedDifficulty}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
              categories={CATEGORIES}
            />

            <div className="grid gap-4">
              {filteredProblems.map((problem) => (
                <ProblemCard
                  key={problem.id}
                  problem={problem}
                  isSelected={selectedProblem?.id === problem.id}
                  onClick={handleSelect}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories">
            <CategoryGrid
              categories={CATEGORIES}
              onCategorySelect={handleCategorySelect}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProblemSelection;
