import { Button } from "@/components/ui/button";
import { Copy, Download, Trash2, FileText } from "lucide-react";

interface ToolbarProps {
  onClear: () => void;
  onSample: () => void;
  onCopyCode: () => void;
  onDownloadSVG: () => void;
}

export function Toolbar({ onClear, onSample, onCopyCode, onDownloadSVG }: ToolbarProps) {
  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      <Button onClick={onSample} variant="outline" size="sm">
        <FileText className="h-4 w-4 mr-2" />
        Sample
      </Button>
      <Button onClick={onClear} variant="outline" size="sm">
        <Trash2 className="h-4 w-4 mr-2" />
        Clear
      </Button>
      <Button onClick={onCopyCode} variant="outline" size="sm">
        <Copy className="h-4 w-4 mr-2" />
        Copy Code
      </Button>
      <Button onClick={onDownloadSVG} variant="outline" size="sm">
        <Download className="h-4 w-4 mr-2" />
        Download SVG
      </Button>
    </div>
  );
}
