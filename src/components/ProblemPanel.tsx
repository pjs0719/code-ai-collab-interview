
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Target, 
  Clock, 
  Star,
  CheckCircle,
  Play,
  RotateCcw,
  Plus,
  Search
} from "lucide-react";
import ProblemCreator from "./ProblemCreator";
import ProblemSelector from "./ProblemSelector";

interface ProblemPanelProps {
  isTeacher: boolean;
}

const ProblemPanel = ({ isTeacher }: ProblemPanelProps) => {
  const [showProblemCreator, setShowProblemCreator] = useState(false);
  const [showProblemSelector, setShowProblemSelector] = useState(false);
  
  const [problems, setProblems] = useState([
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
    }
  ]);

  const [currentProblem, setCurrentProblem] = useState(problems[0]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleSaveProblem = (newProblem: any) => {
    const problemWithId = {
      ...newProblem,
      id: problems.length + 1,
      examples: newProblem.testCases.map((tc: any) => ({
        input: tc.input,
        output: tc.output,
        explanation: tc.explanation || ""
      })),
      constraints: ["새로 생성된 문제입니다."],
      tags: ["custom"],
      popularity: 0,
      acceptance: 0
    };
    setProblems([...problems, problemWithId]);
  };

  const handleSelectProblem = (problem: any) => {
    setCurrentProblem(problem);
    // Add to problems list if not already there
    if (!problems.find(p => p.id === problem.id)) {
      setProblems([...problems, problem]);
    }
  };

  return (
    <div className="h-full bg-white border-r border-gray-200 overflow-auto">
      <Tabs defaultValue="problem" className="h-full flex flex-col">
        <div className="border-b border-gray-200 px-4 py-2 bg-gray-50">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100">
            <TabsTrigger value="problem" className="text-gray-600 data-[state=active]:bg-white data-[state=active]:text-gray-900">
              <BookOpen className="h-4 w-4 mr-2" />
              문제
            </TabsTrigger>
            <TabsTrigger value="testcases" className="text-gray-600 data-[state=active]:bg-white data-[state=active]:text-gray-900">
              <Target className="h-4 w-4 mr-2" />
              테스트
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto">
          <TabsContent value="problem" className="m-0 h-full">
            <div className="p-4 space-y-4">
              {/* Problem Selector (Teacher Only) */}
              {isTeacher && (
                <Card className="bg-white border border-gray-200 shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-gray-900 text-sm">수업 문제</CardTitle>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setShowProblemSelector(true)}
                          size="sm"
                          variant="outline"
                          className="border-blue-200 text-blue-700 hover:bg-blue-50"
                        >
                          <Search className="h-4 w-4 mr-1" />
                          문제 찾기
                        </Button>
                        <Button
                          onClick={() => setShowProblemCreator(true)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          문제 생성
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              )}

              {/* Problem Details */}
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-gray-900">{currentProblem.title}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge className={getDifficultyColor(currentProblem.difficulty)}>
                        {currentProblem.difficulty}
                      </Badge>
                      <Badge variant="outline" className="border-gray-300 text-gray-600">
                        {currentProblem.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{currentProblem.timeLimit}분</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3" />
                      <span>4.2 (1.2k)</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-gray-900 font-semibold mb-2">문제 설명</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {currentProblem.description}
                    </p>
                  </div>

                  <Separator className="bg-gray-200" />

                  <div>
                    <h4 className="text-gray-900 font-semibold mb-3">예시</h4>
                    {currentProblem.examples.map((example, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg space-y-2 border border-gray-200">
                        <div>
                          <span className="text-gray-500 text-xs">입력:</span>
                          <code className="block text-green-700 font-mono text-sm mt-1 bg-green-50 p-1 rounded">
                            {example.input}
                          </code>
                        </div>
                        <div>
                          <span className="text-gray-500 text-xs">출력:</span>
                          <code className="block text-blue-700 font-mono text-sm mt-1 bg-blue-50 p-1 rounded">
                            {example.output}
                          </code>
                        </div>
                        <div>
                          <span className="text-gray-500 text-xs">설명:</span>
                          <p className="text-gray-700 text-sm mt-1">{example.explanation}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="bg-gray-200" />

                  <div>
                    <h4 className="text-gray-900 font-semibold mb-2">제약 조건</h4>
                    <ul className="space-y-1">
                      {currentProblem.constraints.map((constraint, index) => (
                        <li key={index} className="text-gray-700 text-sm flex items-start space-x-2">
                          <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                          <span>{constraint}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="testcases" className="m-0 h-full">
            <div className="p-4 space-y-4">
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-gray-900 text-sm flex items-center justify-between">
                    테스트 케이스
                    <Button size="sm" variant="outline" className="border-gray-300">
                      <Play className="h-3 w-3 mr-1" />
                      실행
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[1, 2, 3].map((testCase) => (
                    <div key={testCase} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700 text-sm font-semibold">
                          Test Case {testCase}
                        </span>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="space-y-2 text-xs">
                        <div>
                          <span className="text-gray-500">입력:</span>
                          <code className="block text-green-700 font-mono mt-1 bg-green-50 p-1 rounded">
                            nums = [2,7,11,15], target = 9
                          </code>
                        </div>
                        <div>
                          <span className="text-gray-500">예상 출력:</span>
                          <code className="block text-blue-700 font-mono mt-1 bg-blue-50 p-1 rounded">[0,1]</code>
                        </div>
                        <div>
                          <span className="text-gray-500">실제 출력:</span>
                          <code className="block text-green-700 font-mono mt-1 bg-green-50 p-1 rounded">[0,1]</code>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {/* Problem Creator Modal */}
      {showProblemCreator && (
        <ProblemCreator
          onClose={() => setShowProblemCreator(false)}
          onSave={handleSaveProblem}
        />
      )}

      {/* Problem Selector Modal */}
      {showProblemSelector && (
        <ProblemSelector
          isOpen={showProblemSelector}
          onClose={() => setShowProblemSelector(false)}
          onSelect={handleSelectProblem}
          currentProblem={currentProblem}
        />
      )}
    </div>
  );
};

export default ProblemPanel;
