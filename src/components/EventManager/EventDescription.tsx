
import { useState } from "react";
import { FileText, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

type Task = {
  name: string;
  startTime: string;
  endTime: string;
};

const EventDescription = () => {
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [newTaskStartTime, setNewTaskStartTime] = useState("09:00");
  const [newTaskEndTime, setNewTaskEndTime] = useState("10:00");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { toast } = useToast();

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        name: newTask.trim(),
        startTime: newTaskStartTime,
        endTime: newTaskEndTime
      }]);
      setNewTask("");
    }
  };

  const handleRemoveTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    toast({
      title: "Event Details Saved",
      description: "Description and tasks have been updated",
    });
    setIsDialogOpen(false);
    setShowDetails(true);
  };

  return (
    <div className="p-4 bg-festai-gray rounded-lg mb-4">
      <div className="flex items-center">
        <FileText className="h-5 w-5 mr-2" />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="link" className="text-lg font-medium p-0 h-auto text-left">
              Event Description and list tasks
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Event Description & Tasks</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4 max-h-[60vh] overflow-y-auto">
              <div>
                <label htmlFor="description" className="block mb-2 text-sm font-medium">
                  Event Description
                </label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-32"
                  placeholder="Enter event description..."
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Tasks</label>
                <div className="space-y-2">
                  <div className="grid grid-cols-1 gap-2">
                    <Input
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      placeholder="Add a new task"
                      className="w-full"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label htmlFor="taskStartTime" className="block mb-1 text-xs font-medium">
                          Start Time
                        </label>
                        <Input
                          id="taskStartTime"
                          type="time"
                          value={newTaskStartTime}
                          onChange={(e) => setNewTaskStartTime(e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="taskEndTime" className="block mb-1 text-xs font-medium">
                          End Time
                        </label>
                        <Input
                          id="taskEndTime"
                          type="time"
                          value={newTaskEndTime}
                          onChange={(e) => setNewTaskEndTime(e.target.value)}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={handleAddTask} 
                    className="w-full"
                    disabled={!newTask.trim()}
                  >
                    Add Task
                  </Button>
                </div>
                
                {tasks.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">Task List:</h3>
                    <ul className="space-y-2">
                      {tasks.map((task, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center p-2 bg-gray-100 rounded"
                        >
                          <div className="flex items-center">
                            <span>{task.name}</span>
                            <span className="ml-2 text-xs text-gray-500 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {task.startTime} - {task.endTime}
                            </span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveTask(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <Separator />
              <Button onClick={handleSave} className="w-full">
                Save Details
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {showDetails && (
        <div className="mt-3 bg-white bg-opacity-30 p-2 rounded">
          {description && (
            <div className="mb-3">
              <h4 className="text-sm font-semibold">Description:</h4>
              <p className="text-sm whitespace-pre-wrap">{description}</p>
            </div>
          )}
          
          {tasks.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold">Tasks:</h4>
              <ul className="space-y-1">
                {tasks.map((task, index) => (
                  <li key={index} className="text-sm flex items-center">
                    <span className="mr-2">{index + 1}. {task.name}</span>
                    <span className="text-xs text-gray-600">
                      ({task.startTime} - {task.endTime})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventDescription;
