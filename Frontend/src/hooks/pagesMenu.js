import News from "../pages/news";
import Default from "../pages/default";
import PreGame from "../pages/preGame";
import Scheduler from "../pages/scheduler";
import Timer from "../pages/Timer";
import Try from "../pages/tryTable";
import InterGame from '../pages/interGame'
import { UserEditor } from "../pages/editor";
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
    InterGame
    // pageNmae
  };
};
