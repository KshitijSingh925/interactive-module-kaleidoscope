
import { FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";

const TrackDashboard = () => {
  return (
    <div className="p-4 bg-festai-gray rounded-lg mb-4 flex items-center">
      <FileSpreadsheet className="h-5 w-5 mr-2" />
      <Button variant="link" className="text-lg font-medium p-0 h-auto">
        Track registrations: Dashboard
      </Button>
      <span className="ml-auto text-xs text-gray-500">(Non-functional as requested)</span>
    </div>
  );
};

export default TrackDashboard;
