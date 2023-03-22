import { ServicesError } from "src/errors/servicesError";

class Timer {
  private startTime: number | null = null;
  start = () => {
    this.startTime = Date.now();
  };
  getDifference = (): string => {
    if (!this.startTime) {
      throw ServicesError.TimerError("countdown was not started.");
    }
    const dif = Date.now() - this.startTime;
    const result = `${dif / 1000}ms`;
    return result;
  };
}

const timer = new Timer();
export default timer;
