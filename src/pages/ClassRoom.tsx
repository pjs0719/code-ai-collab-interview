import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Code, 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Settings, 
  Users, 
  Brain,
  Clock,
  Play,
  Pause,
  GraduationCap,
  BookOpen,
  Grid3x3,
  Eye,
  Share,
  Monitor,
  Palette
} from "lucide-react";
import CodeEditor from "@/components/CodeEditor";
import StudentGridView from "@/components/StudentGridView";
import StudentDetailView from "@/components/StudentDetailView";
import AIAnalysis from "@/components/AIAnalysis";
import ProblemPanel from "@/components/ProblemPanel";
import ClassSummaryReport from "@/components/ClassSummaryReport";
import DrawingOverlay from "@/components/DrawingOverlay";
import CompactStudentGrid from "@/components/CompactStudentGrid";

const ClassRoom = () => {
  const { sessionId } = useParams();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "student";
  const studentName = searchParams.get("name") || "학생";
  
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isClassStarted, setIsClassStarted] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'detail'>('grid');
  const [sharedCodeMode, setSharedCodeMode] = useState<'teacher' | 'student' | null>(null);
  const [showSummaryReport, setShowSummaryReport] = useState(false);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  
  const [students] = useState([
    { id: 1, name: "김민수", isOnline: true, progress: 75, timeComplexity: "O(n²)", spaceComplexity: "O(n)", testsCompleted: 3, totalTests: 4 },
    { id: 2, name: "이영희", isOnline: true, progress: 60, timeComplexity: "O(n)", spaceComplexity: "O(1)", testsCompleted: 2, totalTests: 4 },
    { id: 3, name: "박철수", isOnline: false, progress: 45, timeComplexity: "O(n²)", spaceComplexity: "O(n)", testsCompleted: 1, totalTests: 4 },
    { id: 4, name: "정미라", isOnline: true, progress: 90, timeComplexity: "O(n)", spaceComplexity: "O(1)", testsCompleted: 4, totalTests: 4 }
  ]);

  const [currentCode, setCurrentCode] = useState(`// 문제: 배열에서 중복된 요소를 제거하는 함수를 작성하세요
function removeDuplicates(arr) {
    // 여기에 코드를 작성하세요
    
}`);

  const isTeacher = role === "teacher";

  const toggleClass = () => {
    if (isClassStarted) {
      // 수업 종료 시 리포트 표시
      setShowSummaryReport(true);
    }
    setIsClassStarted(!isClassStarted);
  };

  const selectStudent = (studentId: number) => {
    setSelectedStudent(studentId);
    setViewMode('detail');
  };

  const shareTeacherCode = () => {
    setSharedCodeMode(sharedCodeMode === 'teacher' ? null : 'teacher');
  };

  const shareStudentCode = () => {
    if (selectedStudent) {
      setSharedCodeMode(sharedCodeMode === 'student' ? null : 'student');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Code className="h-6 w-6 text-purple-400" />
                <h1 className="text-xl font-bold">CodeClass</h1>
              </div>
              <Separator orientation="vertical" className="h-6 bg-slate-600" />
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="border-slate-600 text-slate-300">
                  수업: {sessionId}
                </Badge>
                <Badge 
                  variant={isTeacher ? "default" : "secondary"}
                  className={isTeacher ? "bg-purple-600" : "bg-blue-600"}
                >
                  {isTeacher ? (
                    <>
                      <GraduationCap className="h-3 w-3 mr-1" />
                      선생님
                    </>
                  ) : (
                    <>
                      <BookOpen className="h-3 w-3 mr-1" />
                      {studentName}
                    </>
                  )}
                </Badge>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Class Controls */}
              {isTeacher && (
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={toggleClass}
                    variant={isClassStarted ? "destructive" : "default"}
                    className={isClassStarted ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
                  >
                    {isClassStarted ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        수업 종료
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        수업 시작
                      </>
                    )}
                  </Button>

                  {viewMode === 'grid' ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setViewMode('detail')}
                      className="border-slate-600"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      상세보기
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="border-slate-600"
                    >
                      <Grid3x3 className="h-4 w-4 mr-2" />
                      그리드뷰
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={shareTeacherCode}
                    className={`border-slate-600 ${sharedCodeMode === 'teacher' ? 'bg-green-600' : ''}`}
                  >
                    <Share className="h-4 w-4 mr-2" />
                    내 코드 공유
                  </Button>

                  {selectedStudent && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={shareStudentCode}
                      className={`border-slate-600 ${sharedCodeMode === 'student' ? 'bg-blue-600' : ''}`}
                    >
                      <Monitor className="h-4 w-4 mr-2" />
                      학생 코드 공유
                    </Button>
                  )}

                  {selectedStudent && viewMode === 'detail' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsDrawingMode(!isDrawingMode)}
                      className={`border-slate-600 ${isDrawingMode ? 'bg-orange-600' : ''}`}
                    >
                      <Palette className="h-4 w-4 mr-2" />
                      그림판
                    </Button>
                  )}
                </div>
              )}

              {/* Media Controls */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`border-slate-600 ${isVideoOn ? 'text-white' : 'text-red-400'}`}
                >
                  {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAudioOn(!isAudioOn)}
                  className={`border-slate-600 ${isAudioOn ? 'text-white' : 'text-red-400'}`}
                >
                  {isAudioOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="sm" className="border-slate-600">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-300">{students.filter(s => s.isOnline).length}/{students.length}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Problem */}
        <div className="w-80 border-r border-slate-700 flex flex-col">
          <ProblemPanel isTeacher={isTeacher} />
        </div>

        {/* Center Panel - Code Editor or Student Views */}
        <div className="flex-1 flex flex-col relative">
          <div className="border-b border-slate-700 px-4 py-2 bg-slate-800/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Code className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-300">
                  {isTeacher ? (
                    viewMode === 'grid' ? '학생 관리' : `${students.find(s => s.id === selectedStudent)?.name || '상세보기'}`
                  ) : 'solution.js'}
                </span>
                {isClassStarted && (
                  <Badge variant="outline" className="border-green-600 text-green-400 text-xs">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                    진행 중
                  </Badge>
                )}
                {sharedCodeMode && (
                  <Badge variant="outline" className="border-yellow-600 text-yellow-400 text-xs">
                    <Share className="h-3 w-3 mr-1" />
                    {sharedCodeMode === 'teacher' ? '선생님 코드 공유중' : '학생 코드 공유중'}
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <Clock className="h-3 w-3" />
                <span>{isClassStarted ? "25:30" : "00:00"}</span>
              </div>
            </div>
          </div>

          <div className="flex-1 relative">
            {isTeacher ? (
              viewMode === 'grid' ? (
                <CompactStudentGrid 
                  students={students}
                  onSelectStudent={selectStudent}
                />
              ) : (
                <StudentDetailView 
                  student={students.find(s => s.id === selectedStudent)}
                  onBack={() => setViewMode('grid')}
                />
              )
            ) : (
              <div className="relative h-full">
                <CodeEditor 
                  code={currentCode} 
                  onChange={setCurrentCode}
                  readOnly={!isClassStarted || sharedCodeMode === 'teacher'}
                />
                {/* 학생 화면에서 코드 공유 표시 */}
                {sharedCodeMode && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className={`${
                      sharedCodeMode === 'teacher' ? 'bg-green-600' : 'bg-blue-600'
                    } animate-pulse`}>
                      <Share className="h-3 w-3 mr-1" />
                      {sharedCodeMode === 'teacher' ? '선생님 화면 공유중' : '내 화면 공유중'}
                    </Badge>
                  </div>
                )}
              </div>
            )}

            {/* Drawing Overlay */}
            <DrawingOverlay 
              isActive={isDrawingMode} 
              onClose={() => setIsDrawingMode(false)} 
            />
          </div>
        </div>

        {/* Right Panel - AI Analysis or Teacher Code Editor */}
        <div className="w-80 border-l border-slate-700">
          {isTeacher ? (
            <div className="h-full flex flex-col">
              <div className="border-b border-slate-700 px-4 py-2 bg-slate-800/30">
                <div className="flex items-center space-x-2">
                  <GraduationCap className="h-4 w-4 text-purple-400" />
                  <span className="text-sm text-slate-300">선생님 에디터</span>
                </div>
              </div>
              <div className="flex-1">
                <CodeEditor 
                  code={currentCode} 
                  onChange={setCurrentCode}
                  readOnly={false}
                />
              </div>
            </div>
          ) : (
            <AIAnalysis code={currentCode} isActive={isClassStarted} />
          )}
        </div>
      </div>

      {/* Class Summary Report Modal */}
      {showSummaryReport && (
        <ClassSummaryReport
          students={students.map(s => ({ ...s, codeQuality: 85, timeSpent: "15:30" }))}
          onClose={() => setShowSummaryReport(false)}
        />
      )}
    </div>
  );
};

export default ClassRoom;
