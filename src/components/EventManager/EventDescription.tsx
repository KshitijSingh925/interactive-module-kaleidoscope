
import { useState } from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

const EventDescription = () => {
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()]);
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
  };

  return (
    <div className="p-4 bg-festai-gray rounded-lg mb-4 flex items-center">
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
          <div className="space-y-4 mt-4">
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
                <div className="flex">
                  <Input
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task"
                    className="flex-grow"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddTask();
                      }
                    }}
                  />
                  <Button onClick={handleAddTask} className="ml-2">
                    Add
                  </Button>
                </div>
                <ul className="space-y-2 mt-2">
                  {tasks.map((task, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center p-2 bg-gray-100 rounded"
                    >
                      <span>{task}</span>
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
            </div>
            <Button onClick={handleSave} className="w-full">
              Save Details
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventDescription;
