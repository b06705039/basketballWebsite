import React from 'react';
const time = ["12:30-13:30", '18:30-19:30', '19:30-20:30']
export default function Appointment(model) {
  const { appointmentData } = model.data;
  const { text, startDate } = appointmentData;
  return (
    <div className="showtime-preview">
      <div style={{ textAlign: 'center' }}>{text}</div>
      <div>
        {(startDate !== undefined) ? time[startDate.getHours() - 1] : "failed"}
      </div>
    </div>
  );
}
