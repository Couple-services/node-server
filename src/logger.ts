import { DEVELOPMENT } from 'consts';
import winston, { Logger } from 'winston';

/**
 * RFC5424 syslog levels are prioritized from 0 to 7 (highest to lowest):
 *
 * emerg: 0
 * alert: 1
 * crit: 2
 * error: 3
 * warning: 4
 * notice: 5
 * info: 6 (development only)
 * debug: 7 (development only)
 *
 * @see https://github.com/winstonjs/winston#logging-levels
 * @see https://github.com/winstonjs/winston#creating-your-own-logger
 */
export function createLogger(level: string): Logger {
  const format = DEVELOPMENT
    ? winston.format.combine(
        winston.format.colorize(),
        winston.format.align(),
        winston.format.simple(),
      )
    : winston.format.json();

  return winston.createLogger({
    levels: winston.config.syslog.levels,
    level,
    transports: [
      new winston.transports.Console({
        format,
      }),
    ],
  });
}

const logger = createLogger(process.env.MAX_LOG_LEVEL ?? 'notice');

export default logger;
