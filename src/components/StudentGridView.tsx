
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Eye,
  CheckCircle, 
  AlertCircle,
  Clock,
  Wifi,
  WifiOff,
  Activity,
  BarChart3
} from "lucide-react";

interface Student {
  id: number;
  name: string;
  isOnline: boolean;
  progress: number;
  timeComplexity: string;
  spaceComplexity: string;
  testsCompleted: number;
  totalTests: number;
}

interface StudentGridViewProps {
  students: Student[];
  onSelectStudent: (studentId: number) => void;
}

const StudentGridView = ({ students, onSelectStudent }: StudentGridViewProps) => {
  const getComplexityColor = (complexity: string) => {
    if (complexity.includes('O(1)')) return 'text-green-400';
    if (complexity.includes('O(n)') && !complexity.includes('²')) return 'text-yellow-400';
    if (complexity.includes('O(n²)') || complexity.includes('O(n³)')) return 'text-red-400';
    return 'text-blue-400';
  };

  return (
    <div className="h-full bg-slate-800 p-6 overflow-auto">
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        {students.map((student) => (
          <Card 
            key={student.id} 
            className={`bg-slate-700 border-slate-600 hover:bg-slate-600 transition-all duration-200 ${
              !student.isOnline ? 'opacity-60' : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Student Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
                      <User className="h-4 w-4 text-slate-300" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm">{student.name}</h3>
                      <div className="flex items-center space-x-1">
                        {student.isOnline ? (
                          <>
                            <Wifi className="h-3 w-3 text-green-400" />
                            <span className="text-xs text-green-400">온라인</span>
                          </>
                        ) : (
                          <>
                            <WifiOff className="h-3 w-3 text-red-400" />
                            <span className="text-xs text-red-400">오프라인</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSelectStudent(student.id)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-600"
                    disabled={!student.isOnline}
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                </div>

                {/* Progress */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">진행률</span>
                    <span className="text-white font-semibold">{student.progress}%</span>
                  </div>
                  <Progress 
                    value={student.progress} 
                    className="h-2 bg-slate-600"
                  />
                </div>

                {/* Tests */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">테스트</span>
                    <span className="text-white font-semibold">
                      {student.testsCompleted}/{student.totalTests}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Activity className="h-3 w-3 text-slate-400" />
                    <div className="flex-1 bg-slate-600 rounded-full h-1">
                      <div 
                        className={`h-1 rounded-full transition-all duration-500 ${
                          student.testsCompleted === student.totalTests ? 'bg-green-500' :
                          student.testsCompleted > 0 ? 'bg-yellow-500' : 'bg-slate-500'
                        }`}
                        style={{ width: `${(student.testsCompleted / student.totalTests) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Status Indicators */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {student.progress >= 80 ? (
                      <Badge variant="outline" className="border-green-600 text-green-400 text-xs">
                        <CheckCircle className="h-2 w-2 mr-1" />
                        진행 양호
                      </Badge>
                    ) : student.progress >= 60 ? (
                      <Badge variant="outline" className="border-yellow-600 text-yellow-400 text-xs">
                        <Clock className="h-2 w-2 mr-1" />
                        진행 중
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-red-600 text-red-400 text-xs">
                        <AlertCircle className="h-2 w-2 mr-1" />
                        도움 필요
                      </Badge>
                    )}
                  </div>
                  
                  <BarChart3 className="h-3 w-3 text-slate-400" />
                </div>

                {/* Complexity Stats */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-center">
                    <div className="text-slate-400">시간 복잡도</div>
                    <div className={`font-semibold ${getComplexityColor(student.timeComplexity)}`}>
                      {student.timeComplexity}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-slate-400">공간 복잡도</div>
                    <div className={`font-semibold ${getComplexityColor(student.spaceComplexity)}`}>
                      {student.spaceComplexity}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-4 gap-4">
        <Card className="bg-slate-700 border-slate-600">
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-green-400">
              {students.filter(s => s.isOnline).length}
            </div>
            <div className="text-xs text-slate-400">온라인 학생</div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-700 border-slate-600">
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {students.filter(s => s.progress >= 80).length}
            </div>
            <div className="text-xs text-slate-400">완료 임박</div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-700 border-slate-600">
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-blue-400">
              {Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length)}%
            </div>
            <div className="text-xs text-slate-400">평균 진행률</div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-700 border-slate-600">
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-purple-400">
              {students.filter(s => s.testsCompleted === s.totalTests).length}
            </div>
            <div className="text-xs text-slate-400">완료 학생</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentGridView;
