
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
    const lines = code.split('\n').slice(0, 4);
    return lines.join('\n');
  };

  return (
    <Card 
      className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer w-80 h-64"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <User className="h-3 w-3 text-white" />
            </div>
            <span className="text-white font-medium text-sm">{student.name}</span>
          </div>
          <div className="flex items-center space-x-1">
            {student.isOnline ? (
              <Wifi className="h-3 w-3 text-green-400" />
            ) : (
              <WifiOff className="h-3 w-3 text-red-400" />
            )}
            <Eye className="h-3 w-3 text-slate-400" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300">진행률</span>
            <span className={`font-semibold ${getStatusColor()}`}>{student.progress}%</span>
          </div>
          <Progress value={student.progress} className="h-1" />
        </div>

        {/* Code Preview */}
        <div className="bg-slate-900 rounded border border-slate-600 p-2 h-20 overflow-hidden">
          <pre className="text-xs text-slate-300 font-mono leading-tight">
            {student.currentCode ? truncateCode(student.currentCode) : "// 코드 작성 중..."}
          </pre>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-slate-700 rounded p-1.5 text-center">
            <div className="text-slate-400">테스트</div>
            <div className="text-white font-semibold">{student.testsCompleted}/{student.totalTests}</div>
          </div>
          <div className="bg-slate-700 rounded p-1.5 text-center">
            <div className="text-slate-400">시간</div>
            <div className="text-yellow-400 font-mono text-xs">{student.timeComplexity}</div>
          </div>
          <div className="bg-slate-700 rounded p-1.5 text-center">
            <div className="text-slate-400">공간</div>
            <div className="text-green-400 font-mono text-xs">{student.spaceComplexity}</div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {student.testsCompleted === student.totalTests ? (
              <CheckCircle className="h-3 w-3 text-green-500" />
            ) : (
              <Clock className="h-3 w-3 text-yellow-500" />
            )}
            <span className="text-xs text-slate-400">
              {student.testsCompleted === student.totalTests ? "완료" : "진행중"}
            </span>
          </div>
          {student.issueCount && student.issueCount > 0 && (
            <div className="flex items-center space-x-1">
              <AlertTriangle className="h-3 w-3 text-red-400" />
              <span className="text-xs text-red-400">{student.issueCount}개 이슈</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompactStudentView;
