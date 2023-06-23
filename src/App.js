import logo from "./logo.svg";
// transmitter table
import substanceTransmitters from "./data/substances_transmitters.json";
// substance list
import substances from "./data/substances.json";
// nervous system object which houses and manages all nerutransmitters
import { NeuroSystem } from "./classes/neurotransmitter";
import "./App.css";
import { useState } from "react";

// manage object using usestate structure
// setNeuroSystem((neuroSystem) => ({
//   ...neuroSystem,
//   ...{ acetylcholine: "40" },
// }));

function App() {
  const [neuroSystem, setNeuroSystem] = useState(NeuroSystem);

  return (
    <div className="App">
      <h1>Welcome to Neurotrino</h1>
      {/* For testing purposes. */
      /*<button
        onClick={() => {
          neuroSystem.displayLevels();
        }}
      >
        Display levels
      </button>*/}
      {/* well change this container later its just for the demo. */}
      <div className="flex-container">
        {/* render the substance boxes. */}
        {substances.map((substance) => (
          <div
            onClick={() => {
              // find the index of the substance so we can get the effect values.
              let iOfSubstance = substanceTransmitters.findIndex(
                (substanceTransmitter) =>
                  substanceTransmitter.substance == substance
              );
              // if we have found the substance.
              if (iOfSubstance > -1) {
                // store the effects.
                const effects = substanceTransmitters[iOfSubstance]["effects"];
                // foreach effect modify the neuroSystem.
                Object.keys(effects).forEach((e, i) => {
                  // if the current effect at index i is a numerical value then update
                  // the state of the neuroSystem.
                  if (!isNaN(parseInt(effects[e]))) {
                    // set the state of the object.
                    setNeuroSystem((neuroSystem) => ({
                      ...neuroSystem,
                      ...{ [e]: neuroSystem[e] + effects[e] },
                    }));
                  }
                });
              } else {
                // the desired substance cannot be found.
                // all substances with effects are to be added in this json file just below.
                alert("substance not found in substances_transmitters.json");
              }
            }}
          >
            {substance}
          </div>
        ))}
      </div>
      {/* all neurotransmitters with their levels rendered here  */}
      <div className="flex-container-stack">
        {neuroSystem.getTransmitters().map((transmitter) => (
          <div>{transmitter + ": " + neuroSystem[transmitter]}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
