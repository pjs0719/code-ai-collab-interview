
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
  LogIn,
  Sparkles,
  Rocket,
  Target
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-xl shadow-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CodeClass</h1>
                <p className="text-sm text-blue-600">실시간 코딩 수업 플랫폼</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {userRole ? (
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="border-blue-500 text-blue-600 bg-blue-50">
                    <GraduationCap className="h-3 w-3 mr-1" />
                    {userRole === 'teacher' ? '선생님' : '학생'}
                  </Badge>
                  <Button 
                    variant="outline" 
                    onClick={() => setUserRole(null)}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    로그아웃
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentView('login')}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    로그인
                  </Button>
                  <Button 
                    onClick={() => setCurrentView('signup')}
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
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
      <section className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2 px-4 py-2 bg-blue-100 rounded-full border border-blue-200">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span className="text-blue-600 text-sm font-medium">AI 기반 코딩 교육</span>
            </div>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            미래의 코딩 교육
            <span className="block text-4xl text-blue-600 mt-2">지금 시작하세요</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            AI가 실시간으로 분석하고 피드백하는 혁신적인 코딩 수업 플랫폼으로 
            더 스마트하고 효과적인 프로그래밍 교육을 경험하세요.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          {/* Teacher Card */}
          <Card className="bg-white border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 group">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-3 text-gray-900 text-xl">
                <div className="p-3 bg-blue-600 rounded-xl shadow-lg group-hover:bg-blue-700 transition-colors">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <span>선생님으로 시작</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600 text-lg leading-relaxed">
                새로운 수업을 생성하고 학생들의 성장을 돕세요. 
                AI 분석 도구로 개별 맞춤형 지도가 가능합니다.
              </p>
              <div className="flex items-center space-x-2 text-sm text-blue-600">
                <Target className="h-4 w-4" />
                <span>실시간 학생 모니터링</span>
              </div>
              <Button 
                onClick={userRole ? createClass : () => setCurrentView('login')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg shadow-lg"
              >
                <Rocket className="h-5 w-5 mr-2" />
                {userRole ? '수업 생성하기' : '로그인 후 시작'}
              </Button>
            </CardContent>
          </Card>

          {/* Student Card */}
          <Card className="bg-white border-gray-200 hover:shadow-xl hover:border-emerald-300 transition-all duration-300 group">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-3 text-gray-900 text-xl">
                <div className="p-3 bg-emerald-600 rounded-xl shadow-lg group-hover:bg-emerald-700 transition-colors">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <span>학생으로 참여</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600 text-lg leading-relaxed">
                수업 ID로 실시간 코딩 세션에 참여하고 
                AI의 도움을 받아 더 나은 코드를 작성하세요.
              </p>
              {userRole ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="classId" className="text-gray-700 text-sm font-medium">수업 ID</Label>
                    <Input
                      id="classId"
                      value={classId}
                      onChange={(e) => setClassId(e.target.value)}
                      placeholder="수업 ID를 입력하세요"
                      className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 mt-1 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="userName" className="text-gray-700 text-sm font-medium">이름</Label>
                    <Input
                      id="userName"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="이름을 입력하세요"
                      className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 mt-1 focus:border-emerald-500"
                    />
                  </div>
                  <Button 
                    onClick={joinClass}
                    disabled={!classId || !userName}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg shadow-lg disabled:opacity-50"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    수업 참여하기
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => setCurrentView('login')}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg shadow-lg"
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  로그인 후 참여
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-white border-gray-200 hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:bg-purple-700 transition-colors">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI 실시간 분석</h3>
              <p className="text-gray-600 leading-relaxed">
                학생의 코드를 실시간으로 분석하여 복잡도, 효율성, 개선점을 즉시 제공하는 스마트 피드백
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:bg-orange-700 transition-colors">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">그리드 뷰 관리</h3>
              <p className="text-gray-600 leading-relaxed">
                모든 학생의 진행 상황을 한눈에 보고 개별 지도가 가능한 직관적 인터페이스
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:bg-cyan-700 transition-colors">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">실시간 협업</h3>
              <p className="text-gray-600 leading-relaxed">
                선생님과 학생이 실시간으로 코드를 공유하고 소통할 수 있는 협업 환경
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
