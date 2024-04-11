export default {
  name: 'Noticiero Altavoz',
  slug: 'noticieroaltavoz',
  version: '1.1.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.noticieroaltavoz.noticieroaltavozapp',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.noticieroaltavoz.noticieroaltavozapp',
  },
  web: {
    favicon: './assets/favicon.png',
  },

  extra: {
    eas: {
      projectId: '49368860-7edf-496b-9ece-2a1f7539c87c',
    },
  },
};
