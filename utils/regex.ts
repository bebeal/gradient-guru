// Regex for validating common data types
// Valid Formats:
// 2023-11-21
export const dateRegex = new RegExp(/^\d{4}-\d{2}-\d{2}$/);

// Validates most URLs
// Valid Formats:
// https://www.example.com
// export const urlRegex = new RegExp(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/);
export const urlRegex = new RegExp(
  /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i,
);

// Phone Number Regex: https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
// Valid Formats:
// (123) 456-7890
// (123).456-7890
// 1234567890
// +31636363634
export const phoneNumberRegex = new RegExp(/^[+]?([0-9][\s]?|[0-9]?)([(][0-9]{3}[)][\s]?|[0-9]{3}[-\s.]?)[0-9]{3}[-\s.]?[0-9]{4,6}$/im);

// Validates most common email formats
// Valid Formats:
// test@example.com
export const emailRegex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);

// Validates US ZIP codes (5 digits or 5-4 format)
// Valid Formats:
// 12345
// 12345-1234
export const postalCodeRegex = new RegExp(/^\d{5}(-\d{4})?$/);

// Validates markdown code blocks with language definitions (e.g. ```javascript or ~~~html)
export const backtickInputRegex = /^```([a-z]+)?[\s\n]$/;
export const tildeInputRegex = /^~~~([a-z]+)?[\s\n]$/;

// Validates Markdown Syntax
export const markdownRegex = (text: string): boolean => {
  // code
  const fences = text.match(/^```/gm);
  if (fences && fences.length > 1) return true;
  // link
  if (text.match(/\[[^]+]\(https?:\/\/\S+\)/gm)) return true;
  if (text.match(/\[[^]+]\(\/\S+\)/gm)) return true;
  // heading
  if (text.match(/^#{1,6}\s+\S+/gm)) return true;
  // list
  const listItems = text.match(/^[\d-*].?\s\S+/gm);
  if (listItems && listItems.length > 1) return true;
  return false;
};

// Validates a color in hex, rgb, or rgba format
// Hexadecimal colors with 3, 4, 6, or 8 digits (the latter two include the alpha channel) like #fff, #ffffff, #f00, #ff0000, #0f0, #00ff00, #000f, #0000ff00.
// RGB colors like rgb(255, 0, 72).
// RGBA colors like rgba(255, 0, 72, 0.5).
export const colorRegex = /#([0-9A-Fa-f]{3}){1,2}([0-9A-Fa-f]{2})?|rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*(0|1|0?\.\d+))?\s*\)/g;
// export const colorRegex = /^#(?:[0-9a-f]{3}){1,2}(?:[0-9a-f]{2})?$|^rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(?:,\s*(0|1|0?\.\d+))?\)$/i;

// For LaTeX math syntax
// Inline math: The Pythagorean theorem is $a^2 + b^2 = c^2$.
// Block math: The Pythagorean theorem is $$a^2 + b^2 = c^2$$.
export const inlineMath = /\$(.+?)\$/g;
export const blockMath = /\$\$(.+?)\$\$/g;
