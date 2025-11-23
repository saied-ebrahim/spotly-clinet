import React from 'react';

const EventsPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Event list will go here */}
        <p>No events found.</p>
      </div>
    </div>
  );
};

export default EventsPage;
