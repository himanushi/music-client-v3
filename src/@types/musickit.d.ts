/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */

// version: "3.2130.7-prerelease"
declare namespace MusicKit {
  interface Config {
    developerToken: string;
    app: {
      name: string;
      build: string;
    };
  }

  function configure(config: Config): MusicKitInstance;
  function getInstance(): MusicKitInstance;
  function formatMediaTime(seconds: number, separator?: string): string;

  interface MusicKitInstance {
    api: API;
    bitrate: number;
    developerToken: string;
    isAuthorized: boolean;
    isRestricted: boolean;
    medianDownlink: number;
    musicUserToken: string;
    playbackState: number;
    playbackTargetAvailable?: any;
    player: SerialPlayback;
    previewOnly: boolean;
    privateEnabled: boolean;
    siriInitiated: boolean;
    storefrontId: string;
    readonly storefrontCountryCode: string;
    storekit: StoreKit;
    subscribeFamilyURL: string;
    subscribeIndividualURL: string;
    subscribeStudentURL: string;
    subscribeURL: string;
    version: string;
    volume: number;
    currentPlaybackTime: number;
    currentBufferedProgress: number;
    isPlaying: boolean;

    addEventListener(eventName: string, callback: (result: any) => any): void;
    removeEventListener(
      eventName: string,
      callback: (result: any) => any
    ): void;
    addToLibrary(e, t?): Promise;
    authorize(): Promise<string>;
    changeToMediaAtIndex(e): Promise;
    cleanup(): Promise;
    clearQueue(): Promise;
    deferPlayback(): Promise;
    me(): Promise;
    pause(): Promise;
    play(): Promise;
    playLater(e): Promise;
    playNext(e, t): Promise;
    seekBackward(): Promise;
    seekForward(): Promise;
    seekToTime(e): Promise;
    setQueue(e): Promise;
    skipToNextItem(): Promise;
    skipToPreviousItem(): Promise;
    stop(): Promise;
    unauthorize(): Promise<any>;
  }

  interface StoreKit {
    apiBase: string;
    authorizationStatus: number;
    cid?: any;
    developerToken: string;
    eligibleForSubscribeView: boolean;
    hasAuthorized: boolean;
    persist: string;
    playBase: string;
    prefix: string;
    restrictedEnabled: boolean;
    storage: any;
    storagePrefix: string;
    storefrontCountryCode: string;
    storefrontIdentifier: string;
    userToken: string;
    userTokenIsValid: boolean;
  }

  interface API {
    music(endpoint: string, params: Record<string, any>): APIResult;
    developerToken: string;
    enablePlayEquivalencies: boolean;
    headers: any;
    library: any;
    method: string;
    prefix: string;
    storage: any;
    ttl: number;
    url: string;
    userToken: string;
    needsEquivalents: boolean;
    storefrontId: string;

    song(appleId: string): Promise<Song>;
    songs(appleIds: string[]): Promise<Song[]>;
  }

  interface APIResult {
    data: {
      results: {
        "library-songs"?: {
          data: APIResultData[];
        };
      };
    };
  }

  interface APIResultData {
    id: string;
    type: string;
    href: string;
    attributes: {
      name: string;
      playParams: {
        purchasedId?: string;
      };
    };
  }

  interface BaseProperty {
    type: string;
    id: string;
    href: string;
  }

  interface Relationship {
    data: BaseProperty[];
    href: string;
  }

  interface Song extends BaseProperty {
    attributes: SongAttributes;
    relationships: {
      albums: Relationship[];
      artists: Relationship[];
    };
  }

  interface SongAttributes {
    albumName: string;
    artistName: string;
    artwork: ArtWork;
    composerName: string;
    discNumber: number;
    durationInMillis: number;
    genreNames: string[];
    hasLyrics: boolean;
    isrc: string;
    name: string;
    playParams: {
      id: string;
      kind: string;
    };
    previews: {
      url: string;
    }[];
    releaseDate: string;
    trackNumber: number;
    url: string;
  }

  interface ArtWork {
    bgColor: string;
    height: number;
    textColor1: string;
    textColor2: string;
    textColor3: string;
    textColor4: string;
    url: string;
    width: number;
  }

  interface SerialPlayback {
    _registry: { playbackStateDidChange: any[] };
    bitrate: number;
    canSupportDRM: boolean;
    continuous: boolean;
    currentPlaybackDuration: NaN | number;
    currentPlaybackProgress: number;
    currentPlaybackTime: number;
    currentPlaybackTimeRemaining: NaN | number;
    hasAuthorization: boolean;
    isPlaying: boolean;
    isPrimaryPlayer: boolean;
    isReady: boolean;
    nowPlayingItem: MediaItem;
    nowPlayingItemIndex: number;
    playbackRate: number;
    playbackState: number;
    queue: Queue;
    repeatMode: 0 | 1 | 2;
    shuffleMode: number;
    formattedCurrentPlaybackDuration: {
      hours: NaN | number;
      minutes: NaN | number;
    };

    addEventListener(
      eventName: string,
      callback: (state: { oldState: number; state: number }) => any
    ): void;
    removeEventListener(
      eventName: string,
      callback: (state: { oldState: number; state: number }) => any
    ): void;
    changeToMediaAtIndex(index: number): Promise;
    changeToMediaItem(): Promise;
    destroy(): Promise;
    mute(): Promise;
    pause(): Promise;
    play(): Promise;
    preload(): Promise;
    prepareToPlay(e, t, r): Promise;
    seekBackward(): Promise;
    seekForward(): Promise;
    seekToTime(e): Promise;
    showPlaybackTargetPicker(): Promise;
    skipToNextItem(): Promise;
    skipToPreviousItem(): Promise;
    stop(): Promise;
  }

  interface Queue {
    isEmpty: boolean;
    isRestricted: boolean;
    items: MediaItem[];
    length: number;
    nextPlayableItem?: MediaItem;
    nextPlayableItemIndex?: number;
    position: number;
    previousPlayableItem?: MediaItem;
    previousPlayableItemIndex?: number;

    addEventListener(eventName: string, callback: (result: any) => any): void;
    removeEventListener(
      eventName: string,
      callback: (result: any) => any
    ): void;
    append(song: Song): void;
    indexForItem(e): Promise;
    item(e): Promise;
    prepend(e, t): Promise;
    remove(index?: number): Promise;
    requiresPlayActivity(): Promise;
    shuffle(e): Promise;
    unshuffle(e): Promise;
  }

  interface MediaItem {
    albumInfo: string;
    albumName: string;
    artistName: string;
    artwork: ArtWork;
    artworkURL: string;
    assets: any[];
    attributes: SongAttributes;
    canPlay: boolean;
    container: {
      id: string;
      name: string;
    };
    contentRating?: number;
    discNumber: number;
    equivalent?: any;
    hasContainerArtwork?: any;
    hasPlaylistContainer: boolean;
    id: string;
    info: string;
    isCloudItem: boolean;
    isCloudUpload: boolean;
    isExplicitItem: boolean;
    isLoading: boolean;
    isPlayable: {
      id: string;
      kind: string;
    };
    isPlaying: boolean;
    isPreparedToPlay: boolean;
    isReady: boolean;
    isRestricted: boolean;
    isUnavailable: boolean;
    isrc: string;
    playParams: {
      id: string;
      kind: string;
    };
    playRawAssetURL: boolean;
    playbackDuration: number;
    playlistArtworkURL: string;
    playlistName: string;
    previewURL: string;
    relationships: {
      albums: Relationship[];
      artists: Relationship[];
    };
    releaseDate: Date;
    songId: string;
    state: number;
    title: string;
    trackNumber: number;
    type: string;
  }

  enum PlaybackStates {
    none,
    loading,
    playing,
    paused,
    stopped,
    ended,
    seeking,
    waiting,
    stalled,
    completed,
  }

  const Events: {
    authorizationStatusDidChange: string;
    authorizationStatusWillChange: string;
    bufferedProgressDidChange: string;
    configured: string;
    eligibleForSubscribeView: string;
    loaded: string;
    mediaCanPlay: string;
    mediaItemDidChange: string;
    mediaItemStateDidChange: string;
    mediaItemStateWillChange: string;
    mediaItemWillChange: string;
    mediaPlaybackError: string;
    mediaPlaybackPreview: string;
    metadataDidChange: string;
    playbackBitrateDidChange: string;
    playbackDurationDidChange: string;
    playbackProgressDidChange: string;
    playbackStateDidChange: string;
    playbackStateWillChange: string;
    playbackTargetAvailableDidChange: string;
    playbackTimeDidChange: string;
    playbackVolumeDidChange: string;
    primaryPlayerDidChange: string;
    queueItemForStartPosition: string;
    queueItemsDidChange: string;
    queuePositionDidChange: string;
    storefrontCountryCodeDidChange: string;
    storefrontIdentifierDidChange: string;
    userTokenDidChange: string;
  };
}
