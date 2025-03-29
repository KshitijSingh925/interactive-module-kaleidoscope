
import ScheduleEvent from "../EventManager/ScheduleEvent";
import Timeline from "../EventManager/Timeline";
import EventDescription from "../EventManager/EventDescription";
import AddVolunteers from "../EventManager/AddVolunteers";
import TrackDashboard from "../EventManager/TrackDashboard";
import CheckProgress from "../EventManager/CheckProgress";

const EventDashboard = () => {
  return (
    <div className="max-w-2xl mx-auto my-8 bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Core Member</h2>
      <div className="space-y-4">
        <ScheduleEvent />
        <Timeline />
        <EventDescription />
        <AddVolunteers />
        <TrackDashboard />
        <CheckProgress />
      </div>
    </div>
  );
};

export default EventDashboard;
