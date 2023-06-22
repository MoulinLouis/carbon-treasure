const fs = require("fs");
import path from "path";

export class LoggerUtils {
  private static filePath = "./data/log.txt";

  public static write(message: string) {
    /* istanbul ignore next */
    if (process.env.NODE_ENV !== "test") {
      const timestamp = new Date().toISOString();
      fs.appendFileSync(
        path.resolve(this.filePath),
        `${timestamp} - ${message}\n`
      );
    }
  }
}
