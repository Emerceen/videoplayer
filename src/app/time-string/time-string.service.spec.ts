import { TimeString } from './time-string.service';

describe('TimeString', () => {
  let timeString = new TimeString();
  describe('toHHMMSS()', () => {
    it('should return "0:00", when method is caled with "0"', () => {
      expect(timeString.toHHMMSS(0)).toBe('0:00');
    });

    it('should return "1:00:00", when method is caled with "3600"', () => {
      expect(timeString.toHHMMSS(3600)).toBe('1:00:00');
    });

    it('should return "1:01:01", when method is caled with "3661"', () => {
      expect(timeString.toHHMMSS(3601)).toBe('1:00:01');
    });

    it('should return "1:00", when method is caled with "60"', () => {
      expect(timeString.toHHMMSS(60)).toBe('1:00');
    });

    it('should return "1:01", when method is caled with "61"', () => {
      expect(timeString.toHHMMSS(61)).toBe('1:01');
    });

    it('should return "0:01", when method is caled with "1"', () => {
      expect(timeString.toHHMMSS(1)).toBe('0:01');
    });
  });
});
