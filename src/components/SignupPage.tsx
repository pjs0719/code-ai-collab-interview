
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, UserPlus, User, GraduationCap } from "lucide-react";

interface SignupPageProps {
  onSignup: (role: 'teacher' | 'student') => void;
}

const SignupPage = ({ onSignup }: SignupPageProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: 'student' as 'teacher' | 'student'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.password && 
        formData.password === formData.confirmPassword) {
      onSignup(formData.role);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-slate-700 rounded-full">
              <UserPlus className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center text-white">회원가입</CardTitle>
          <p className="text-center text-slate-400">
            새 계정을 만들어 CodeClass를 시작하세요
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300">이름</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="이름을 입력하세요"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">이메일</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
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
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-300">비밀번호 확인</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="비밀번호를 다시 입력하세요"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                required
              />
            </div>

            <div className="space-y-3">
              <Label className="text-slate-300">역할 선택</Label>
              <RadioGroup 
                value={formData.role} 
                onValueChange={(value) => handleInputChange('role', value)}
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
              disabled={!formData.name || !formData.email || !formData.password || 
                       formData.password !== formData.confirmPassword}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              회원가입
            </Button>
          </form>

          <Separator className="bg-slate-600" />

          <div className="text-center">
            <p className="text-slate-400 text-sm">
              이미 계정이 있으신가요?{" "}
              <button 
                onClick={() => window.history.back()}
                className="text-slate-300 hover:text-white underline"
              >
                로그인
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

export default SignupPage;
