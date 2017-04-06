import { VideoControls } from './video-controls';

describe('VideoControls', () => {
  let videoControls: VideoControls;
  it('should create VideoControls object when properties are not passed', () => {
    videoControls = new VideoControls();
    expect(videoControls instanceof VideoControls).toBeTruthy();
    expect(videoControls.played).toBeFalsy();
    expect(videoControls.stopped).toBeTruthy();
    expect(videoControls.repeated).toBeFalsy();
  });

  it('should create VideoControls object when properties are passed', () => {
    videoControls = new VideoControls(true, false, true);
    expect(videoControls instanceof VideoControls).toBeTruthy();
    expect(videoControls.played).toBeTruthy();
    expect(videoControls.stopped).toBeFalsy();
    expect(videoControls.repeated).toBeTruthy();
  });
});
