
import { FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";

const TrackDashboard = () => {
  return (
    <div className="festai-gray-card mb-4 animate-fade-in flex items-center">
      <div className="festai-icon">
        <FileSpreadsheet className="h-5 w-5" />
      </div>
      <Button variant="link" className="text-lg font-medium p-0 h-auto ml-3">
        Track registrations: Dashboard
      </Button>
      <span className="ml-auto text-xs text-gray-500 bg-white/50 px-2 py-1 rounded-full">(Non-functional as requested)</span>
    </div>
  );
};

export default TrackDashboard;
