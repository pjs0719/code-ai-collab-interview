
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  X, 
  Save,
  Play,
  Trash2
} from "lucide-react";

interface TestCase {
  input: string;
  output: string;
  explanation?: string;
}

interface ProblemCreatorProps {
  onClose: () => void;
  onSave: (problem: any) => void;
}

const ProblemCreator = ({ onClose, onSave }: ProblemCreatorProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [category, setCategory] = useState("");
  const [timeLimit, setTimeLimit] = useState(30);
  const [testCases, setTestCases] = useState<TestCase[]>([
    { input: "", output: "", explanation: "" }
  ]);

  const addTestCase = () => {
    setTestCases([...testCases, { input: "", output: "", explanation: "" }]);
  };

  const removeTestCase = (index: number) => {
    setTestCases(testCases.filter((_, i) => i !== index));
  };

  const updateTestCase = (index: number, field: keyof TestCase, value: string) => {
    const updated = testCases.map((tc, i) => 
      i === index ? { ...tc, [field]: value } : tc
    );
    setTestCases(updated);
  };

  const handleSave = () => {
    const problem = {
      title,
      description,
      difficulty,
      category,
      timeLimit,
      testCases: testCases.filter(tc => tc.input && tc.output)
    };
    onSave(problem);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-6 max-w-3xl w-full mx-4 max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">문제 생성</h2>
          <Button onClick={onClose} variant="outline" className="border-slate-600">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-6">
          {/* 기본 정보 */}
          <Card className="bg-slate-700 border-slate-600">
            <CardHeader>
              <CardTitle className="text-white text-lg">기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">문제 제목</Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-slate-800 border-slate-600 text-white"
                    placeholder="예: Two Sum"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">카테고리</Label>
                  <Input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-slate-800 border-slate-600 text-white"
                    placeholder="예: Array, Hash Table"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">난이도</Label>
                  <div className="flex space-x-2 mt-2">
                    {['Easy', 'Medium', 'Hard'].map((level) => (
                      <Button
                        key={level}
                        variant={difficulty === level ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDifficulty(level)}
                        className="border-slate-600"
                      >
                        {level}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-slate-300">제한시간 (분)</Label>
                  <Input
                    type="number"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(Number(e.target.value))}
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                </div>
              </div>

              <div>
                <Label className="text-slate-300">문제 설명</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-slate-800 border-slate-600 text-white h-24"
                  placeholder="문제에 대한 자세한 설명을 입력하세요..."
                />
              </div>
            </CardContent>
          </Card>

          {/* 테스트 케이스 */}
          <Card className="bg-slate-700 border-slate-600">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-lg">테스트 케이스</CardTitle>
                <Button onClick={addTestCase} size="sm" className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-1" />
                  추가
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {testCases.map((testCase, index) => (
                <div key={index} className="bg-slate-800 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="border-slate-600 text-slate-300">
                      Test Case {index + 1}
                    </Badge>
                    {testCases.length > 1 && (
                      <Button
                        onClick={() => removeTestCase(index)}
                        size="sm"
                        variant="outline"
                        className="border-red-600 text-red-400 hover:bg-red-600"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-300 text-sm">입력</Label>
                      <Textarea
                        value={testCase.input}
                        onChange={(e) => updateTestCase(index, 'input', e.target.value)}
                        className="bg-slate-900 border-slate-600 text-white h-20 font-mono text-sm"
                        placeholder="예: nums = [2,7,11,15], target = 9"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300 text-sm">출력</Label>
                      <Textarea
                        value={testCase.output}
                        onChange={(e) => updateTestCase(index, 'output', e.target.value)}
                        className="bg-slate-900 border-slate-600 text-white h-20 font-mono text-sm"
                        placeholder="예: [0,1]"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <Label className="text-slate-300 text-sm">설명 (선택사항)</Label>
                    <Input
                      value={testCase.explanation || ""}
                      onChange={(e) => updateTestCase(index, 'explanation', e.target.value)}
                      className="bg-slate-900 border-slate-600 text-white"
                      placeholder="테스트 케이스에 대한 설명..."
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 저장 버튼 */}
          <div className="flex justify-end space-x-2">
            <Button onClick={onClose} variant="outline" className="border-slate-600">
              취소
            </Button>
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              문제 저장
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemCreator;
