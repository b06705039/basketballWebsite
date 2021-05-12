import React from 'react';
import TileView from 'devextreme-react/tile-view'
import Scheduler, { AppointmentDragging, Resource, View } from 'devextreme-react/scheduler';
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
const draggingGroupName = 'appointmentsGroup';
const TimeRange = ['12:30', '18:30', '19:30']
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
    this.state = {
      pagechange: 0,
      appointments: appointments
    };
  }

  render() {
    const { appointments } = this.state;
    console.log(appointments)
    return (
      <React.Fragment id="schedule">
        <Scheduler
          adaptivityEnabled={true}
          timeZone="Asia/Taipei"
          id="scheduler"
          dataSource={appointments.filter(x => (x.arranged === true))}
          defaultCurrentDate={currentDate}
          height={'100%'}
          startDayHour={1}
          endDayHour={4}
          cellDuration={60}
          editing={{
            allowAdding: true,
            allowDeleting: true,
            allowResizing: false,
            allowDragging: true,
            allowUpdating: true
          }}
          groupByDate={true}
          groups={['field']}
          views={views}
          defaultCurrentView={views[0]}
          appointmentComponent={AppointmentFormat}
          appointmentTooltipComponent={AppointmentTooltip}
          onAppointmentFormOpening={this.onAppointmentFormOpening}
          onAppointmentUpdating={this.onAppointmentUpdating}
          onAppointmentAdded={this.onAppointmentAdd}
          timeCellRender={TimeCell}
        >
          <Resource
            fieldExpr="field"
            allowMultiple={false}
            dataSource={FieldData}
            label="Field"
          />
          <View
            type="timelineWeek"
            name="Timeline Week"
            groupOrientation="horizontal"
            maxAppointmentsPerCell={1}
          />
          <AppointmentDragging
            group={draggingGroupName}
            onRemove={this.onAppointmentRemove}
            onAdd={this.onAppointmentAdd}
            onDragEnd={this.onAppointmentDragEnd}
          />
        </Scheduler>
        <h1 style={{ marginLeft: 50 }}>賽程</h1>
        <ScrollView id="scroll" direction='both' height={50} width={'100%'} style={{ marginLeft: 50 }}>
          <Draggable
            id="DragList"
            data="dropArea"
            height={50}
            group={draggingGroupName}
            onDragStart={this.onListDragStart}>
            {this.state.appointments.filter(x => (x.arranged === false)).map((task) => {
              return <Draggable
                key={task.text}
                className="item dx-card dx-theme-text-color dx-theme-background-color"
                clone={true}
                group={draggingGroupName}
                data={task}
                width={120}
                onDragStart={this.onItemDragStart}
                onDragEnd={this.onItemDragEnd}>
                <div style={{ textAlign: "center" }}>{task.text}</div></Draggable>;
            })}
          </Draggable>
        </ScrollView>
      </React.Fragment >
    );
  }

  checkAppointmentAvailable = appointment => {
    let allcontest = this.state.appointments.filter(
      x => (x.arranged === true &&
        x.startDate.getDay() === appointment.startDate.getDay() &&
        x.field === appointment.field &&
        x.id !== appointment.id
      ));
    for (let i = 0; i < allcontest.length; i++) {
      let contest = allcontest[i];
      if (appointment.startDate >= contest.endDate || appointment.endDate <= contest.startDate) {
        console.log("Time is avaiable!! But judgets not sure yet");
      }
      else {
        notify(`Time is not avaiable with match ${appointment.text} and Team ${contest.text}`)
        console.log(contest, appointment)
        return false;
      }
    }
    return true
  }
  onAppointmentDragEnd = e => { console.log(e) }

  onAppointmentRemove = e => {
    if (e.itemData.arranged === true) {
      const index = this.state.appointments.indexOf(e.itemData);
      let newappointments = this.state.appointments;
      delete newappointments[index].startDate;
      delete newappointments[index].endDate;
      newappointments[index].arranged = false;
      this.setState({
        appointments: newappointments
      });
    }
  }

  onAppointmentAdd = e => {
    if (e.itemData !== undefined) {
      if (e.itemData.startDate.getHours() === 0) {
        console.log("Canceled")
        e.cancel = true;
        return;
      }
      e.itemData.endDate = new Date(e.itemData.startDate.getTime() + 3600 * 1000);
      if (e.fromData.arranged === false && this.checkAppointmentAvailable(e.itemData)) {
        const index = this.state.appointments.indexOf(e.fromData);
        let newappointments = this.state.appointments;
        newappointments[index] = e.itemData;
        newappointments[index].arranged = true;
        this.setState({
          appointments: newappointments
        });
      }
    }
    else if (e.appointmentData !== undefined) {
      console.log(e.appointmentData);
    }
  }

  onAppointmentUpdating = e => {
    if (e.newData.allDay)
      e.cancel = true;
    if (!this.checkAppointmentAvailable(e.newData))
      e.cancel = true;
  }

  onListDragStart(e) {
    e.cancel = true;
  }

  onItemDragStart(e) {
    e.itemData = e.fromData;
  }

  onItemDragEnd(e) {
    if (e.toData) {
      e.cancel = true;
    }
  }

  onAppointmentFormOpening = (data) => {
    let form = data.form;
    let text = data.appointmentData.text;
    form.option('items', [{
      colSpan: 2,
      label: {
        text: 'Contest'
      },
      editorType: 'dxSelectBox',
      dataField: 'id',
      value: text,
      editorOptions: {
        items: appointments.filter(x => (x.arranged !== true)),
        itemTemplate: function (option) {
          return option.text
        },
        displayExpr: 'text',
        valueExpr: 'id',
        onValueChanged: (args) => {
          let target = appointments.find(x => (x.id === args.value))
          if (target !== undefined) {
            form.updateData('text', target.text)
          }
        }
      }
    }]);
  }
}

export default App;
