export default {
  name: 'newsapp',
  slug: 'newsapp',
  version: '1.0.0',
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
    bundleIdentifier: 'com.migben.newsapp',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.migben.newsapp',
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    eas: {
      projectId: 'f8c5cb62-7c08-44b4-a3c9-f46d2857f584',
    },
  },

  /*
	extra: {
        eas: {
            projectId: "ea85bda6-b26d-486a-90f0-5b8abbc6cf22"
        }
    },
    runtimeVersion: {
        policy: "appVersion"
    },
    updates: {
        url: "https://u.expo.dev/ea85bda6-b26d-486a-90f0-5b8abbc6cf22"
    }
	*/
};
