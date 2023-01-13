declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_SCROLL_Y_SCALE: int;
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PWD: string;
    }
  }
}

export {}
