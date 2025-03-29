
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
    <div className="p-4 bg-festai-pink rounded-lg mb-4 flex items-center">
      <Calendar className="h-5 w-5 mr-2" />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="link" className="text-lg font-medium p-0 h-auto">
            Schedule Event: {eventName}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule an Event</DialogTitle>
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
  );
};

export default ScheduleEvent;
