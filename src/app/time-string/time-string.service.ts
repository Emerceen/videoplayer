export class TimeString {
  toHHMMSS(secNum: number): string {
    if (secNum === 0) {
      return '0:00';
    }
    secNum = Math.ceil(secNum);
    let hours   = Math.floor(secNum / 3600);
    let minutes = Math.floor((secNum - (hours * 3600)) / 60);
    let seconds = secNum - (hours * 3600) - (minutes * 60);

    return this.createTimeString(hours, minutes, seconds);
  }

  private createTimeString(hours: number, minutes: number, seconds: number): string {
    if (hours > 0) {
      return hours + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
    } else if (minutes > 0) {
      return minutes + ':' + ('0' + seconds).slice(-2);
    } else if (seconds > 0) {
      return 0 + ':' + ('0' + seconds).slice(-2);
    }
  }
}
