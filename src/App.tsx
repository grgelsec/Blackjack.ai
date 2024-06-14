//import MoneyRecord from "./components/betstotalParent"

import Bet from "./components/bets";
import MoneyRecord from "./components/betstotalParent";
import GameControls from "./components/gameParent";

function App() {
  return (
    <>
      <div className="flex justify-center">
        <GameControls />
      </div>
    </>
  );
}

export default App;
