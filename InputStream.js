function InputStream(input) {
  this.input = input;
  this.index = 0;
}

/**
 * @param {number} len
 * @return {boolean} If there are at least len characters
 * left in the input
 */
InputStream.prototype.canPeek = function(len) {
  return this.index + len < this.input.length;
};

/**
 * @param {number} len
 * @return {String} The next len characters
 */
InputStream.prototype.peek = function(len) {
  if (!this.canPeek(len)) {
    throw new Error('Out of data');
  }
  return this.input.substr(this.index, len);
};

/**
 * Consumes and returns len characters from input
 * @param {number} len
 * @return {String}
 */
InputStream.prototype.take = function(len) {
  var str = this.peek(len);
  this.index += len;
  return str;
};

/**
 * Attempts to take len characters and parse as integer
 * @param {number} len
 * @return {number}
 */
InputStream.prototype.takeInt = function(len) {
  var str = this.take(len);
  return parseInt(str);
};

/**
 * Takes from input until chr is encountered (non-inclusive)
 * @param {String} chr
 * @return {String}
 */
InputStream.prototype.takeUntil = function(chr) {
  var idx = this.input.indexOf(chr, this.index);
  if (idx < 0) {
    throw new Error('"' + chr + '" not found');
  }
  var str = this.input.substring(this.index, idx);
  this.index = idx;
  return str;
};
