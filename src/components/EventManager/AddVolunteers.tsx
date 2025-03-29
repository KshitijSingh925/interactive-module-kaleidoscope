
import { useState } from "react";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface Volunteer {
  name: string;
  email: string;
  role: string;
}

const AddVolunteers = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [newVolunteer, setNewVolunteer] = useState<Volunteer>({
    name: "",
    email: "",
    role: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddVolunteer = () => {
    if (newVolunteer.name && newVolunteer.email && newVolunteer.role) {
      setVolunteers([...volunteers, { ...newVolunteer }]);
      setNewVolunteer({ name: "", email: "", role: "" });
      toast({
        title: "Volunteer Added",
        description: `${newVolunteer.name} has been added as a ${newVolunteer.role}`,
      });
    }
  };

  const handleRemoveVolunteer = (index: number) => {
    setVolunteers(volunteers.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 bg-festai-gray rounded-lg mb-4 flex items-center">
      <Users className="h-5 w-5 mr-2" />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="link" className="text-lg font-medium p-0 h-auto">
            Add Volunteers
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Manage Volunteers</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label htmlFor="volunteerName" className="block mb-1 text-sm font-medium">
                  Name
                </label>
                <Input
                  id="volunteerName"
                  value={newVolunteer.name}
                  onChange={(e) =>
                    setNewVolunteer({ ...newVolunteer, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="volunteerEmail" className="block mb-1 text-sm font-medium">
                  Email
                </label>
                <Input
                  id="volunteerEmail"
                  type="email"
                  value={newVolunteer.email}
                  onChange={(e) =>
                    setNewVolunteer({ ...newVolunteer, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="volunteerRole" className="block mb-1 text-sm font-medium">
                  Role
                </label>
                <Input
                  id="volunteerRole"
                  value={newVolunteer.role}
                  onChange={(e) =>
                    setNewVolunteer({ ...newVolunteer, role: e.target.value })
                  }
                />
              </div>
            </div>
            <Button onClick={handleAddVolunteer} className="w-full">
              Add Volunteer
            </Button>

            {volunteers.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">Volunteer List</h3>
                <div className="max-h-60 overflow-y-auto">
                  {volunteers.map((volunteer, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 bg-gray-100 rounded mb-2"
                    >
                      <div>
                        <div className="font-semibold">{volunteer.name}</div>
                        <div className="text-xs text-gray-600">
                          {volunteer.email} • {volunteer.role}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveVolunteer(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddVolunteers;
