export const toBase64 = (text: string): string => {
  return typeof window === "undefined"
    ? Buffer.from(text).toString("base64")
    : window.btoa(text);
};
