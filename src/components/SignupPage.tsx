
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, UserPlus, User, GraduationCap, Sparkles, Rocket } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white border-gray-200 shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-emerald-600 rounded-2xl shadow-lg">
              <UserPlus className="h-7 w-7 text-white" />
            </div>
          </div>
          <div className="flex items-center justify-center mb-2">
            <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-100 rounded-full border border-emerald-200">
              <Rocket className="h-3 w-3 text-emerald-600" />
              <span className="text-emerald-600 text-xs font-medium">Join CodeClass</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">회원가입</CardTitle>
          <p className="text-gray-600">
            새 계정을 만들어 CodeClass를 시작하세요
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-medium">이름</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="이름을 입력하세요"
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-emerald-500 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">이메일</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="name@example.com"
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-emerald-500 transition-colors"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">비밀번호</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-emerald-500 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">비밀번호 확인</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="비밀번호를 다시 입력하세요"
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-emerald-500 transition-colors"
                required
              />
            </div>

            <div className="space-y-3">
              <Label className="text-gray-700 font-medium">역할 선택</Label>
              <RadioGroup 
                value={formData.role} 
                onValueChange={(value) => handleInputChange('role', value)}
                className="grid grid-cols-2 gap-3"
              >
                <div className="flex items-center space-x-2 p-4 border border-gray-300 rounded-xl bg-gray-50 hover:bg-emerald-50 hover:border-emerald-300 transition-colors">
                  <RadioGroupItem value="student" id="student" className="border-emerald-600 text-emerald-600" />
                  <Label htmlFor="student" className="flex items-center space-x-2 text-gray-700 cursor-pointer font-medium">
                    <User className="h-4 w-4" />
                    <span>학생</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border border-gray-300 rounded-xl bg-gray-50 hover:bg-emerald-50 hover:border-emerald-300 transition-colors">
                  <RadioGroupItem value="teacher" id="teacher" className="border-emerald-600 text-emerald-600" />
                  <Label htmlFor="teacher" className="flex items-center space-x-2 text-gray-700 cursor-pointer font-medium">
                    <GraduationCap className="h-4 w-4" />
                    <span>선생님</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 shadow-lg transition-all"
              disabled={!formData.name || !formData.email || !formData.password || 
                       formData.password !== formData.confirmPassword}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              회원가입
            </Button>
          </form>

          <Separator className="bg-gray-200" />

          <div className="text-center">
            <p className="text-gray-600 text-sm">
              이미 계정이 있으신가요?{" "}
              <button 
                onClick={() => window.history.back()}
                className="text-emerald-600 hover:text-emerald-800 underline font-medium transition-colors"
              >
                로그인
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

export default SignupPage;
