function parseDuration(durationRaw) {
  if (durationRaw.length === 0) {
    return 1;
  }
  var durationParts = durationRaw.match(/(\d*)(\/*)(\d*)/);
  if (!durationParts) {
    throw new Error('Misformatted duration: ' + durationRaw);
  }
  var durationNumerator = parseInt(durationParts[1]) || 1;
  var defaultDenominator = Math.pow(2, durationParts[2].length);
  var durationDenominator = parseInt(durationParts[3]) || defaultDenominator;
  return durationNumerator / durationDenominator;
}

function parseNote(inputStream) {
  var noteStr = inputStream.peek(12);
  var noteParts = noteStr.match(/([_\^]*)([a-gA-G])([,']*)(\d*\/\d*)/);
  inputStream.seek(noteParts[0].length);

  var accidentalRaw = noteParts[1];
  var noteRaw = noteParts[2];
  var octaveRaw = noteParts[3];
  var durationRaw = noteParts[4];

  var accidental = stringCount(accidentalRaw, '^') - stringCount(accident, '_');
  var note = noteRaw.toLowerCase();
  var octave = stringCount(octaveRaw, '\'') - stringCount(octaveRaw, ',');
  if (noteRaw.isLowerCase()) {
    octave += 1;
  }
  var duration = parseDuration(durationRaw);

  return new Note(note, octave, accidental, duration);
}

function Note(note, octave, hasAccidental, accidental, duration) {
  this.note = note;
  this.octave = octave;
  this.hasAccidental = hasAccidental;
  this.accidental = accidental;
  this.duration = duration;
}

Note.prototype.getBaseNumber = function() {
  return this.note.charCodeAt(0) - 'a'.charCodeAt(0) + 12 * this.octave;
};

Note.prototype.getNumber = function() {
  return this.getBaseNumber() + this.accidental;
};

function Parser() {
  this.data = data;
  this.index = 0;
  this.header = [];
}

Parser.prototype.parse = function() {
  this.parseHeader();
  while (this.index < this.data.length) {
    var measure = this.parseMeasure();
    var note = parseNote(this.peek(12));
    this.seek(noteLength);
    var notes = this.getNotes(measure);
  }
};

Parser.prototype.parseHeader = function() {
  while (this.index < this.data.length) {
    var isHeader = /[A-Z]:/.test(this.peek(2));
    if (!isHeader) {
      break;
    }
    this.header.push(this.takeLine());
  }
};

Parser.prototype.parseMeasure = function() {
};

Parser.prototype.getNotes = function(measure) {
};

function playNote() {
  // blah blah midi.js
  // LPF Apparently simulates dynamics
}
