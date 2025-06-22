
import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  readOnly?: boolean;
}

const CodeEditor = ({ code, onChange, readOnly = false }: CodeEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      const newValue = code.substring(0, start) + '    ' + code.substring(end);
      onChange(newValue);
      
      // Move cursor
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  return (
    <div className="h-full bg-slate-900 relative">
      <textarea
        ref={textareaRef}
        value={code}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        readOnly={readOnly}
        className="w-full h-full p-4 bg-slate-900 text-white font-mono text-sm resize-none border-0 outline-none"
        style={{
          fontFamily: "'Fira Code', 'Monaco', 'Menlo', monospace",
          lineHeight: "1.5",
          tabSize: 4
        }}
        placeholder={readOnly ? "인터뷰가 시작되면 코드를 작성할 수 있습니다..." : "여기에 코드를 작성하세요..."}
      />
      
      {/* Line numbers */}
      <div className="absolute left-0 top-0 p-4 pr-2 text-slate-500 text-sm font-mono pointer-events-none select-none" style={{ lineHeight: "1.5" }}>
        {code.split('\n').map((_, index) => (
          <div key={index}>{index + 1}</div>
        ))}
      </div>
      
      {/* Syntax highlighting overlay would go here in a real implementation */}
      {readOnly && (
        <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center pointer-events-none">
          <div className="text-slate-400 text-center">
            <div className="text-lg mb-2">🔒</div>
            <div>인터뷰가 시작되기를 기다리는 중...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
