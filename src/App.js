import logo from "./logo.svg";
// transmitter table
import substanceTransmitters from "./data/substances_transmitters.json";
// substance list data
import substances from "./data/substances.json";
// transmitter list data
import transmitters from "./data/transmitters.json";
// nervous system object which houses and manages all nerutransmitters
import { NeuroSystem } from "./classes/neurotransmitter";
import "./App.css";
import { useState } from "react";
import ModalBox from "./components/Modalbox/ModalBox";

function App() {
  const [neuroSystem, setNeuroSystem] = useState(NeuroSystem);
  const [showModal, setShowModal] = useState(false);
  const [modalHeading, setModalHeading] = useState("");
  const [modalContent, setModalContent] = useState("");
  const displayModalFried = () => {
    setModalHeading("Neutrino");
    setModalContent("Nervous system is fried");
    setShowModal(true);
  };
  return (
    <div className="App">
      {showModal && (
        <ModalBox
          display={setShowModal}
          heading={modalHeading}
          content={modalContent}
        />
      )}
      <h1>Welcome to Neurotrino</h1>
      {/* {well change this container later its just for the demo.} */}
      <div className="flex-container">
        <div>Health:{neuroSystem.health > 0 ? neuroSystem.health : 0}</div>
        {/* render the substance boxes. */}
        {substances.map((substance) => (
          <div
            onClick={() => {
              if (!neuroSystem.amIFried()) {
                // find the index of the substance so we can get the effect values.
                let iOfSubstance = substanceTransmitters.findIndex(
                  (substanceTransmitter) =>
                    substanceTransmitter.substance == substance.name
                );
                // if we have found the substance.
                if (iOfSubstance > -1) {
                  // store the effects.
                  const effects =
                    substanceTransmitters[iOfSubstance]["effects"];
                  let nervousSystemHealth = neuroSystem.health;
                  // foreach effect modify the neuroSystem.
                  Object.keys(effects).forEach((e, i) => {
                    if (!neuroSystem.amIFried()) {
                      // if the current effect at index i is a numerical value then update
                      // the state of the neuroSystem.
                      if (!isNaN(parseInt(effects[e]))) {
                        let newTransmitterVal = neuroSystem[e] + effects[e];
                        // update the health of the nercous system
                        nervousSystemHealth +=
                          newTransmitterVal < 0
                            ? transmitters[e].low * newTransmitterVal
                            : transmitters[e].high * (newTransmitterVal * 0.5);
                        setNeuroSystem((neuroSystem) => ({
                          ...neuroSystem,
                          ...{
                            [e]: newTransmitterVal,
                          },
                        }));
                      }
                    }
                  });
                  setNeuroSystem((neuroSystem) => ({
                    ...neuroSystem,
                    health: nervousSystemHealth,
                  }));
                  if (nervousSystemHealth <= 0) {
                    displayModalFried();
                  }
                } else {
                  // the desired substance cannot be found.
                  // all substances with effects are to be added in this json file just below.
                  // alert("substance not found in substances_transmitters.json");
                  setModalHeading("Internal Error");
                  setModalContent(
                    "Substance not found in substances_transmitters.json"
                  );
                  setShowModal(true);
                }
              } else {
                displayModalFried();
              }
            }}
          >
            <img
              style={{ height: 100, width: "auto" }}
              src={process.env.PUBLIC_URL + "/images/" + substance.img}
            ></img>
            <div>
              {substance.name[0].toUpperCase() +
                substance.name.slice(1, substance.name.length)}
            </div>
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
