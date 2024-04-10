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
    bundleIdentifier: 'com.noticierolatavoz.appnoticieroaltavoz',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.noticierolatavoz.appnoticieroaltavoz',
  },
  web: {
    favicon: './assets/favicon.png',
  },

  extra: {
    eas: {
      projectId: '0b48ef1f-11de-4b09-a0ea-95afe2165886',
    },
  },
};
