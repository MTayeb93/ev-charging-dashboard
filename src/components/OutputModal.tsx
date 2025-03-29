import { FC, useEffect, useState } from "react";
import { X, Printer, Download } from "lucide-react";
import OutputCharts from "./OutputCharts";

type OutputModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const OutputModal: FC<OutputModalProps> = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div
        className={`relative bg-white w-full max-w-6xl h-[90vh] rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 ease-out ${
          show ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-100">
          <h2 className="text-xl font-semibold">Simulation Report</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 hover:bg-gray-200 rounded"
              title="Print"
            >
              <Printer className="w-5 h-5 text-gray-600 cursor-pointer" />
            </button>
            <button
              onClick={() => alert("PDF download coming soon")}
              className="p-2 hover:bg-gray-200 rounded"
              title="Download as PDF"
            >
              <Download className="w-5 h-5 text-gray-600 cursor-pointer" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded"
              title="Close"
            >
              <X className="w-5 h-5 text-gray-600 cursor-pointer" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-full p-6 bg-white">
          <OutputCharts />
        </div>
      </div>
    </div>
  );
};

export default OutputModal;