import { Injectable } from '@angular/core';
import { Logger, LoggerOutput, OutputChannel, OutputLevel } from '@models/logger';

@Injectable({
  providedIn: 'root'
})
export class LoggerService implements Logger {

  public readonly [OutputChannel.Error] = new LoggerService.Styles(OutputChannel.Error);

  public readonly [OutputChannel.Debug] = new LoggerService.Styles(OutputChannel.Debug);

  public readonly [OutputChannel.Warn] = new LoggerService.Styles(OutputChannel.Warn);

  public readonly [OutputChannel.Log] = new LoggerService.Styles(OutputChannel.Log);

  public readonly [OutputChannel.Info] = new LoggerService.Styles(OutputChannel.Info);


  public static readonly Styles = class implements LoggerOutput {

    /**
     * This one doesn't make a lot of sense when the level is error,
     * but lets let the user decide that
     */
    public readonly [OutputLevel.Failed] = this._output.bind(this, OutputLevel.Failed);
    public readonly [OutputLevel.Info] = this._output.bind(this, OutputLevel.Info);
    public readonly [OutputLevel.Success] = this._output.bind(this, OutputLevel.Success);

    private readonly baseStyle = 'font-width: bold;';

    constructor(
      private readonly channel: OutputChannel,
    ) {}

    private _output(status: string, title?: string, ...messages: unknown[]) {
      let titleColor = status;
      switch(status) {
        case OutputLevel.Success:
          titleColor = 'green';
          break;

        case OutputLevel.Info:
          titleColor = 'blue';
          break;

        case OutputLevel.Failed:
          titleColor = 'red';
      }
      console[this.channel](`%c${title}`, this.titleStyle(titleColor), ...messages);
    }

    private titleStyle(color: string, block: boolean = true) {
      if(block) `${this.baseStyle} display: block;`;
      return `${this.baseStyle} color: ${color};`;
    }
  };
}
