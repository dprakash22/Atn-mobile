import RNFS from 'react-native-fs';

export const Fs = () => {
  const localFilePath = RNFS.DocumentDirectoryPath + '/binary.bin';

  const fetchAndSaveFile = async () => {
    const url = 'http://192.168.168.47:5000/user/code'; // Replace with your server URL

    try {
      // Check if the file already exists
      const fileExists = await RNFS.exists(localFilePath);
      if (fileExists) {
        console.log('File exists, deleting it');
        await RNFS.unlink(localFilePath); // Delete the existing file
      }

      // Download the new file
      const downloadOptions = {
        fromUrl: url,
        toFile: localFilePath,
      };

      const result = await RNFS.downloadFile(downloadOptions).promise;
      if (result.statusCode === 200) {
        console.log('File downloaded successfully to ' + localFilePath);
        console.log('File downloaded successfully', 'File saved to: ' + localFilePath);
      } else {
        console.error('Failed to download file, status code: ' + result.statusCode);
        console.log('Failed to download file', 'Status code: ' + result.statusCode);
      }
    } catch (error) {
      console.error('Error while downloading file: ', error);
      console.log('Error while downloading file', error.message);
    }
  };

  fetchAndSaveFile();
};
