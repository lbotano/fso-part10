import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    return await AsyncStorage.getItem(this.namespace);
  }

  setAccessToken(accessToken) {
    AsyncStorage.setItem(this.namespace, accessToken);
  }

  removeAccessToken() {
    AsyncStorage.removeItem(this.namespace);
  }
}

export default AuthStorage;
