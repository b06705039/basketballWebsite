import React from "react";
import Scheduler, {
  AppointmentDragging,
  Resource,
  View,
} from "devextreme-react/scheduler";
import Draggable from "devextreme-react/draggable";
import ScrollView from "devextreme-react/scroll-view";
import notify from "devextreme/ui/notify";
import AppointmentFormat from "../components/Appointment";
import AppointmentTooltip from "../components/AppointmentTooltip";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import "../css/scheduler.css";
import { Match, Time } from "../axios";
import { LoadPanel } from "devextreme-react/load-panel";
const currentDate = new Date(2021, 4, 24);
const views = ["workWeek"];
const draggingGroupName = "appointmentsGroup";
const TimeRangeObject = { 1: "12:30", 2: "18:30", 3: "19:30" };

const FieldData = [
  {
    text: "Field A",
    id: 0,
    color: "#1e90ff",
  },
  {
    text: "Field B",
    id: 1,
    color: "#ff9747",
  },
];

const TimeCell = ({ date }) => {
  let text = TimeRangeObject[date.getHours()];
  return <div style={{ margin: "0 auto" }}>{text}</div>;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.uploading = false;
    this.state = {
      appointments: [],
      busytime: {},
      recorders: {},
      teams: {},
      currentAppointment: null,
      loading: true,
    };
    this.scheduler = React.createRef();
  }
  startupload = () => {
    this.setState(() => ({ loading: true }));
    notify("Uploading");
  };
  endupload = () => {
    this.setState(() => ({ loading: false }));
    notify("Uploaded");
  };
  componentWillUnmount = () => {};

  componentDidMount = () => {
    (async () => {
      let allmatches = await Match.GetALLMatch();
      allmatches.forEach((match, index) => {
        match.text = `${match.home} vs ${match.away}`;
        match.startDate = new Date(match.startDate);
      });
      this.setState(() => ({
        appointments: allmatches,
        loading: false,
      }));
    })();
  };
  onAppointmentFormOpening = (e) => {
    e.cancel = true;
    return;
  };
  render() {
    const { appointments } = this.state;
    return (
      <React.Fragment>
        <div
          id="scheduler-container"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Scheduler
            ref={this.scheduler}
            adaptivityEnabled={true}
            timeZone="Asia/Taipei"
            id="scheduler"
            dataSource={appointments.filter((x) => x.arranged === true)}
            defaultCurrentDate={currentDate}
            height={"100%"}
            startDayHour={1}
            endDayHour={4}
            cellDuration={60}
            editing={{
              allowAdding: false,
              allowDeleting: false,
              allowResizing: false,
              allowDragging: false,
              allowUpdating: false,
            }}
            groupByDate={true}
            groups={["field"]}
            views={views}
            dataCellComponent={this.DataCell}
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
          </Scheduler>
        </div>
        <LoadPanel
          shadingColor="rgba(0,0,0,0.4)"
          position={{ of: "#scheduler-container" }}
          visible={this.state.loading}
        />
      </React.Fragment>
    );
  }

  DataCell = (props) => {
    let cellName = "",
      text = "";
    let time = props.data.startDate.toISOString();
    const WeekDay = props.data.startDate.getDay();
    if (
      props.data.startDate.getHours() === 1 &&
      (WeekDay === 2 || WeekDay === 4)
    ) {
      cellName = "disable-date";
      text = "No Game";
    }
    return (
      <div className={cellName} id={`${time}-${props.data.groups.field}`}>
        {text}
      </div>
    );
  };
}

export default App;
