
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Clock, 
  Database,
  CheckCircle,
  XCircle,
  Wifi,
  WifiOff
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
  onSelectStudent: (student: Student) => void;
}

const StudentGridView = ({ onSelectStudent }: StudentGridViewProps) => {
  const [students] = useState<Student[]>([
    {
      id: 1,
      name: "김민수",
      isOnline: true,
      progress: 75,
      timeComplexity: "O(n²)",
      spaceComplexity: "O(n)",
      testsCompleted: 3,
      totalTests: 5,
    },
    {
      id: 2,
      name: "이지은",
      isOnline: true,
      progress: 90,
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(1)",
      testsCompleted: 4,
      totalTests: 5,
    },
    {
      id: 3,
      name: "박준호",
      isOnline: false,
      progress: 45,
      timeComplexity: "O(n³)",
      spaceComplexity: "O(n²)",
      testsCompleted: 2,
      totalTests: 5,
    },
    {
      id: 4,
      name: "최유진",
      isOnline: true,
      progress: 60,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      testsCompleted: 3,
      totalTests: 5,
    },
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {students.map((student) => (
        <Card 
          key={student.id} 
          className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer"
          onClick={() => onSelectStudent(student)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-white font-medium">{student.name}</span>
              </div>
              {student.isOnline ? (
                <Badge variant="secondary" className="bg-green-600 text-white">
                  <Wifi className="h-3 w-3 mr-1" />
                  온라인
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-gray-600 text-white">
                  <WifiOff className="h-3 w-3 mr-1" />
                  오프라인
                </Badge>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm text-slate-300 mb-1">
                  <span>진행률</span>
                  <span>{student.progress}%</span>
                </div>
                <Progress value={student.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-700 rounded p-2">
                  <div className="flex items-center space-x-1 text-slate-400 mb-1">
                    <Clock className="h-3 w-3" />
                    <span>시간</span>
                  </div>
                  <span className="text-white font-mono">{student.timeComplexity}</span>
                </div>
                <div className="bg-slate-700 rounded p-2">
                  <div className="flex items-center space-x-1 text-slate-400 mb-1">
                    <Database className="h-3 w-3" />
                    <span>공간</span>
                  </div>
                  <span className="text-white font-mono">{student.spaceComplexity}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">테스트</span>
                <div className="flex items-center space-x-1">
                  {student.testsCompleted === student.totalTests ? (
                    <CheckCircle className="h-3 w-3 text-green-500" />
                  ) : (
                    <XCircle className="h-3 w-3 text-red-500" />
                  )}
                  <span className="text-white">
                    {student.testsCompleted}/{student.totalTests}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StudentGridView;
