import { NumberSpacingPipe } from './number-spacing.pipe';

describe('NumberSpacingPipe', () => {

  let pipe = new NumberSpacingPipe();

  it('should transform 6 digit number', () => {
    let number = 123456;
    let res: string = pipe.transform(number);
    expect(res).toBe('123 456');
  });

  it('should transform 1 digit number', () => {
    let number = 123456;
    let res: string = pipe.transform(number);
    expect(res).toBe('123 456');
  });

  it('should transform 1 digit number', () => {
    let number = 1;
    let res: string = pipe.transform(number);
    expect(res).toBe('1');
  });

  it('should transform 10 digit number', () => {
    let number = 1234567890;
    let res: string = pipe.transform(number);
    expect(res).toBe('1 234 567 890');
  });

  it('should not transform -1', () => {
    let number = -1;
    let res: string = pipe.transform(number);
    expect(res).toBe(null);
  });

  it('should not transform 0', () => {
    let number = 0;
    let res: string = pipe.transform(number);
    expect(res).toBe(null);
  });
});
