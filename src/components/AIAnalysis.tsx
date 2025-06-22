
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Zap,
  Target,
  Lightbulb
} from "lucide-react";

interface AIAnalysisProps {
  code: string;
  isActive: boolean;
}

const AIAnalysis = ({ code, isActive }: AIAnalysisProps) => {
  const [analysis, setAnalysis] = useState({
    complexity: "O(n²)",
    efficiency: "중간",
    suggestions: [
      "HashMap을 사용하면 O(n) 시간 복잡도로 개선 가능",
      "변수명을 더 명확하게 작성하는 것을 권장",
      "엣지 케이스 처리 추가 필요"
    ],
    codeQuality: 75,
    progress: 45
  });

  const [hints, setHints] = useState([
    {
      id: 1,
      type: "performance",
      message: "중첩 루프로 인한 성능 이슈가 감지되었습니다",
      severity: "warning",
      timestamp: "2분 전"
    },
    {
      id: 2,
      type: "logic",
      message: "알고리즘 접근 방식이 올바른 방향입니다",
      severity: "success",
      timestamp: "5분 전"
    }
  ]);

  useEffect(() => {
    if (isActive && code.length > 0) {
      // Simulate real-time analysis
      const timer = setInterval(() => {
        // Update analysis based on code changes
        setAnalysis(prev => ({
          ...prev,
          progress: Math.min(prev.progress + Math.random() * 10, 100)
        }));
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [code, isActive]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'text-red-400 bg-red-900/20 border-red-700';
      case 'warning': return 'text-yellow-400 bg-yellow-900/20 border-yellow-700';
      case 'success': return 'text-green-400 bg-green-900/20 border-green-700';
      default: return 'text-blue-400 bg-blue-900/20 border-blue-700';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error': return AlertTriangle;
      case 'warning': return AlertTriangle;
      case 'success': return CheckCircle;
      default: return Lightbulb;
    }
  };

  return (
    <div className="h-full bg-slate-800 p-4 overflow-auto">
      <div className="space-y-4">
        {/* AI Analysis Header */}
        <Card className="bg-slate-700 border-slate-600">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Brain className="h-5 w-5 text-purple-400" />
              <span className="text-white">AI 분석</span>
              {isActive && (
                <Badge variant="outline" className="border-green-600 text-green-400 text-xs">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                  실시간
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Code Quality Metrics */}
        <Card className="bg-slate-700 border-slate-600">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-sm flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-blue-400" />
              코드 품질 지표
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">전체 점수</span>
                <span className="text-white font-semibold">{analysis.codeQuality}/100</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${analysis.codeQuality}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">진행률</span>
                <span className="text-white font-semibold">{Math.round(analysis.progress)}%</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${analysis.progress}%` }}
                ></div>
              </div>
            </div>

            <Separator className="bg-slate-600" />

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="text-center">
                <div className="text-slate-400">시간 복잡도</div>
                <div className="text-white font-semibold">{analysis.complexity}</div>
              </div>
              <div className="text-center">
                <div className="text-slate-400">효율성</div>
                <div className="text-white font-semibold">{analysis.efficiency}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real-time Hints */}
        <Card className="bg-slate-700 border-slate-600">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-sm flex items-center">
              <Lightbulb className="h-4 w-4 mr-2 text-yellow-400" />
              실시간 힌트
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {hints.map((hint) => {
              const Icon = getSeverityIcon(hint.severity);
              return (
                <div 
                  key={hint.id}
                  className={`p-3 rounded-lg border ${getSeverityColor(hint.severity)}`}
                >
                  <div className="flex items-start space-x-2">
                    <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{hint.message}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs opacity-70">{hint.timestamp}</span>
                        <Badge variant="outline" className="text-xs border-current">
                          {hint.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* AI Suggestions */}
        <Card className="bg-slate-700 border-slate-600">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-sm flex items-center">
              <Target className="h-4 w-4 mr-2 text-green-400" />
              개선 제안
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analysis.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start space-x-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                  <p className="text-slate-300">{suggestion}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="w-full border-slate-600 text-slate-300 hover:bg-slate-600">
            <Zap className="h-4 w-4 mr-2" />
            성능 분석 상세보기
          </Button>
          <Button variant="outline" size="sm" className="w-full border-slate-600 text-slate-300 hover:bg-slate-600">
            <Clock className="h-4 w-4 mr-2" />
            시간 복잡도 계산
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;
