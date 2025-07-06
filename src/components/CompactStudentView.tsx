
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Wifi,
  WifiOff,
  Eye,
  Zap
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
  currentCode?: string;
  issueCount?: number;
}

interface CompactStudentViewProps {
  student: Student;
  onClick?: () => void;
}

const CompactStudentView = ({ student, onClick }: CompactStudentViewProps) => {
  const getStatusColor = () => {
    if (student.progress >= 90) return "text-green-400 bg-green-900/20";
    if (student.progress >= 70) return "text-blue-400 bg-blue-900/20";
    if (student.progress >= 50) return "text-yellow-400 bg-yellow-900/20";
    return "text-red-400 bg-red-900/20";
  };

  const truncateCode = (code: string) => {
    const lines = code.split('\n').slice(0, 5);
    return lines.join('\n');
  };

  return (
    <Card 
      className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer h-full flex flex-col"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <span className="text-white font-medium">{student.name}</span>
          </div>
          <div className="flex items-center space-x-1">
            {student.isOnline ? (
              <Wifi className="h-4 w-4 text-green-400" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-400" />
            )}
            <Eye className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 flex-1 flex flex-col">
        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-slate-300">진행률</span>
            <span className={`font-semibold ${getStatusColor()}`}>{student.progress}%</span>
          </div>
          <Progress value={student.progress} className="h-2" />
        </div>

        {/* Code Preview */}
        <div className="bg-slate-900 rounded border border-slate-600 p-3 flex-1 overflow-hidden">
          <pre className="text-xs text-slate-300 font-mono leading-relaxed">
            {student.currentCode ? truncateCode(student.currentCode) : "// 코드 작성 중..."}
          </pre>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-slate-700 rounded p-2 text-center">
            <div className="text-slate-400">테스트</div>
            <div className="text-white font-semibold">{student.testsCompleted}/{student.totalTests}</div>
          </div>
          <div className="bg-slate-700 rounded p-2 text-center">
            <div className="text-slate-400">시간</div>
            <div className="text-yellow-400 font-mono text-xs">{student.timeComplexity}</div>
          </div>
          <div className="bg-slate-700 rounded p-2 text-center">
            <div className="text-slate-400">공간</div>
            <div className="text-green-400 font-mono text-xs">{student.spaceComplexity}</div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {student.testsCompleted === student.totalTests ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <Clock className="h-4 w-4 text-yellow-500" />
            )}
            <span className="text-sm text-slate-400">
              {student.testsCompleted === student.totalTests ? "완료" : "진행중"}
            </span>
          </div>
          {student.issueCount && student.issueCount > 0 && (
            <div className="flex items-center space-x-1">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <span className="text-sm text-red-400">{student.issueCount}개 이슈</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompactStudentView;
