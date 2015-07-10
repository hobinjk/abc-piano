/* exported stringCount */

function stringCount(base, needle) {
  var count = 0;
  for (var i = 0; i < base.length - needle.length; i++) {
    if (base.substr(i, needle.length) === needle) {
      count++;
    }
  }
  return count;
}
