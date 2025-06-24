
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Code, 
  Users, 
  Brain, 
  Zap,
  GraduationCap,
  BookOpen,
  UserPlus,
  Play,
  LogIn
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoginPage from "@/components/LoginPage";
import SignupPage from "@/components/SignupPage";

const Index = () => {
  const navigate = useNavigate();
  const [classId, setClassId] = useState("");
  const [userName, setUserName] = useState("");
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'signup'>('home');
  const [userRole, setUserRole] = useState<'teacher' | 'student' | null>(null);

  const handleLogin = (role: 'teacher' | 'student') => {
    setUserRole(role);
    setCurrentView('home');
  };

  const handleSignup = (role: 'teacher' | 'student') => {
    setUserRole(role);
    setCurrentView('home');
  };

  const createClass = () => {
    const sessionId = Math.random().toString(36).substring(2, 15);
    navigate(`/class/${sessionId}?role=teacher`);
  };

  const joinClass = () => {
    if (classId && userName) {
      navigate(`/class/${classId}?role=student&name=${encodeURIComponent(userName)}`);
    }
  };

  if (currentView === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (currentView === 'signup') {
    return <SignupPage onSignup={handleSignup} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">CodeClass</h1>
                <p className="text-sm text-slate-400">실시간 코딩 수업 플랫폼</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {userRole ? (
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="border-purple-500 text-purple-300">
                    <GraduationCap className="h-3 w-3 mr-1" />
                    {userRole === 'teacher' ? '선생님' : '학생'}
                  </Badge>
                  <Button 
                    variant="outline" 
                    onClick={() => setUserRole(null)}
                    className="border-slate-600 text-slate-300"
                  >
                    로그아웃
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentView('login')}
                    className="border-slate-600 text-slate-300"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    로그인
                  </Button>
                  <Button 
                    onClick={() => setCurrentView('signup')}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    회원가입
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            AI 기반 실시간
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> 코딩 수업</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            선생님과 학생들이 함께 코드를 작성하고, AI가 실시간으로 코드를 분석하여 
            개별 맞춤형 피드백을 제공하는 혁신적인 교육 플랫폼입니다.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Teacher Card */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-white">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <span>선생님으로 시작</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300">
                새로운 수업을 생성하고 학생들을 관리하세요. AI 분석 도구와 함께 효과적인 코딩 교육을 진행할 수 있습니다.
              </p>
              <Button 
                onClick={userRole ? createClass : () => setCurrentView('login')}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
              >
                <Play className="h-4 w-4 mr-2" />
                {userRole ? '수업 생성하기' : '로그인 후 시작'}
              </Button>
            </CardContent>
          </Card>

          {/* Student Card */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-white">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span>학생으로 참여</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300">
                수업 ID를 입력하여 진행 중인 코딩 수업에 참여하세요.
              </p>
              {userRole ? (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="classId" className="text-slate-300">수업 ID</Label>
                    <Input
                      id="classId"
                      value={classId}
                      onChange={(e) => setClassId(e.target.value)}
                      placeholder="수업 ID를 입력하세요"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="userName" className="text-slate-300">이름</Label>
                    <Input
                      id="userName"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="이름을 입력하세요"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <Button 
                    onClick={joinClass}
                    disabled={!classId || !userName}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    수업 참여하기
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => setCurrentView('login')}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  로그인 후 참여
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">AI 실시간 분석</h3>
              <p className="text-slate-400 text-sm">
                학생의 코드를 실시간으로 분석하여 복잡도, 효율성, 개선점을 즉시 제공
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">그리드 뷰 관리</h3>
              <p className="text-slate-400 text-sm">
                모든 학생의 진행 상황을 한눈에 보고 개별 지도 가능
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">실시간 공유</h3>
              <p className="text-slate-400 text-sm">
                선생님과 학생 코드를 실시간으로 공유하고 화면 공유 기능
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
