//import substanceTransmitters from "../data/substances_transmitters.json"
// function Foo() {}
// Foo.prototype.bar = function () {};
// var x = new Foo();
// x.bar();

// dont think just do!!!!

let NeuroSystem = {
  acetylcholine: 0,
  serotonin: 0,
  dopamine: 0,
  gaba: 0,
  glutamate: 0,
  norepinephrine: 0,
  testosterone: 0,
  transmitterCount: 7,
  health: 100,

  // modifys a transmitter of the current object.
  modTransmitter(transmitter, increment) {
    if (Object.keys(this).filter((x) => x == transmitter).length > 0) {
      this[transmitter] += increment;
      //alert(this[transmitter]);
    } else {
      //alert("Transmitter not found.");
    }
  },
  displayLevels() {
    for (let i = 0; i < this.transmitterCount; i++)
      console.log(Object.keys(this)[i] + ": " + this[Object.keys(this)[i]]);
  },
  // fetches the objects variable name by index.
  getTransmitterByIndex(i) {
    try {
      if (i < this.transmitterCount) {
        return Object.keys(this)[i];
      } else {
        throw "index out of bounds.";
      }
    } catch (err) {
      console.log("The following error has occured", err);
    }
  },
  getTransmitters() {
    let transmitters = [];
    for (let i = 0; i < this.transmitterCount; i++)
      transmitters.push(Object.keys(this)[i]);

    return transmitters;
  },
  amIFried() {
    return this.health <= 0;
  },
};

module.exports = { NeuroSystem };
