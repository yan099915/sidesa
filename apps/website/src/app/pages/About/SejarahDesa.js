import React from 'react';
import VerticalTimeline from '../../components/Timeline';

const AboutDesa = () => {
  const timelineItems = [
    {
      title: 'Event 1',
      date: 'May 2020',
      description: 'Description of event 1...',
    },
    {
      title: 'Event 2',
      date: 'June 2020',
      description: 'Description of event 2...',
    },
    {
      title: 'Event 3',
      date: 'July 2020',
      description: 'Description of event 3...',
    },
  ];
  return (
    <div className="container mx-auto p-6">
      <VerticalTimeline items={timelineItems} />
    </div>
  );
};

export default AboutDesa;
