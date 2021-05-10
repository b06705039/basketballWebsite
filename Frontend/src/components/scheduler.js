import React from 'react';

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: appointments
    };
  }

  componentDidMount() {
    let rows = document.getElementsByClassName('dx-scheduler-time-panel-cell dx-scheduler-cell-sizes-vertical');
    for (let i = 0; i < rows.length; i++) {
      rows[i].innerHTML = `<div style="margin: auto 0">${TimeRange[i]}</div>`
    }
  }

  componentDidUpdate() {
    let rows = document.getElementsByClassName('dx-scheduler-time-panel-cell dx-scheduler-cell-sizes-vertical');
    for (let i = 0; i < rows.length; i++) {
      rows[i].innerHTML = `<div style="margin: auto 0">${TimeRange[i]}</div>`
    }
  }


  render() {
    const { appointments } = this.state;
    console.log(appointments)
    return (
    <React.Fragment>
        <ScrollView id="scroll">
        <Draggable
            id="list"
            data="dropArea"
            group={draggingGroupName}
            onDragStart={this.onListDragStart}>
            {this.state.appointments.filter(x => (x.arranged === false)).map((task) => {
            return <Draggable
                key={task.text}
                className="item dx-card dx-theme-text-color dx-theme-background-color"
                clone={true}
                group={draggingGroupName}
                data={task}
                onDragStart={this.onItemDragStart}
                onDragEnd={this.onItemDragEnd}>
                {task.text}
            </Draggable>;
            })}
        </Draggable>
        </ScrollView>
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
        />
        </Scheduler>
    </React.Fragment>
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
