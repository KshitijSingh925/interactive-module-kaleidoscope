
import { useState } from "react";
import { BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

interface ProgressItem {
  name: string;
  completion: number;
}

const CheckProgress = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [progressItems, setProgressItems] = useState<ProgressItem[]>([
    { name: "Registration", completion: 85 },
    { name: "Venue Setup", completion: 60 },
    { name: "Speaker Confirmation", completion: 100 },
    { name: "Marketing", completion: 75 },
    { name: "Budget Allocation", completion: 90 },
  ]);
  
  const overallProgress = Math.round(
    progressItems.reduce((acc, item) => acc + item.completion, 0) / progressItems.length
  );
  
  // Function to determine progress color
  const getProgressColor = (value: number) => {
    if (value < 30) return "bg-red-500";
    if (value < 70) return "bg-yellow-500";
    return "bg-emerald-500";
  };

  return (
    <div className="festai-gray-card mb-4 animate-fade-in">
      <div className="flex items-center">
        <div className="festai-icon">
          <BarChart3 className="h-5 w-5" />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="link" className="text-lg font-medium p-0 h-auto ml-3">
              Check Progress of Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md w-[95vw]">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Event Progress</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 mt-4">
              <div className="p-4 bg-background/40 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-lg">Overall Progress</span>
                  <span className="text-sm font-semibold bg-primary px-2 py-1 rounded-full text-white">{overallProgress}%</span>
                </div>
                <Progress 
                  value={overallProgress} 
                  className="h-3 rounded-full" 
                  indicatorClassName={getProgressColor(overallProgress)}
                />
              </div>
              
              <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-1">
                {progressItems.map((item, index) => (
                  <div key={index} className="p-3 bg-background/20 rounded-lg transition-all hover:bg-background/40">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm bg-background/60 px-2 py-0.5 rounded">{item.completion}%</span>
                    </div>
                    <Progress 
                      value={item.completion} 
                      className="h-2 rounded-full" 
                      indicatorClassName={getProgressColor(item.completion)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CheckProgress;
