
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Pencil, 
  Eraser, 
  Trash2, 
  X,
  Palette
} from "lucide-react";

interface DrawingOverlayProps {
  isActive: boolean;
  onClose: () => void;
}

const DrawingOverlay = ({ isActive, onClose }: DrawingOverlayProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState<'pen' | 'eraser'>('pen');
  const [currentColor, setCurrentColor] = useState('#ff0000');
  const [brushSize, setBrushSize] = useState(3);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 캔버스 크기를 부모 요소에 맞춤
    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, [isActive]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';

    if (currentTool === 'pen') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = currentColor;
    } else {
      ctx.globalCompositeOperation = 'destination-out';
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 z-50">
      {/* 그림판 도구 */}
      <div className="absolute top-4 left-4 bg-slate-800 rounded-lg p-3 shadow-lg border border-slate-600">
        <div className="flex items-center space-x-2 mb-3">
          <Button
            variant={currentTool === 'pen' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCurrentTool('pen')}
            className="border-slate-600"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant={currentTool === 'eraser' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCurrentTool('eraser')}
            className="border-slate-600"
          >
            <Eraser className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={clearCanvas}
            className="border-slate-600 text-red-400 hover:bg-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {currentTool === 'pen' && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Palette className="h-4 w-4 text-slate-400" />
              <input
                type="color"
                value={currentColor}
                onChange={(e) => setCurrentColor(e.target.value)}
                className="w-8 h-6 rounded border border-slate-600"
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400">크기:</span>
              <input
                type="range"
                min="1"
                max="10"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-16"
              />
              <span className="text-xs text-slate-300">{brushSize}px</span>
            </div>
          </div>
        )}
      </div>

      {/* 닫기 버튼 */}
      <div className="absolute top-4 right-4">
        <Button
          onClick={onClose}
          variant="outline"
          size="sm"
          className="border-slate-600 bg-slate-800"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* 그리기 캔버스 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
};

export default DrawingOverlay;
