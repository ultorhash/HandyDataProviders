import { SnackbarTypes } from "./snackbar.enum";

/** Default configuration for Angular Material snackbar. */
interface ISnackbarBase {

  /** The specific type in `SnackbarTypes`. */
  type: SnackbarTypes;

  /** Message to show. */
  message: string;
}

/** Additional data to interact with user. */
export interface ISnackbarData extends ISnackbarBase {

  /** Time to auto-close in milliseconds */
  duration: number;

  /** Name that appears on dismiss button. Default to `OK`. */
  action?: string;
}
