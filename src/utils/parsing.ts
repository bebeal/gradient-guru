import Papa, { LocalFile, ParseConfig } from 'papaparse';
import { isDevEnv } from './environment';

/**
 * csv parsing via papaparse
 *
 * @param csv either a string of delimited text, a File object, or a URL (for Remote Files)
 * @param config an optional config
 *    - ...PapaParseConfig: See https://www.papaparse.com/docs#config
 *    - `callback`: Set a callback if csv is a File object.
 *    - `download`: Set to true if downloading a remote file.
 * @returns
 *    - `ParseResultsObject`: When not using streaming or web workers
 *        - data: array of parsed data
 *        - errors: array of errors
 *        - meta: object with extra info
 *    - `Promise<ParseResultsObject>`: If parsing a File object or Remote File (results are returned via callback)
 */

// wrap config in this to auto infer whether this is a remote file download or not
export const remoteParseConfig = (csv?: LocalFile | string, config?: ParseConfig & { download?: any }): ParseConfig => ({
  download: (typeof csv === 'string' && csv.startsWith('http')) || (typeof csv === 'object' && csv.constructor.name === 'URL') || (typeof csv === 'object' && csv.constructor.name === 'File'),
  ...config, // unwrap here that way if user specifies download, it will override the inferred value
});

// wrap config with this for some simple logging
export const debuggerConfig = (config?: ParseConfig & { error?: (error: any) => void }) => ({
  ...config,
  complete: (results: any, file?: any) => {
    config?.complete?.(results, file);
    console.log(results);
  },
  error: (error: any) => {
    config?.error?.(error);
    console.log(error);
  },
});

export const parse = (csv: any, config?: ParseConfig & { [key: string]: any }) => {
  let parserConfig = remoteParseConfig(csv, config);
  if (isDevEnv) {
    parserConfig = debuggerConfig(parserConfig);
  }
  return Papa.parse(csv, parserConfig);
};
export const unparse = Papa.unparse;
