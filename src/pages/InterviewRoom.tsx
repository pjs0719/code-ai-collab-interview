
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
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Play,
  Pause
} from "lucide-react";
import CodeEditor from "@/components/CodeEditor";
import VideoCall from "@/components/VideoCall";
import AIAnalysis from "@/components/AIAnalysis";
import ProblemPanel from "@/components/ProblemPanel";

const InterviewRoom = () => {
  const { sessionId } = useParams();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "candidate";
  
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [participants, setParticipants] = useState([
    { id: 1, name: "면접관", role: "interviewer", isOnline: true },
    { id: 2, name: "지원자", role: "candidate", isOnline: true }
  ]);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [currentCode, setCurrentCode] = useState(`// 문제: 두 수의 합을 구하는 함수를 작성하세요
function twoSum(nums, target) {
    // 여기에 코드를 작성하세요
    
}`);

  const isInterviewer = role === "interviewer";

  const toggleInterview = () => {
    setIsInterviewStarted(!isInterviewStarted);
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
                <h1 className="text-xl font-bold">CodeInterview</h1>
              </div>
              <Separator orientation="vertical" className="h-6 bg-slate-600" />
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="border-slate-600 text-slate-300">
                  세션: {sessionId}
                </Badge>
                <Badge 
                  variant={isInterviewer ? "default" : "secondary"}
                  className={isInterviewer ? "bg-purple-600" : "bg-blue-600"}
                >
                  {isInterviewer ? "면접관" : "지원자"}
                </Badge>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Interview Controls */}
              {isInterviewer && (
                <Button
                  onClick={toggleInterview}
                  variant={isInterviewStarted ? "destructive" : "default"}
                  className={isInterviewStarted ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
                >
                  {isInterviewStarted ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      인터뷰 종료
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      인터뷰 시작
                    </>
                  )}
                </Button>
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

              {/* Participants */}
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-300">{participants.length}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Problem & Video */}
        <div className="w-80 border-r border-slate-700 flex flex-col">
          {/* Video Call */}
          <div className="h-64 border-b border-slate-700">
            <VideoCall 
              participants={participants}
              isVideoOn={isVideoOn}
              isAudioOn={isAudioOn}
            />
          </div>

          {/* Problem Panel */}
          <div className="flex-1 overflow-auto">
            <ProblemPanel isInterviewer={isInterviewer} />
          </div>
        </div>

        {/* Center Panel - Code Editor */}
        <div className="flex-1 flex flex-col">
          <div className="border-b border-slate-700 px-4 py-2 bg-slate-800/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Code className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-300">solution.js</span>
                {isInterviewStarted && (
                  <Badge variant="outline" className="border-green-600 text-green-400 text-xs">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                    진행 중
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <Clock className="h-3 w-3" />
                <span>{isInterviewStarted ? "15:30" : "00:00"}</span>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <CodeEditor 
              code={currentCode} 
              onChange={setCurrentCode}
              readOnly={!isInterviewStarted}
            />
          </div>
        </div>

        {/* Right Panel - AI Analysis (Only for Interviewer) */}
        {isInterviewer && (
          <div className="w-80 border-l border-slate-700">
            <AIAnalysis code={currentCode} isActive={isInterviewStarted} />
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewRoom;
