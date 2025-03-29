
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const formatTimelineDisplay = () => {
    if (days.length === 1) {
      return `${formatDate(days[0].date)}`;
    }
    return `${formatDate(days[0].date)} - ${formatDate(days[days.length - 1].date)}`;
  };

  return (
    <div className="festai-pink-card mb-4 animate-fade-in">
      <div className="flex items-center">
        <div className="festai-icon">
          <Clock className="h-5 w-5" />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="link" className="text-lg font-medium p-0 h-auto ml-3">
              Timeline: {formatTimelineDisplay()}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md md:max-w-lg w-[95vw] max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Set Event Timeline</DialogTitle>
            </DialogHeader>
            <div className="max-h-[60vh] overflow-y-auto pr-1">
              {days.map((day, index) => (
                <div key={index} className="space-y-2 mb-6 bg-background/40 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium bg-primary/10 px-2 py-1 rounded">Day {index + 1}</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveDay(index)}
                      className="text-destructive hover:bg-destructive/10 h-8"
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
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
                    <div className="grid grid-cols-2 gap-3">
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
                  {index < days.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
              <Button
                variant="outline"
                onClick={handleAddDay}
                className="w-full mt-4 border-dashed"
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
        <div className="mt-4 text-sm bg-white bg-opacity-40 p-3 rounded-lg shadow-sm">
          <h4 className="font-semibold mb-2 text-left">Event Schedule:</h4>
          <div className="grid gap-2 max-h-[200px] overflow-y-auto pr-1">
            {days.map((day, index) => (
              <div key={index} className="text-left bg-white bg-opacity-50 p-2 rounded flex justify-between items-center">
                <span className="font-medium">{formatDate(day.date)}</span>
                <span className="text-gray-600">{day.startTime} - {day.endTime}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Timeline;
