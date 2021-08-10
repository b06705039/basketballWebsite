import News from "../pages/news";
import Default from "../pages/default";
import PreGamePage from "../pages/preGamePage";
import InterGamePage from "../pages/interGamePage";
import Scheduler from "../pages/scheduler";
import SchedulerRead from "../pages/scheduler_readonly";
import Timer from "../pages/Timer";
import Try from "../pages/tryTable";
import { UserEditor } from "../pages/editor";
import PostNews from "../pages/postNews";
import InChargeGame from "../pages/inChargeGame";
import RecordTeam from "../pages/recordTeam";
import RecordPlayer from "../pages/recordPlayer";
import Checkteam from "../pages/Checkteam";

export const pagesMenu = () => {
  return {
    News,
    PreGamePage,
    Default,
    Try,
    Scheduler,
    Timer,
    UserEditor,
    InterGamePage,
    PostNews,
    InChargeGame,
    RecordTeam,
    RecordPlayer,
    Checkteam,
    SchedulerRead,
  };
};
