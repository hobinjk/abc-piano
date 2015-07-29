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
