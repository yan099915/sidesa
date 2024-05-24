import React from 'react';
import Announcement from '../../components/Announcement';

export default function AnnouncementPage() {
  return (
    <div>
      <Announcement option={{ count: 10 }} />
    </div>
  );
}
