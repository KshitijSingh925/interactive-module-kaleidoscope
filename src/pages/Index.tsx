
import Navbar from "@/components/Layout/Navbar";
import EventDashboard from "@/components/Layout/EventDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-200">
      <Navbar />
      <main className="container mx-auto px-4">
        <EventDashboard />
      </main>
    </div>
  );
};

export default Index;
