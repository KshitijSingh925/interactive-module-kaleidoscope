
import { useState } from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

type DaySchedule = {
  date: string;
  startTime: string;
  endTime: string;
};

const Timeline = () => {
  const [days, setDays] = useState<DaySchedule[]>([
    { date: "2023-11-01", startTime: "09:00", endTime: "17:00" },
    { date: "2023-11-02", startTime: "09:00", endTime: "17:00" },
    { date: "2023-11-03", startTime: "09:00", endTime: "17:00" }
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Timeline Updated",
      description: `Timeline updated with ${days.length} days`,
    });
    setIsDialogOpen(false);
    setShowDetails(true);
  };

  const handleAddDay = () => {
    const lastDay = days[days.length - 1];
    const nextDate = new Date(lastDay.date);
    nextDate.setDate(nextDate.getDate() + 1);
    
    const formattedDate = nextDate.toISOString().split('T')[0];
    setDays([...days, { date: formattedDate, startTime: "09:00", endTime: "17:00" }]);
  };

  const handleRemoveDay = (index: number) => {
    if (days.length > 1) {
      setDays(days.filter((_, i) => i !== index));
    } else {
      toast({
        title: "Cannot Remove Day",
        description: "At least one day must be scheduled",
        variant: "destructive"
      });
    }
  };

  const handleDayChange = (index: number, field: keyof DaySchedule, value: string) => {
    const updatedDays = [...days];
    updatedDays[index] = { ...updatedDays[index], [field]: value };
    setDays(updatedDays);
  };

  const formatTimelineDisplay = () => {
    if (days.length === 1) {
      return `${days[0].date} (${days[0].startTime} - ${days[0].endTime})`;
    }
    return `${days[0].date} - ${days[days.length - 1].date}`;
  };

  return (
    <div className="p-4 bg-festai-pink rounded-lg mb-4">
      <div className="flex items-center">
        <Clock className="h-5 w-5 mr-2" />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="link" className="text-lg font-medium p-0 h-auto">
              Timeline: {formatTimelineDisplay()}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Set Event Timeline</DialogTitle>
            </DialogHeader>
            <div className="max-h-[60vh] overflow-y-auto">
              {days.map((day, index) => (
                <div key={index} className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Day {index + 1}</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveDay(index)}
                      className="text-red-500 h-8"
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <div>
                      <label htmlFor={`date-${index}`} className="block mb-1 text-sm font-medium">
                        Date
                      </label>
                      <Input
                        id={`date-${index}`}
                        type="date"
                        value={day.date}
                        onChange={(e) => handleDayChange(index, "date", e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label htmlFor={`startTime-${index}`} className="block mb-1 text-sm font-medium">
                          Start Time
                        </label>
                        <Input
                          id={`startTime-${index}`}
                          type="time"
                          value={day.startTime}
                          onChange={(e) => handleDayChange(index, "startTime", e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor={`endTime-${index}`} className="block mb-1 text-sm font-medium">
                          End Time
                        </label>
                        <Input
                          id={`endTime-${index}`}
                          type="time"
                          value={day.endTime}
                          onChange={(e) => handleDayChange(index, "endTime", e.target.value)}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                  {index < days.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
              <Button
                variant="outline"
                onClick={handleAddDay}
                className="w-full mt-2"
              >
                Add Day
              </Button>
            </div>
            <Button onClick={handleSave} className="w-full mt-4">
              Save Timeline
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      
      {showDetails && (
        <div className="mt-3 text-sm bg-white bg-opacity-30 p-2 rounded">
          <h4 className="font-semibold mb-1">Schedule:</h4>
          <ul className="space-y-1">
            {days.map((day, index) => (
              <li key={index}>
                Day {index + 1}: {day.date} ({day.startTime} - {day.endTime})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Timeline;
