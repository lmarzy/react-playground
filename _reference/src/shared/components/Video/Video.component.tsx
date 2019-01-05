import * as React from 'react';
import * as styles from './styles.scss';
import { Button } from '..';

interface VideoState {
  videoIsPlaying: boolean;
}

interface VideoProps {
  id: number;
  continueText: string;
  children?: React.ReactNode;
  onVideoStarted: () => void;
  onVideoWatched: () => void;
  onWatchNow: () => void;
  onWatchLater: () => void;
}

interface VideoNames {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  [key: number]: string;
}

export class Video extends React.Component<VideoProps, VideoState> {
  state = {
    videoIsPlaying: false,
  } as VideoState;

  private nativeVideoElement: React.RefObject<HTMLVideoElement>;

  private videoNames = {
    1: 'Pre Terms and Conditions',
    2: 'Post Terms and Conditions',
    3: 'Open Banking',
    4: 'Pre Budget',
    5: 'Flexi Plan',
  } as VideoNames;

  constructor(props: VideoProps) {
    super(props);
    this.nativeVideoElement = React.createRef();
  }

  handlePlayVideo = (onPlayVideo: () => void): void => {
    onPlayVideo();
    this.nativeVideoElement.current.play();

    if (this.nativeVideoElement.current.webkitEnterFullScreen) {
      this.nativeVideoElement.current.webkitEnterFullScreen();
    }

    this.setState({ videoIsPlaying: true });
  };

  handleNativeElementPlayVideo = (): void => {
    this.props.onVideoStarted();

    if (!this.state.videoIsPlaying) {
      this.setState({ videoIsPlaying: true });
    }
  };

  render(): React.ReactNode {
    const { id, children, continueText, onWatchNow, onWatchLater, onVideoStarted, onVideoWatched } = this.props;
    const { videoIsPlaying } = this.state;

    const vidSrc = `${process.env.CORE_ASSET_URL}/videos/${id}.mp4`;
    const vidImgSrc = `/assets/images/video-image-${id}.png`;

    let videoContainer = styles.videoContainer;

    if (videoIsPlaying) videoContainer += ` ${styles.isPlaying}`;

    return (
      <React.Fragment>
        {!videoIsPlaying && (
          <button type="button" className={styles.videoImage} onClick={() => this.handlePlayVideo(onVideoStarted)}>
            <span className="u-hidden-visually">{`Play the ${this.videoNames[id]} video`}</span>
            <img src={vidImgSrc} alt={`${this.videoNames[id]} video image`} />
          </button>
        )}
        <div className={videoContainer}>
          <video
            ref={this.nativeVideoElement}
            className={styles.video}
            onPlay={this.handleNativeElementPlayVideo}
            controls
          >
            <source src={vidSrc} type="video/mp4" />
          </video>
        </div>

        <div className="u-mb3">{children}</div>

        {!videoIsPlaying ? (
          <React.Fragment>
            <div className="u-bg-path path-1 u-mb3">
              <Button type="button" primary main onClick={() => this.handlePlayVideo(onWatchNow)}>
                Watch now
              </Button>
            </div>
            <Button type="button" primary alt onClick={onWatchLater}>
              Watch later
            </Button>
          </React.Fragment>
        ) : (
          <div className="u-bg-path path-1">
            <Button type="button" primary main onClick={onVideoWatched}>
              {continueText}
            </Button>
          </div>
        )}
      </React.Fragment>
    );
  }
}
