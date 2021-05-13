import React from 'react';
import Scheduler, { View } from 'devextreme-react/scheduler';

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


class App extends React.Component {
  constructor(props) {
    super(props);
    this.scheduler = React.createRef();
    this.state = {
      appointments: []
    };
  }
  AddbusyTime = data => {
    let newappointments = {
      startDate: data.cellData.startDate,
      endDate: data.cellData.endDate
    }
    const WeekDay = newappointments.startDate.getDay();
    if (newappointments.startDate.getHours() === 1 && (WeekDay === 2 || WeekDay === 4))
      return;
    if (this.scheduler.current.props.dataSource.find(x => (String(x.startDate) === String(newappointments.startDate))) === undefined)
      this.scheduler.current.instance.addAppointment(newappointments);
  }

  DeleteAppointment = (event) => {
    this.scheduler.current.instance.deleteAppointment(event.appointmentData);
  }

  componentWillUnmount = () => {
    console.log("Save Data");
  }
  render() {
    const { appointments } = this.state;
    return (
      <React.Fragment>
        <Scheduler
          appointmentComponent={Appointment}
          onAppointmentClick={this.DeleteAppointment}
          ref={this.scheduler}
          dataSource={appointments}
          timeZone="Asia/Taipei"
          id="scheduler"
          defaultCurrentDate={currentDate}
          startDayHour={1}
          endDayHour={4}
          cellDuration={60}
          dataCellComponent={DataCell}
          views={views}
          onCellClick={this.AddbusyTime}
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
}

export default App;
