/* global Note, stringCount */
/* exported Parser */

function Parser(input) {
  this.input = input;
  this.header = [];
  this.notes = [];

  this.accidentals = {};
  this.keySignature = {
    'a': 0,
    'b': 0,
    'c': 0,
    'd': 0,
    'e': 0,
    'f': 0,
    'g': 0
  };
  this.durationFactor = 500;
}

/**
 * Parse the duration part of a note
 * @param {String} durationRaw
 * @return {number} duration
 */
Parser.prototype.parseDuration = function(durationRaw) {
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
};

/**
 * Parse a single note
 * @return {Note}
 */
Parser.prototype.parseNote = function() {
  var noteStr = this.input.peekToEnd();
  var noteParts = noteStr.match(/(_*|\^*|=)([a-gA-G])(,*|'*)(\d*\/?\d*)/);
  this.input.take(noteParts[0].length);

  var accidentalRaw = noteParts[1];
  var noteRaw = noteParts[2];
  var octaveRaw = noteParts[3];
  var durationRaw = noteParts[4];

  var accidental = stringCount(accidentalRaw, '^') -
                   stringCount(accidentalRaw, '_');
  var hasAccidental = accidental !== 0;
  if (accidentalRaw === '=') {
    accidental = 0;
    hasAccidental = true;
  }

  var note = noteRaw.toLowerCase();
  var octave = stringCount(octaveRaw, '\'') - stringCount(octaveRaw, ',');
  if (noteRaw === noteRaw.toLowerCase()) {
    octave += 1;
  }
  var duration = this.parseDuration(durationRaw);

  return new Note(note, octave, hasAccidental, accidental, duration);
};

/**
 * Parse the entire input
 */
Parser.prototype.parse = function() {
  this.parseHeader();
  while (this.input.canPeek(1)) {
    switch (this.input.peek(1)) {
    case ' ':
      this.input.take(1);
      break;
    case '|':
    case ']':
    case '[':
      this.advanceMeasure();
      break;
    default:
      var note = this.parseNote();
      var base = note.getBaseNumber();
      if (note.hasAccidental) {
        this.accidentals[base] = note.accidental;
      } else if (this.accidentals.hasOwnProperty(base)) {
        note.hasAccidental = true;
        note.accidental = this.accidentals[base];
      } else {
        note.accidental = this.keySignature[note.note];
      }
      this.notes.push(note);
      break;
    }
  }
};

/**
 * Parse the header section of the input
 */
Parser.prototype.parseHeader = function() {
  while (this.input.canPeek(2)) {
    var isHeader = /[A-Z]:/.test(this.input.peek(2));
    if (!isHeader) {
      break;
    }
    this.header.push(this.input.takeLine());
  }
};

/**
 * Seek forward by one measure
 */
Parser.prototype.advanceMeasure = function() {
  while (this.input.canPeek(1)) {
    switch (this.input.peek(1)) {
      case '|':
      case ']':
      case '[':
        this.input.take(1);
        continue;
      default:
        break;
    }
  }
  this.accidentals = {};
};
