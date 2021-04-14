
  import * as React from 'react';
  import Paper from '@material-ui/core/Paper';
  import Place from '@material-ui/icons/Place';
  import Person from '@material-ui/icons/Person';
  import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
  import {
    Scheduler,
    WeekView,
    MonthView,
    Appointments,
    AppointmentForm,
    AppointmentTooltip,
    DragDropProvider,
    ViewSwitcher,
    Toolbar,
    DateNavigator,
    TodayButton
  } from '@devexpress/dx-react-scheduler-material-ui';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'clsx';

  const appointments = [
    { id:0, startDate: '2021-04-17T09:45', endDate: '2021-04-17T11:00', title: 'ME vs EE', location: 'A', judges: ["P12", "P14"]},
    { id:1, startDate: '2021-04-16T12:00', endDate: '2021-04-16T13:30', title: 'FIN vs DFFL', location: 'A', judges: ["P28", "P12"] },
    { id:2, startDate: '2021-04-13T18:00', endDate: '2021-04-13T19:30', title: 'ME vs DFFL', location: 'B', judges: ["P94", "P56"]},
    { id:3, startDate: '2021-04-14T19:30', endDate: '2021-04-14T21:00', title: 'FIN vs EE', location: 'B', judges: ["P14", "P94"]},
  ];

const dragDisableIds = new Set([2]);

const allowDrag = ({ id }) => !dragDisableIds.has(id);

const style = ({ palette }) => ({
    icon: {
      color: palette.action.active,
    },
    textCenter: {
      textAlign: 'center',
    },
    firstRoom: {
      background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/Lobby-4.jpg)',
    },
    secondRoom: {
      background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg)',
    },
    thirdRoom: {
      background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg)',
    },
    header: {
      height: '260px',
      backgroundSize: 'cover',
    },
    commandButton: {
      backgroundColor: 'rgba(255,255,255,0.65)',
    },
  });
const getClassByLocation = (classes, location) => {
    if (location === 'A') return classes.firstRoom;
    if (location === 'B') return classes.secondRoom;
    return classes.thirdRoom;
};

const Header = withStyles(style, { name: 'Header' })(({
    children, appointmentData, classes, ...restProps
  }) => (
    <AppointmentTooltip.Header
      {...restProps}
      className={classNames(getClassByLocation(classes, appointmentData.location), classes.header)}
      appointmentData={appointmentData}
    >
      <IconButton
        /* eslint-disable-next-line no-alert */
        onClick={() => alert(JSON.stringify(appointmentData))}
        className={classes.commandButton}
      >
        <MoreIcon />
      </IconButton>
    </AppointmentTooltip.Header>
  ));
  
const Content = withStyles(style, { name: 'Content' })(({
    children, appointmentData, classes, ...restProps
  }) => (
    <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
      <Grid container alignItems="center">
        <Grid item xs={2} className={classes.textCenter}>
          <Place className={classes.icon} />
        </Grid>
        <Grid item xs={10}>
          <span>{"中央場 " + appointmentData.location}</span>
        </Grid>
        <Grid item xs={2} className={classes.textCenter}>
          <Person className={classes.icon} />
        </Grid>
        <Grid item xs={10}>
          <span>{"紀錄台: " + appointmentData.judges.join(", ")}</span>
        </Grid>
      </Grid>
    </AppointmentTooltip.Content>
  ));
  
const CommandButton = withStyles(style, { name: 'CommandButton' })(({
    classes, ...restProps
  }) => (
    <AppointmentTooltip.CommandButton {...restProps} className={classes.commandButton} />
  ));

const messages = {
    moreInformationLabel: '',
  };
  
const TextEditor = (props) => {
    // eslint-disable-next-line react/destructuring-assignment
    if (props.type === 'multilineTextEditor') {
      return null;
    } return <AppointmentForm.TextEditor {...props} />;
  };
  
const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
    const onlocationChange = (nextValue) => {
      onFieldChange({ location: nextValue });
    };
    const onjudgesChange = (nextValue) => {
        onFieldChange({ judges: nextValue.split(',').map(x => x.trim())});
      };
  
    return (
      <AppointmentForm.BasicLayout
        appointmentData={appointmentData}
        onFieldChange={onFieldChange}
        {...restProps}
      >
        <AppointmentForm.Label
          text="Location"
          type="title"
        />
        <AppointmentForm.TextEditor
          value={appointmentData.location}
          onValueChange={onlocationChange}
          placeholder="Location"
        />
        <AppointmentForm.Label
          text="Judges"
          type="title"
        />
        <AppointmentForm.TextEditor
          value={(appointmentData.judges)? appointmentData.judges.join(","): undefined}
          onValueChange={onjudgesChange}
          placeholder="Ex: A,B"
        />
      </AppointmentForm.BasicLayout>
    );
  };
  
  export default class Demo extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        data: appointments,
        currentDate: '2021-04-17',
      };
  
      this.commitChanges = this.commitChanges.bind(this);
    }
  
    commitChanges({ added, changed, deleted }) {
      this.setState((state) => {
        let { data } = state;
        if (added) {
          const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
          data = [...data, { id: startingAddedId, ...added }];
        }
        if (changed) {
          data = data.map(appointment => (
            changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
        }
        if (deleted !== undefined) {
          data = data.filter(appointment => appointment.id !== deleted);
        }
        return { data };
      });
    }
  
    render() {
      const { currentDate, data } = this.state;
  
      return (
        <Paper>
          <Scheduler
            data={data}
            height={660}
          >
            <ViewState
              defaultCurrentDate={currentDate}
            />
            <WeekView
              startDayHour={10}
              endDayHour={21}
            />
            <MonthView />
            <Appointments />
            <EditingState
            onCommitChanges={this.commitChanges}
            />
            <IntegratedEditing />
            <Toolbar />
            <DragDropProvider
            allowDrag={allowDrag}
            />
            <DateNavigator />
            <TodayButton />
            <ViewSwitcher />
            <AppointmentTooltip
                headerComponent={Header}
                contentComponent={Content}
                commandButtonComponent={CommandButton}
                showCloseButton
            />
            <AppointmentForm
                basicLayoutComponent={BasicLayout}
                textEditorComponent={TextEditor}
                messages={messages}
            />
          </Scheduler>
        </Paper>
      );
    }
  }