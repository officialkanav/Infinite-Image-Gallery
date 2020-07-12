import {PermissionsAndroid} from 'react-native';
export async function request_storage_runtime_permission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'This App needs access to your storage to download Photos.',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return;
    } else {
      // eslint-disable-next-line no-alert
      alert('Storage Permission Not Granted');
    }
  } catch (err) {
    console.warn(err);
  }
}
