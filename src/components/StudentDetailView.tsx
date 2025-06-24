
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  User, 
  Code, 
  Brain, 
  Clock, 
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Target,
  Zap,
  Activity,
  BarChart3
} from "lucide-react";
import CodeEditor from "./CodeEditor";

interface Student {
  id: number;
  name: string;
  isOnline: boolean;
  progress: number;
  codeQuality?: number;
}

interface StudentDetailViewProps {
  student?: Student;
  onBack: () => void;
}

const StudentDetailView = ({ student, onBack }: StudentDetailViewProps) => {
  const [studentCode] = useState(`function removeDuplicates(arr) {
    // 학생의 현재 코드
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        let isDuplicate = false;
        for (let j = 0; j < result.length; j++) {
            if (arr[i] === result[j]) {
                isDuplicate = true;
                break;
            }
        }
        if (!isDuplicate) {
            result.push(arr[i]);
        }
    }
    return result;
}`);

  const [codeMetrics] = useState({
    timeComplexity: "O(n²)",
    spaceComplexity: "O(n)",
    efficiency: 65,
    readability: 80,
    testsPassed: 3,
    totalTests: 4,
    linesOfCode: 12,
    cyclomatic: 3
  });

  const [suggestions] = useState([
    {
      type: "performance",
      severity: "warning",
      message: "중첩 루프로 인한 성능 이슈 - Set 또는 HashMap 사용 권장",
      line: 4
    },
    {
      type: "optimization",
      severity: "info", 
      message: "ES6 filter/includes 메서드 활용으로 코드 간소화 가능",
      line: null
    },
    {
      type: "best-practice",
      severity: "success",
      message: "변수명과 로직 구조가 명확합니다",
      line: null
    }
  ]);

  if (!student) {
    return (
      <div className="h-full bg-slate-800 flex items-center justify-center">
        <div className="text-slate-400">학생을 선택해주세요</div>
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'text-red-400 bg-red-900/20 border-red-700';
      case 'warning': return 'text-yellow-400 bg-yellow-900/20 border-yellow-700';
      case 'success': return 'text-green-400 bg-green-900/20 border-green-700';
      default: return 'text-blue-400 bg-blue-900/20 border-blue-700';
    }
  };

  return (
    <div className="h-full bg-slate-800 flex">
      {/* Left - Student Code */}
      <div className="flex-1 flex flex-col">
        <div className="border-b border-slate-700 px-4 py-2 bg-slate-800/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
                className="border-slate-600"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-300">{student.name}의 코드</span>
                <Badge 
                  variant="outline" 
                  className={student.isOnline ? "border-green-600 text-green-400" : "border-red-600 text-red-400"}
                >
                  {student.isOnline ? "온라인" : "오프라인"}
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <Clock className="h-3 w-3" />
              <span>15:42</span>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <CodeEditor 
            code={studentCode} 
            onChange={() => {}} 
            readOnly={true}
          />
        </div>
      </div>

      {/* Right - Analysis Panel */}
      <div className="w-80 border-l border-slate-700 overflow-auto">
        <Tabs defaultValue="analysis" className="h-full flex flex-col">
          <div className="border-b border-slate-700 px-4 py-2">
            <TabsList className="grid w-full grid-cols-2 bg-slate-700">
              <TabsTrigger value="analysis" className="text-slate-300 data-[state=active]:bg-slate-600 data-[state=active]:text-white">
                <Brain className="h-4 w-4 mr-2" />
                분석
              </TabsTrigger>
              <TabsTrigger value="metrics" className="text-slate-300 data-[state=active]:bg-slate-600 data-[state=active]:text-white">
                <BarChart3 className="h-4 w-4 mr-2" />
                지표
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-auto">
            <TabsContent value="analysis" className="m-0 h-full">
              <div className="p-4 space-y-4">
                {/* Progress Overview */}
                <Card className="bg-slate-700 border-slate-600">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-sm flex items-center">
                      <Activity className="h-4 w-4 mr-2 text-blue-400" />
                      진행 상황
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300">전체 진행률</span>
                        <span className="text-white font-semibold">{student.progress}%</span>
                      </div>
                      <Progress value={student.progress} className="h-2 bg-slate-600" />
                    </div>

                    {student.codeQuality && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">코드 품질</span>
                          <span className="text-white font-semibold">{student.codeQuality}/100</span>
                        </div>
                        <Progress value={student.codeQuality} className="h-2 bg-slate-600" />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3 text-xs mt-3">
                      <div className="text-center">
                        <div className="text-slate-400">테스트</div>
                        <div className="text-green-400 font-semibold">{codeMetrics.testsPassed}/{codeMetrics.totalTests}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-slate-400">소요시간</div>
                        <div className="text-white font-semibold">15:42</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Suggestions */}
                <Card className="bg-slate-700 border-slate-600">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-sm flex items-center">
                      <Target className="h-4 w-4 mr-2 text-yellow-400" />
                      AI 개선 제안
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {suggestions.map((suggestion, index) => (
                      <div 
                        key={index}
                        className={`p-3 rounded-lg border ${getSeverityColor(suggestion.severity)}`}
                      >
                        <div className="flex items-start space-x-2">
                          {suggestion.severity === 'warning' && <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                          {suggestion.severity === 'success' && <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                          {suggestion.severity === 'info' && <Zap className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                          <div className="flex-1">
                            <p className="text-sm font-medium">{suggestion.message}</p>
                            <div className="flex items-center justify-between mt-1">
                              {suggestion.line && (
                                <span className="text-xs opacity-70">Line {suggestion.line}</span>
                              )}
                              <Badge variant="outline" className="text-xs border-current">
                                {suggestion.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="metrics" className="m-0 h-full">
              <div className="p-4 space-y-4">
                {/* Complexity Analysis */}
                <Card className="bg-slate-700 border-slate-600">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-sm flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-purple-400" />
                      복잡도 분석
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-slate-400">시간 복잡도</div>
                        <div className="text-red-400 font-bold text-lg">{codeMetrics.timeComplexity}</div>
                      </div>
                      <div>
                        <div className="text-slate-400">공간 복잡도</div>
                        <div className="text-green-400 font-bold text-lg">{codeMetrics.spaceComplexity}</div>
                      </div>
                      <div>
                        <div className="text-slate-400">순환 복잡도</div>
                        <div className="text-yellow-400 font-bold text-lg">{codeMetrics.cyclomatic}</div>
                      </div>
                      <div>
                        <div className="text-slate-400">코드 라인</div>
                        <div className="text-white font-bold text-lg">{codeMetrics.linesOfCode}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quality Metrics */}
                <Card className="bg-slate-700 border-slate-600">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-sm flex items-center">
                      <BarChart3 className="h-4 w-4 mr-2 text-green-400" />
                      품질 지표
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-300">효율성</span>
                          <span className="text-white">{codeMetrics.efficiency}%</span>
                        </div>
                        <Progress value={codeMetrics.efficiency} className="h-2 bg-slate-600" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-300">가독성</span>
                          <span className="text-white">{codeMetrics.readability}%</span>
                        </div>
                        <Progress value={codeMetrics.readability} className="h-2 bg-slate-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Recommendations */}
                <Card className="bg-slate-700 border-slate-600">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-sm flex items-center">
                      <Zap className="h-4 w-4 mr-2 text-orange-400" />
                      성능 개선 방향
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-red-400"></div>
                        <span className="text-slate-300">Set 자료구조 활용으로 O(n) 달성</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                        <span className="text-slate-300">ES6 메서드로 코드 간소화</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        <span className="text-slate-300">엣지 케이스 처리 추가</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentDetailView;
