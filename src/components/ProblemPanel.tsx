
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
  RotateCcw
} from "lucide-react";

interface ProblemPanelProps {
  isTeacher: boolean;
}

const ProblemPanel = ({ isTeacher }: ProblemPanelProps) => {
  const [selectedProblem, setSelectedProblem] = useState(0);
  
  const problems = [
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
      ]
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
      ]
    }
  ];

  const currentProblem = problems[selectedProblem];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-600 text-green-100';
      case 'Medium': return 'bg-yellow-600 text-yellow-100';
      case 'Hard': return 'bg-red-600 text-red-100';
      default: return 'bg-gray-600 text-gray-100';
    }
  };

  return (
    <div className="h-full bg-slate-800 overflow-auto">
      <Tabs defaultValue="problem" className="h-full flex flex-col">
        <div className="border-b border-slate-700 px-4 py-2">
          <TabsList className="grid w-full grid-cols-2 bg-slate-700">
            <TabsTrigger value="problem" className="text-slate-300 data-[state=active]:bg-slate-600 data-[state=active]:text-white">
              <BookOpen className="h-4 w-4 mr-2" />
              문제
            </TabsTrigger>
            <TabsTrigger value="testcases" className="text-slate-300 data-[state=active]:bg-slate-600 data-[state=active]:text-white">
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
                <Card className="bg-slate-700 border-slate-600">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-sm">수업 문제 선택</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {problems.map((problem, index) => (
                      <Button
                        key={problem.id}
                        variant={selectedProblem === index ? "default" : "outline"}
                        size="sm"
                        className="w-full justify-start text-left"
                        onClick={() => setSelectedProblem(index)}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span>{problem.title}</span>
                          <Badge className={getDifficultyColor(problem.difficulty)}>
                            {problem.difficulty}
                          </Badge>
                        </div>
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Problem Details */}
              <Card className="bg-slate-700 border-slate-600">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{currentProblem.title}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge className={getDifficultyColor(currentProblem.difficulty)}>
                        {currentProblem.difficulty}
                      </Badge>
                      <Badge variant="outline" className="border-slate-600 text-slate-300">
                        {currentProblem.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-400">
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
                    <h4 className="text-white font-semibold mb-2">문제 설명</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {currentProblem.description}
                    </p>
                  </div>

                  <Separator className="bg-slate-600" />

                  <div>
                    <h4 className="text-white font-semibold mb-3">예시</h4>
                    {currentProblem.examples.map((example, index) => (
                      <div key={index} className="bg-slate-800 p-3 rounded-lg space-y-2">
                        <div>
                          <span className="text-slate-400 text-xs">입력:</span>
                          <code className="block text-green-400 font-mono text-sm mt-1">
                            {example.input}
                          </code>
                        </div>
                        <div>
                          <span className="text-slate-400 text-xs">출력:</span>
                          <code className="block text-blue-400 font-mono text-sm mt-1">
                            {example.output}
                          </code>
                        </div>
                        <div>
                          <span className="text-slate-400 text-xs">설명:</span>
                          <p className="text-slate-300 text-sm mt-1">{example.explanation}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="bg-slate-600" />

                  <div>
                    <h4 className="text-white font-semibold mb-2">제약 조건</h4>
                    <ul className="space-y-1">
                      {currentProblem.constraints.map((constraint, index) => (
                        <li key={index} className="text-slate-300 text-sm flex items-start space-x-2">
                          <div className="w-1 h-1 rounded-full bg-slate-500 mt-2 flex-shrink-0"></div>
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
              <Card className="bg-slate-700 border-slate-600">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm flex items-center justify-between">
                    테스트 케이스
                    <Button size="sm" variant="outline" className="border-slate-600">
                      <Play className="h-3 w-3 mr-1" />
                      실행
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[1, 2, 3].map((testCase) => (
                    <div key={testCase} className="bg-slate-800 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-300 text-sm font-semibold">
                          Test Case {testCase}
                        </span>
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      </div>
                      <div className="space-y-2 text-xs">
                        <div>
                          <span className="text-slate-400">입력:</span>
                          <code className="block text-green-400 font-mono mt-1">
                            nums = [2,7,11,15], target = 9
                          </code>
                        </div>
                        <div>
                          <span className="text-slate-400">예상 출력:</span>
                          <code className="block text-blue-400 font-mono mt-1">[0,1]</code>
                        </div>
                        <div>
                          <span className="text-slate-400">실제 출력:</span>
                          <code className="block text-green-400 font-mono mt-1">[0,1]</code>
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
    </div>
  );
};

export default ProblemPanel;
