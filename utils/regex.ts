
// Regex for validating common data types
// Valid Formats:
// 2023-11-21
export const dateRegex = new RegExp(/^\d{4}-\d{2}-\d{2}$/);

// Validates most URLs
// Valid Formats:
// https://www.example.com
export const urlRegex = new RegExp(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/);

// Phone Number Regex: https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
// Valid Formats:
// (123) 456-7890
// (123).456-7890
// 1234567890
// +31636363634
export const phoneNumberRegex = new RegExp(/^[\+]?([0-9][\s]?|[0-9]?)([(][0-9]{3}[)][\s]?|[0-9]{3}[-\s\.]?)[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);

// Validates most common email formats
// Valid Formats:
// test@example.com
export const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

// Validates US ZIP codes (5 digits or 5-4 format)
// Valid Formats:
// 12345
// 12345-1234
export const postalCodeRegex = new RegExp(/^\d{5}(-\d{4})?$/);
