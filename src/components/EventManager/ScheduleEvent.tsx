
import { useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const ScheduleEvent = () => {
  const [eventName, setEventName] = useState("Hackathon");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSchedule = () => {
    toast({
      title: "Event Scheduled",
      description: `${eventName} has been scheduled successfully`,
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="festai-pink-card mb-4 animate-fade-in">
      <div className="flex items-center">
        <div className="festai-icon">
          <Calendar className="h-5 w-5" />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="link" className="text-lg font-medium p-0 h-auto ml-3">
              Schedule Event: {eventName}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md w-[95vw]">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Schedule an Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label htmlFor="eventName" className="block mb-2 text-sm font-medium">
                  Event Name
                </label>
                <Input
                  id="eventName"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button onClick={handleSchedule} className="w-full">
                Schedule Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ScheduleEvent;
