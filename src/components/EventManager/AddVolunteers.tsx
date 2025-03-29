
import { useState } from "react";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

type Volunteer = {
  name: string;
  email: string;
  phone: string;
  role: string;
};

const AddVolunteers = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [newVolunteer, setNewVolunteer] = useState<Volunteer>({
    name: "",
    email: "",
    phone: "",
    role: ""
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { toast } = useToast();

  const handleAddVolunteer = () => {
    if (newVolunteer.name.trim() && newVolunteer.email.trim()) {
      setVolunteers([...volunteers, { ...newVolunteer }]);
      setNewVolunteer({
        name: "",
        email: "",
        phone: "",
        role: ""
      });
      toast({
        title: "Volunteer Added",
        description: `${newVolunteer.name} has been added as a volunteer.`,
      });
    }
  };

  const handleRemoveVolunteer = (index: number) => {
    const removedVolunteer = volunteers[index];
    setVolunteers(volunteers.filter((_, i) => i !== index));
    toast({
      title: "Volunteer Removed",
      description: `${removedVolunteer.name} has been removed.`,
    });
  };

  const handleInputChange = (field: keyof Volunteer, value: string) => {
    setNewVolunteer({
      ...newVolunteer,
      [field]: value
    });
  };

  const handleSave = () => {
    toast({
      title: "Volunteers List Saved",
      description: `${volunteers.length} volunteers have been saved.`,
    });
    setIsDialogOpen(false);
    setShowDetails(true);
  };

  return (
    <div className="p-4 bg-festai-gray rounded-lg mb-4">
      <div className="flex items-center">
        <Users className="h-5 w-5 mr-2" />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="link" className="text-lg font-medium p-0 h-auto">
              Add Volunteers
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Volunteers</DialogTitle>
              <DialogDescription>
                Add volunteers and assign them roles for the event.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newVolunteer.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Full name"
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={newVolunteer.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Email address"
                    type="email"
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={newVolunteer.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Phone number"
                    type="tel"
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={newVolunteer.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    placeholder="Volunteer role"
                    className="w-full"
                  />
                </div>
                <Button 
                  onClick={handleAddVolunteer}
                  disabled={!newVolunteer.name.trim() || !newVolunteer.email.trim()}
                  className="w-full"
                >
                  Add Volunteer
                </Button>
              </div>
              
              {volunteers.length > 0 && (
                <div className="space-y-2">
                  <Separator />
                  <h3 className="text-sm font-semibold">Volunteer List ({volunteers.length})</h3>
                  <ul className="space-y-2">
                    {volunteers.map((volunteer, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center p-2 bg-gray-100 rounded"
                      >
                        <div>
                          <div className="font-medium">{volunteer.name}</div>
                          <div className="text-xs text-gray-600">
                            {volunteer.email} • {volunteer.phone} • {volunteer.role}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500"
                          onClick={() => handleRemoveVolunteer(index)}
                        >
                          Remove
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <Separator />
              <Button onClick={handleSave} className="w-full">
                Save Volunteer List
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {showDetails && volunteers.length > 0 && (
        <div className="mt-3 bg-white bg-opacity-30 p-2 rounded">
          <h4 className="text-sm font-semibold">Volunteers ({volunteers.length}):</h4>
          <ul className="mt-1 space-y-1">
            {volunteers.map((volunteer, index) => (
              <li key={index} className="text-sm">
                <span className="font-medium">{volunteer.name}</span>
                {volunteer.role && (
                  <span className="ml-1 text-xs">- {volunteer.role}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddVolunteers;
