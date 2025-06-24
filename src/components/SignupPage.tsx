
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Code, 
  Mail, 
  Lock,
  User,
  GraduationCap,
  BookOpen
} from "lucide-react";

interface SignupPageProps {
  onSignup: (role: 'teacher' | 'student') => void;
}

const SignupPage = ({ onSignup }: SignupPageProps) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<'teacher' | 'student'>('student');

  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    
    // 실제 회원가입 로직은 여기에 구현
    onSignup(role);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
              <Code className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-white">CodeClass 회원가입</CardTitle>
          <p className="text-slate-400">실시간 코딩 수업 플랫폼</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* 역할 선택 */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={role === 'teacher' ? 'default' : 'outline'}
              onClick={() => setRole('teacher')}
              className={role === 'teacher' ? 'bg-purple-600 hover:bg-purple-700' : 'border-slate-600'}
            >
              <GraduationCap className="h-4 w-4 mr-2" />
              선생님
            </Button>
            <Button
              variant={role === 'student' ? 'default' : 'outline'}
              onClick={() => setRole('student')}
              className={role === 'student' ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-600'}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              학생
            </Button>
          </div>

          <Separator className="bg-slate-600" />

          {/* 회원가입 폼 */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-slate-300">이름</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white pl-10"
                  placeholder="이름을 입력하세요"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-slate-300">이메일</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white pl-10"
                  placeholder="이메일을 입력하세요"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-slate-300">비밀번호</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white pl-10"
                  placeholder="비밀번호를 입력하세요"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-slate-300">비밀번호 확인</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white pl-10"
                  placeholder="비밀번호를 다시 입력하세요"
                />
              </div>
            </div>

            <Button 
              onClick={handleSignup}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              회원가입
            </Button>
          </div>

          <div className="text-center text-sm text-slate-400">
            이미 계정이 있으신가요?{' '}
            <button className="text-purple-400 hover:text-purple-300">
              로그인
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
