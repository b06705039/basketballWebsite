import React, { useEffect, useState, useRef, useCo } from 'react';
import Scheduler, { View } from 'devextreme-react/scheduler';
import { Time } from '../axios'
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import '../css/scheduler.css'


const currentDate = new Date(2021, 4, 24);
const views = ['workWeek'];
const TimeRangeObject = { 1: '12:30', 2: '18:30', 3: '19:30' }

function Appointment() {
  return (
    <div style={{ textAlign: 'center' }}>{"無法出賽"}</div>
  );
}

const TimeCell = ({ date }) => {
  let text = TimeRangeObject[date.getHours()]
  return (
    <div style={{ margin: "0 auto" }}>{text}</div>
  );
}

function DataCell(props) {
  let cellName = "", text = "";
  const WeekDay = props.data.startDate.getDay();
  if (props.data.startDate.getHours() === 1 && (WeekDay === 2 || WeekDay === 4)) {
    cellName = 'disable-date';
    text = "No Game"
  }
  return (
    <div className={cellName}>
      {text}
    </div>
  );
}


function App(props) {
  const scheduler = useRef(null);
  const [appointments, setappointments] = useState([]);

  const AddbusyTime = data => {
    let newappointments = {
      startDate: data.cellData.startDate,
      endDate: data.cellData.endDate
    }
    const WeekDay = newappointments.startDate.getDay();
    if (newappointments.startDate.getHours() === 1 && (WeekDay === 2 || WeekDay === 4))
      return;
    if (scheduler.current.props.dataSource.find(x => (String(x.startDate) === String(newappointments.startDate))) === undefined)
      scheduler.current.instance.addAppointment(newappointments);
  }

  const DeleteAppointment = (event) => {
    scheduler.current.instance.deleteAppointment(event.appointmentData);
  }



  const componentWillUnmount = async () => {
    let timeString = [...scheduler.current.props.dataSource].map(x => String(x.startDate));
    await Time.Update(timeString.join(','))
  };

  const componentWillMount = async () => { console.log(await Time.GetTime()); };

  let Data;
  useEffect(() => {
    const GetData = async () => {
      Data = await Promise.all([Time.GetTime()]);
    }
    console.log(Data);
    return (() => { console.log("ComponentUnMount") })
  }
  )



  return (
    <React.Fragment>
      <Scheduler
        appointmentComponent={Appointment}
        onAppointmentClick={DeleteAppointment}
        ref={scheduler}
        dataSource={appointments}
        timeZone="Asia/Taipei"
        id="scheduler"
        defaultCurrentDate={currentDate}
        startDayHour={1}
        endDayHour={4}
        cellDuration={60}
        dataCellComponent={DataCell}
        views={views}
        onCellClick={AddbusyTime}
        defaultCurrentView={views[0]}
        timeCellRender={TimeCell}
        editing={
          {
            allowAdding: false,
            allowDeleting: false,
            allowResizing: false,
            allowDragging: false,
            allowUpdating: false
          }
        }
      >
        <View
          type="timelineWeek"
          name="Timeline Week"
          groupOrientation="horizontal"
          maxAppointmentsPerCell={1}
        />
      </Scheduler>
    </React.Fragment >
  );
}

export default App;
