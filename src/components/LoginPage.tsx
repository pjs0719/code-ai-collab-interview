
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, LogIn, User, GraduationCap } from "lucide-react";

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
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-slate-700 rounded-full">
              <LogIn className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center text-white">로그인</CardTitle>
          <p className="text-center text-slate-400">
            계정에 로그인하여 CodeClass를 시작하세요
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">이메일</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">비밀번호</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                required
              />
            </div>

            <div className="space-y-3">
              <Label className="text-slate-300">역할 선택</Label>
              <RadioGroup 
                value={role} 
                onValueChange={(value) => setRole(value as 'teacher' | 'student')}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2 p-3 border border-slate-600 rounded-lg bg-slate-700">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student" className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                    <User className="h-4 w-4" />
                    <span>학생</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border border-slate-600 rounded-lg bg-slate-700">
                  <RadioGroupItem value="teacher" id="teacher" />
                  <Label htmlFor="teacher" className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                    <GraduationCap className="h-4 w-4" />
                    <span>선생님</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-slate-700 hover:bg-slate-600 text-white"
              disabled={!email || !password}
            >
              <LogIn className="h-4 w-4 mr-2" />
              로그인
            </Button>
          </form>

          <Separator className="bg-slate-600" />

          <div className="text-center">
            <p className="text-slate-400 text-sm">
              계정이 없으신가요?{" "}
              <button 
                onClick={() => window.history.back()}
                className="text-slate-300 hover:text-white underline"
              >
                회원가입
              </button>
            </p>
          </div>

          <Button 
            variant="outline" 
            className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
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
