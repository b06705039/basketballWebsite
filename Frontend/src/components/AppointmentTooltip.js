import React from 'react';
const time = ["12:30-13:30", '18:30-19:30', '19:30-20:30']

const fieldPicture = { 0: "https://i.imgur.com/uR9JIRI.png", 1: "https://i.imgur.com/C378EBB.png" };

export default function AppointmentTooltip(model) {
    const { appointmentData } = model.data;
    const { text, startDate, field, home, homeDepartment, homeStatus, away, awayDepartment, awayStatus, recorder, recorder_id } = appointmentData;
    return (
        <div className="movie-tooltip">
            <img alt="" src={(field !== undefined) ? fieldPicture[field] : fieldPicture[0]} />
            <div className="movie-info">
                <div className="movie-title">{text}</div>
                <h3>
                    {`Date: ${startDate.toLocaleDateString()} ${(startDate !== undefined) ? time[startDate.getHours() - 1] : "failed"}`}
                </h3>
                <table className="appointment-detail">
                    <tbody>
                        <tr>
                            <td> </td>
                            <td>隊名</td>
                            <td>系別</td>
                            <td>狀態</td>
                        </tr>
                        <tr>
                            <td>主隊</td>
                            <td>{home}</td>
                            <td>{homeDepartment}</td>
                            <td>{homeStatus}</td>
                        </tr>
                        <tr>
                            <td>客隊</td>
                            <td>{away}</td>
                            <td>{awayDepartment}</td>
                            <td>{awayStatus}</td>
                        </tr>
                    </tbody>
                </table>
                <h3>
                    {(recorder === null) ? "尚未指派紀錄台" : `Recorder: ${recorder} [ID: ${recorder_id}]`}
                </h3>
            </div>
        </div>
    );
}