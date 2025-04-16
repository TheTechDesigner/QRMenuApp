import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const ScanScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const result = await request(
        Platform.OS === 'ios' 
          ? PERMISSIONS.IOS.CAMERA 
          : PERMISSIONS.ANDROID.CAMERA
      );
      setHasPermission(result === RESULTS.GRANTED);
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    try {
      // In a real app, we would validate this data properly
      // For now, we're assuming the QR code contains a valid JSON string with restaurant info
      const restaurantData = JSON.parse(data);
      
      if (restaurantData.id && restaurantData.name) {
        navigation.replace('Menu', { 
          restaurantId: restaurantData.id,
          restaurantName: restaurantData.name,
          tableNumber: restaurantData.tableNumber || '1'
        });
      } else {
        Alert.alert('Invalid QR Code', 'This QR code doesn\'t contain restaurant information.');
        setScanned(false);
      }
    } catch (e) {
      // Demo mode: If the QR code isn't in the right format, just go to a demo restaurant
      navigation.replace('Menu', { 
        restaurantId: 'demo123',
        restaurantName: 'Demo Restaurant',
        tableNumber: '5'
      });
    }
  };

  // Handle different permission states
  if (hasPermission === null) {
    return <View style={styles.centered}><Text>Requesting camera permission...</Text></View>;
  }
  
  if (hasPermission === false) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No access to camera</Text>
        <Text style={styles.instructionText}>
          Camera permission is needed to scan QR codes.
        </Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        onBarCodeRead={scanned ? undefined : handleBarCodeScanned}
        captureAudio={false}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
      >
        <View style={styles.overlay}>
          <View style={styles.scanArea}>
            <View style={styles.cornerTL} />
            <View style={styles.cornerTR} />
            <View style={styles.cornerBL} />
            <View style={styles.cornerBR} />
          </View>
          
          <Text style={styles.instructionText}>
            Align the QR code within the frame to scan
          </Text>
          
          {scanned && (
            <TouchableOpacity
              style={styles.rescanButton}
              onPress={() => setScanned(false)}
            >
              <Text style={styles.rescanButtonText}>Tap to Scan Again</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            style={styles.demoButton}
            onPress={() => {
              navigation.replace('Menu', { 
                restaurantId: 'demo123',
                restaurantName: 'Demo Restaurant',
                tableNumber: '5'
              });
            }}
          >
            <Text style={styles.demoButtonText}>Use Demo Restaurant</Text>
          </TouchableOpacity>
        </View>
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  cornerTL: {
    position: 'absolute',
    top: -2,
    left: -2,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#FF6B6B',
  },
  cornerTR: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: '#FF6B6B',
  },
  cornerBL: {
    position: 'absolute',
    bottom: -2,
    left: -2,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#FF6B6B',
  },
  cornerBR: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: '#FF6B6B',
  },
  instructionText: {
    color: 'white',
    fontSize: 16,
    marginTop: 30,
    textAlign: 'center',
    maxWidth: '80%',
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'red',
  },
  button: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    width: 200,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  rescanButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
  },
  rescanButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  demoButton: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 15,
    borderRadius: 8,
  },
  demoButtonText: {
    color: 'white',
  },
});

export default ScanScreen;
