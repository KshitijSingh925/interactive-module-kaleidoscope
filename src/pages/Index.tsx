
import Navbar from "@/components/Layout/Navbar";
import EventDashboard from "@/components/Layout/EventDashboard";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Fest.ai - Event Management";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 transition-all duration-300 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <main className="container mx-auto px-4 pb-12 pt-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center md:text-left animate-fade-in">
            Event Management Dashboard
          </h1>
          <EventDashboard />
        </div>
      </main>
    </div>
  );
};

export default Index;
