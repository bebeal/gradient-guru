// Determines if an object is empty, false for anything else.
export const isEmptyObject = (obj?: object) => (obj ? Object.keys(obj)?.length === 0 : false);
