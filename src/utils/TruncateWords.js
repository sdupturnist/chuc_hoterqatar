/**
 * Truncates a string to a specified number of words.
 * @param {string} text - The text to truncate.
 * @param {number} maxWords - The maximum number of words to keep.
 * @param {string} [endString='...'] - The string to append if text is truncated.
 * @returns {string} - The truncated text.
 */
export function truncateWords(text, maxWords, endString = '...') {
    const words = text.split(' ');
    return words.length > maxWords
      ? words.slice(0, maxWords).join(' ') + endString
      : text;
  }
  