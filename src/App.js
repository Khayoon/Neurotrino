import substanceTransmitters from "./data/substances_transmitters.json";
// substance list data
import substances from "./data/substances.json";
// transmitter list data
import transmitters from "./data/transmitters.json";
// nervous system object which houses and manages all nerutransmitters
import { NeuroSystem } from "./classes/neurotransmitter";
import "./App.css";
import { useEffect, useState } from "react";
import ModalBox from "./components/Modalbox/ModalBox";
//import avatars from './assets/avatars';
import avatarwave from './assets/avatarwave.png';
import awkward from './assets/awkward.png';
import awe from './assets/awe.png';
import chatty from './assets/chatty.png';
import confident from './assets/confident.png';
//import ecstatic from './assets/ecstatic.png';
import excited from './assets/excited.png';
import laughing from './assets/laughing.png';
import nap from './assets/nap.png';
import rage0 from './assets/rage0.png';
import rage1 from './assets/rage1.png';
import rage2 from './assets/rage2.png';
import satisfied from './assets/satisfied.png';
import scared from './assets/scared.png';
import squeeing from './assets/squeeing.png';
let avatar = avatarwave; // Default

function App() {
  const [neuroSystem, setNeuroSystem] = useState( NeuroSystem);
  const [showModal, setShowModal] = useState(false);
  const [modalHeading, setModalHeading] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [avatar, setAvatar] = useState(""); // Add the avatar state


 useEffect(() => {
  let transmitterLevels = neuroSystem;
  let selectedAvatar = avatarwave; // Default avatar

  if (transmitterLevels.acetylcholine > 0) {
    selectedAvatar = chatty;
  } else if (transmitterLevels.serotonin > 0) {
    selectedAvatar = laughing; // Happy
  } else if (transmitterLevels.dopamine > 0) {
    selectedAvatar = satisfied; // Satisfied
  } else if (transmitterLevels.gaba > 0) {
    selectedAvatar = nap; // Relaxed
  } else if (transmitterLevels.glutamate > 0) {
    selectedAvatar = excited; // Excited
  } else if (transmitterLevels.norepinephrine === 2) {
    selectedAvatar = rage2; // Highest level of rage
  } else if (transmitterLevels.norepinephrine === 1) {
    selectedAvatar = rage1; // Lower level of rage
  } else if (transmitterLevels.testosterone > 0) {
    selectedAvatar = confident; // Confident
  }

  if (transmitterLevels.testosterone < 0) {
    selectedAvatar = scared; // Show "scared" when testosterone falls
  }

  setAvatar(selectedAvatar);
}, [neuroSystem]);



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
      <h1>Neurotrinsmitters in your day simulator</h1>
      {/* Avatar */}
      <div className="avatar">
        <img src={avatar} alt="Avatar" className="avatar-image" />
      </div>
      {/* Here we show the stats */}
      <div className="stats">
        <div>Health: {neuroSystem.health > 0 ? neuroSystem.health : 0}</div>
        {/* This shows the Neurotransmitter stats */}
        <div className="flex-container-stack">
          {neuroSystem.getTransmitters().map((transmitter) => (
            <div>
              {transmitter +
                ": " +
                Math.round((neuroSystem[transmitter] + Number.EPSILON) * 100) /
                  100 +
                "%"}
            </div>
          ))}
        </div>
      </div>
      {/* render the substance boxes. */}
      <div className="flex-container">
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
                    displayModalFried(); // Here is where displayModalFried is being used
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
                displayModalFried(); // And here
              }
            }}>
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
    </div>
  );
}

export default App;
