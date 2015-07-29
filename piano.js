/* global Parser, InputStream, MIDI */
/* jshint browser: true, devel: true */

var song = 'X:1\n' +
'T:Speed the Plough\n' +
'M:4/4\n' +
'C:Trad.\n' +
'K:G\n' +
'|:GABc dedB|dedB dedB|c2ec B2dB|c2A2 A2BA|\n' +
'GABc dedB|dedB dedB|c2ec B2dB|A2F2 G4:|\n' +
'|:g2gf gdBd|g2f2 e2d2|c2ec B2dB|c2A2 A2df|\n' +
'g2gf g2Bd|g2f2 e2d2|c2ec B2dB|A2F2 G4:|\n';
var parser = new Parser(new InputStream(song));
parser.parse();
var notes = parser.notes;
console.log(notes);


MIDI.loadPlugin({
  soundfontUrl: './lib/soundfont/',
  instrument: 'acoustic_grand_piano',
  onsuccess: function() {
    var time = 0; // play one note every quarter second
    var note = 50; // the MIDI note
    var velocity = 127; // how hard the note hits
    // play the note
    MIDI.setVolume(0, 127);
    for (var note of notes) {
      MIDI.noteOn(0, note.getNumber(), velocity, time);
      MIDI.noteOff(0, note.getNumber(), time + note.duration / 1.5);
      time += note.duration;
    }
  }
});
