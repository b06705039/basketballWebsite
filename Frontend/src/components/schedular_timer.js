import React from 'react';
import TileView from 'devextreme-react/tile-view'
import Scheduler, { AppointmentDragging, Resource, View, addAppointment } from 'devextreme-react/scheduler';
import Draggable from 'devextreme-react/draggable';
import ScrollView from 'devextreme-react/scroll-view';
import notify from 'devextreme/ui/notify';
import { appointments, FieldData } from '../data/data';
import AppointmentFormat from './Appointment'
import AppointmentTooltip from './AppointmentTooltip'
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

const currentDate = new Date(2021, 4, 24);
const views = ['workWeek', 'month'];
const TimeRangeObject = { 1: '12:30', 2: '18:30', 3: '19:30' }

const TimeCell = ({ date }) => {
  let text = TimeRangeObject[date.getHours()]
  return (
    <div style={{ margin: "0 auto" }}>{text}</div>
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
    console.log("Seleted cell ", data.cellData.startDate)
    let newappointments = {
      text: "Cancel",
      startDate: data.cellData.startDate,
      endDate: data.cellData.endDate,
      busy: true
    }
    console.log(this.scheduler.current)
  }
  render() {
    const { appointments } = this.state;
    console.log(appointments)
    return (
      <React.Fragment>
        <Scheduler
          ref={this.scheduler}
          dataSource={appointments}
          timeZone="Asia/Taipei"
          id="scheduler"
          defaultCurrentDate={currentDate}
          startDayHour={1}
          endDayHour={4}
          cellDuration={60}
          views={views}
          onCellClick={this.AddbusyTime}
          defaultCurrentView={views[0]}
          timeCellRender={TimeCell}
          editing={{
            allowAdding: true,
            allowDeleting: true,
            allowUpdatingL: true
          }}
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
