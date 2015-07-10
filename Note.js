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
  return this.note.charCodeAt(0) - 'a'.charCodeAt(0) + 12 * this.octave + 69;
};

/**
 * @return {number} The number of the note after accidentals or key
 * signature changes
 */
Note.prototype.getNumber = function() {
  return this.getBaseNumber() + this.accidental;
};
