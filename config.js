// frontend/src/config.js
const config = {
    api: {
      baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000',
      endpoints: {
        tryOn: process.env.REACT_APP_TRY_ON_ENDPOINT || '/api/try-on',
        videoFeed: process.env.REACT_APP_VIDEO_FEED_ENDPOINT || '/video_feed'
      }
    }
  };
  
  export default config;