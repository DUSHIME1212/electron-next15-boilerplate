interface Window {
    electron: {
      doThing: () => void;
      onThingDone: (callback: () => void) => void;
    };
  }