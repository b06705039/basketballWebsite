import News from "../pages/news";
import Default from "../pages/default";
import PreGame from "../pages/preGame";
import Scheduler from "../pages/scheduler";
import SchedulerRead from "../pages/scheduler_readonly";
import Timer from "../pages/Timer";
import Try from "../pages/tryTable";
import InterGame from "../pages/interGame";
import { UserEditor } from "../pages/editor";
import PostNews from "../pages/postNews";
import InChargeGame from "../pages/inChargeGame";
import RecordTeam from "../pages/recordTeam";
import Checkteam from "../pages/Checkteam";
import GameResult from "../pages/gameResult";
// import <pageName> ...

export const pagesMenu = () => {
  return {
    News,
    PreGame,
    Default,
    Try,
    Scheduler,
    Timer,
    UserEditor,
    InterGame,
    PostNews,
    InChargeGame,
    RecordTeam,
    Checkteam,
    GameResult,
    SchedulerRead,
    // pageNmae
  };
};
