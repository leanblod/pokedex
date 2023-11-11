import { InjectionToken } from "@angular/core";

export type Logger = {
  readonly [channel in OutputChannel]: LoggerOutput;
};

export const Logger = new InjectionToken<Logger>('Logger Token');

export enum OutputChannel {
  Debug='debug',
  Error='error',
  Warn='warn',
  Log='log',
  Info='info',
}

export type LoggerOutput = {
  readonly [level in OutputLevel]: (title?: string, ...messages: unknown[]) => unknown;
}

export enum OutputLevel {
  Failed='failed',
  Info='info',
  Success='success',
}
