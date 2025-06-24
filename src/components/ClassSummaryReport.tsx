
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Download,
  Award,
  BarChart3,
  Users
} from "lucide-react";

interface Student {
  id: number;
  name: string;
  progress: number;
  testsCompleted: number;
  totalTests: number;
  timeSpent: string;
  timeComplexity: string;
  spaceComplexity: string;
  codeQuality: number;
}

interface ClassSummaryReportProps {
  students: Student[];
  onClose: () => void;
}

const ClassSummaryReport = ({ students, onClose }: ClassSummaryReportProps) => {
  const averageProgress = Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length);
  const completedStudents = students.filter(s => s.progress >= 80).length;
  const strugglingStudents = students.filter(s => s.progress < 50).length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">수업 마무리 리포트</h2>
          <div className="flex space-x-2">
            <Button variant="outline" className="border-slate-600">
              <Download className="h-4 w-4 mr-2" />
              PDF 다운로드
            </Button>
            <Button onClick={onClose} variant="outline" className="border-slate-600">
              닫기
            </Button>
          </div>
        </div>

        {/* 전체 요약 */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="bg-slate-700 border-slate-600">
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{students.length}</div>
              <div className="text-sm text-slate-400">총 참여 학생</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-700 border-slate-600">
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">{completedStudents}</div>
              <div className="text-sm text-slate-400">완료 학생</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-700 border-slate-600">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">{averageProgress}%</div>
              <div className="text-sm text-slate-400">평균 진행률</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-700 border-slate-600">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">{strugglingStudents}</div>
              <div className="text-sm text-slate-400">도움 필요</div>
            </CardContent>
          </Card>
        </div>

        {/* 학생별 상세 리포트 */}
        <Card className="bg-slate-700 border-slate-600">
          <CardHeader>
            <CardTitle className="text-white">학생별 학습 현황</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {students.map((student) => (
                <div key={student.id} className="bg-slate-800 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {student.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{student.name}</h3>
                        <div className="text-sm text-slate-400">소요시간: {student.timeSpent}</div>
                      </div>
                    </div>
                    <Badge 
                      className={
                        student.progress >= 80 ? 'bg-green-600' :
                        student.progress >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                      }
                    >
                      {student.progress >= 80 ? '완료' : student.progress >= 60 ? '진행중' : '도움필요'}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-slate-400">진행률</div>
                      <Progress value={student.progress} className="h-2 mt-1" />
                      <div className="text-white mt-1">{student.progress}%</div>
                    </div>
                    <div>
                      <div className="text-slate-400">테스트</div>
                      <div className="text-white font-semibold">
                        {student.testsCompleted}/{student.totalTests}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400">시간 복잡도</div>
                      <div className="text-white font-semibold">{student.timeComplexity}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">공간 복잡도</div>
                      <div className="text-white font-semibold">{student.spaceComplexity}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClassSummaryReport;
