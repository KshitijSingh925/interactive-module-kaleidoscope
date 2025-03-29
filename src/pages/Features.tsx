
import Navbar from "@/components/Layout/Navbar";

const Features = () => {
  return (
    <div className="min-h-screen bg-gray-200">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-6">Features</h1>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Event Planning</h2>
              <p className="text-gray-700">
                Create and manage events with our intuitive planning tools. Set schedules, 
                timelines, and track progress all in one place.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Volunteer Management</h2>
              <p className="text-gray-700">
                Easily add, organize, and communicate with event volunteers. 
                Assign roles and track responsibilities.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Registration Tracking</h2>
              <p className="text-gray-700">
                Monitor event registrations in real-time with comprehensive analytics 
                and reporting tools.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Progress Monitoring</h2>
              <p className="text-gray-700">
                Track the progress of your event preparation with visual indicators and
                percentage-based completion tracking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
