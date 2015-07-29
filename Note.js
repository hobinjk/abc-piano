/* exported Note */

function Note(note, octave, hasAccidental, accidental, duration) {
  this.note = note;
  this.octave = octave;
  this.hasAccidental = hasAccidental;
  this.accidental = accidental;
  this.duration = duration;
}

/**
 * @return {number} The number of the note before accidentals or key
 * signature changes
 */
Note.prototype.getBaseNumber = function() {
  var bases = {
    'a': 0,
    'b': 2,
    'c': 3,
    'd': 5,
    'e': 7,
    'f': 8,
    'g': 10
  };

  return bases[this.note] + 12 * this.octave + 69;
};

/**
 * @return {number} The number of the note after accidentals or key
 * signature changes
 */
Note.prototype.getNumber = function() {
  return this.getBaseNumber() + this.accidental;
};
