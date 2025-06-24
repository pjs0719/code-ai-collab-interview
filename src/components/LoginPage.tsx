
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, LogIn, User, GraduationCap, Sparkles } from "lucide-react";

interface LoginPageProps {
  onLogin: (role: 'teacher' | 'student') => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<'teacher' | 'student'>('student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(role);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white border-gray-200 shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-blue-600 rounded-2xl shadow-lg">
              <LogIn className="h-7 w-7 text-white" />
            </div>
          </div>
          <div className="flex items-center justify-center mb-2">
            <div className="flex items-center space-x-2 px-3 py-1 bg-blue-100 rounded-full border border-blue-200">
              <Sparkles className="h-3 w-3 text-blue-600" />
              <span className="text-blue-600 text-xs font-medium">Welcome Back</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">로그인</CardTitle>
          <p className="text-gray-600">
            계정에 로그인하여 CodeClass를 시작하세요
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">이메일</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">비밀번호</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <div className="space-y-3">
              <Label className="text-gray-700 font-medium">역할 선택</Label>
              <RadioGroup 
                value={role} 
                onValueChange={(value) => setRole(value as 'teacher' | 'student')}
                className="grid grid-cols-2 gap-3"
              >
                <div className="flex items-center space-x-2 p-4 border border-gray-300 rounded-xl bg-gray-50 hover:bg-blue-50 hover:border-blue-300 transition-colors">
                  <RadioGroupItem value="student" id="student" className="border-blue-600 text-blue-600" />
                  <Label htmlFor="student" className="flex items-center space-x-2 text-gray-700 cursor-pointer font-medium">
                    <User className="h-4 w-4" />
                    <span>학생</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border border-gray-300 rounded-xl bg-gray-50 hover:bg-blue-50 hover:border-blue-300 transition-colors">
                  <RadioGroupItem value="teacher" id="teacher" className="border-blue-600 text-blue-600" />
                  <Label htmlFor="teacher" className="flex items-center space-x-2 text-gray-700 cursor-pointer font-medium">
                    <GraduationCap className="h-4 w-4" />
                    <span>선생님</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 shadow-lg transition-all"
              disabled={!email || !password}
            >
              <LogIn className="h-4 w-4 mr-2" />
              로그인
            </Button>
          </form>

          <Separator className="bg-gray-200" />

          <div className="text-center">
            <p className="text-gray-600 text-sm">
              계정이 없으신가요?{" "}
              <button 
                onClick={() => window.history.back()}
                className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors"
              >
                회원가입
              </button>
            </p>
          </div>

          <Button 
            variant="outline" 
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            돌아가기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
