module.exports = {
  preset: '@react-native/jest-preset',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@testing-library|zustand|lucide-react-native|react-native-reanimated)/)',
  ],
  moduleNameMapper: {
    'lucide-react-native': '<rootDir>/__mocks__/lucide-react-native.js',
  },
};
