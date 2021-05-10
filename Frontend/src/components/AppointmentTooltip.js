import React from 'react';
const time = ["12:30-13:30", '18:30-19:30', '19:30-20:30']

const fieldPicture = { 0: "https://i.imgur.com/uR9JIRI.png", 1: "https://i.imgur.com/C378EBB.png" };

export default function AppointmentTooltip(model) {
    const { appointmentData } = model.data;
    const { text, startDate, field } = appointmentData;
    console.log(appointmentData)
    return (
        <div className="movie-tooltip">
            <img alt="" src={(field !== undefined) ? fieldPicture[field] : fieldPicture[0]} />
            <div className="movie-info">
                <div className="movie-title">{text}</div>
                <div>
                    {`Date: ${(startDate !== undefined) ? time[startDate.getHours() - 1] : "failed"}}`}
                </div>
                <div>
                    {"Judges: "}
                </div>
            </div>
        </div>
    );
}