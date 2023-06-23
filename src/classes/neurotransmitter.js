//import substanceTransmitters from "../data/substances_transmitters.json"
// function Foo() {}
// Foo.prototype.bar = function () {};
// var x = new Foo();
// x.bar();

// dont think just do!!!!

let NeuroSystem = {
  acetylcholine: 50,
  serotonin: 50,
  dopamine: 50,
  gaba: 50,
  glutamate: 50,
  norepinephrine: 50,
  testosterone: 50,
  transmitterCount: 7,

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
};

module.exports = { NeuroSystem };
