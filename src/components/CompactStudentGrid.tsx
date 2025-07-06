
import CompactStudentView from "./CompactStudentView";

interface Student {
  id: number;
  name: string;
  isOnline: boolean;
  progress: number;
  timeComplexity: string;
  spaceComplexity: string;
  testsCompleted: number;
  totalTests: number;
  currentCode?: string;
  issueCount?: number;
}

interface CompactStudentGridProps {
  students: Student[];
  onSelectStudent: (studentId: number) => void;
}

const CompactStudentGrid = ({ students, onSelectStudent }: CompactStudentGridProps) => {
  // 샘플 코드 데이터 추가
  const studentsWithCode = students.map(student => ({
    ...student,
    currentCode: getStudentCode(student.id),
    issueCount: getIssueCount(student.progress)
  }));

  return (
    <div className="grid grid-cols-2 gap-4 p-6 h-full">
      {studentsWithCode.map((student) => (
        <CompactStudentView
          key={student.id}
          student={student}
          onClick={() => onSelectStudent(student.id)}
        />
      ))}
    </div>
  );
};

// 샘플 코드 생성 함수
const getStudentCode = (studentId: number) => {
  const codes = [
    `function removeDuplicates(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    let isDuplicate = false;
    for (let j = 0; j < result.length; j++) {`,
    `function removeDuplicates(arr) {
  return [...new Set(arr)];
}

// 테스트 실행중...`,
    `function removeDuplicates(arr) {
  const seen = {};
  return arr.filter(item => {
    if (seen[item]) {
      return false;`,
    `function removeDuplicates(arr) {
  return arr.filter((item, index) => 
    arr.indexOf(item) === index
  );
}`
  ];
  return codes[studentId - 1] || codes[0];
};

const getIssueCount = (progress: number) => {
  if (progress < 50) return 3;
  if (progress < 70) return 1;
  if (progress < 90) return 0;
  return 0;
};

export default CompactStudentGrid;
