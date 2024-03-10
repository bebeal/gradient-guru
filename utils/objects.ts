
// Determines if an object is empty, false for anything else.
export const objectIsEmpty = (obj?: object) => (obj ? Object.keys(obj)?.length === 0 : false);
