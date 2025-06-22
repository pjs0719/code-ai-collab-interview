
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Code, Users, Brain, Video, Timer, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [sessionId, setSessionId] = useState("");
  const navigate = useNavigate();

  const handleCreateSession = () => {
    const newSessionId = `session-${Date.now()}`;
    navigate(`/interview/${newSessionId}?role=interviewer`);
  };

  const handleJoinSession = () => {
    if (sessionId.trim()) {
      navigate(`/interview/${sessionId}?role=candidate`);
    }
  };

  const features = [
    {
      icon: Code,
      title: "실시간 코드 에디터",
      description: "동기화된 코드 편집 환경에서 함께 문제를 해결하세요"
    },
    {
      icon: Brain,
      title: "AI 기반 분석",
      description: "실시간으로 코드 효율성을 분석하고 개선점을 제안합니다"
    },
    {
      icon: Video,
      title: "화상 인터뷰",
      description: "고품질 화상통화로 자연스러운 면접 환경을 제공합니다"
    },
    {
      icon: Timer,
      title: "성능 측정",
      description: "알고리즘 복잡도와 실행 시간을 실시간으로 측정합니다"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">CodeInterview</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                <Brain className="h-3 w-3 mr-1" />
                AI 기반
              </Badge>
              <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-500/30">
                <Users className="h-3 w-3 mr-1" />
                실시간 협업
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
            차세대 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">AI 기반</span><br />
            코딩 인터뷰 플랫폼
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            실시간 코드 협업과 AI 분석으로 더 정확하고 효율적인 기술 면접을 진행하세요.
            면접관에게는 실시간 힌트를, 지원자에게는 최적의 환경을 제공합니다.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20 max-w-4xl mx-auto">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto p-3 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full w-fit mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-white text-2xl">면접관으로 시작</CardTitle>
              <CardDescription className="text-slate-300">
                새로운 인터뷰 세션을 생성하고 지원자를 초대하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                onClick={handleCreateSession}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 text-lg"
              >
                인터뷰 세션 생성
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full w-fit mb-4">
                <Code className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-white text-2xl">지원자로 참여</CardTitle>
              <CardDescription className="text-slate-300">
                세션 ID를 입력하여 인터뷰에 참여하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="세션 ID 입력 (예: session-1234567890)"
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
              />
              <Button 
                onClick={handleJoinSession}
                disabled={!sessionId.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 text-lg disabled:opacity-50"
              >
                세션 참여
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto p-2 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg w-fit mb-3">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 text-sm text-center">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-8">신뢰받는 플랫폼</h3>
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">1000+</div>
              <div className="text-slate-300">진행된 인터뷰</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">95%</div>
              <div className="text-slate-300">만족도</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-slate-300">서비스 운영</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-400">© 2024 CodeInterview. AI 기반 실시간 코딩 인터뷰 플랫폼</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
