
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

  return (
    <div className="p-4 bg-festai-gray rounded-lg mb-4 flex items-center">
      <BarChart3 className="h-5 w-5 mr-2" />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="link" className="text-lg font-medium p-0 h-auto">
            Check Progress of event
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Event Progress</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Overall Progress</span>
                <span className="text-sm font-semibold">{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>
            
            <div className="space-y-4">
              {progressItems.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span>{item.name}</span>
                    <span className="text-sm">{item.completion}%</span>
                  </div>
                  <Progress value={item.completion} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckProgress;
