import React, { useState } from 'react';
import { StyleSheet, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';

export default function WebScreen() {
  const [hasError, setHasError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const handleRetry = () => {
    setHasError(false);
    setReloadKey(prev => prev + 1);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
        animated={true}
      />

      {hasError ? (
        <ErrorScreen onRetry={handleRetry} />
      ) : (
        <WebView
          key={reloadKey}
          source={{ uri: 'https://c.tuxedolabs.xyz' }}
          style={styles.webview}
          allowsInlineMediaPlayback
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          overScrollMode="never"
          onError={() => setHasError(true)}
          onHttpError={() => setHasError(true)}
        />
      )}
    </SafeAreaView>
  );
}

function ErrorScreen({ onRetry }: any) {
  return (
    <View style={errorStyles.container}>
      <Text style={errorStyles.title}>No Internet Connection</Text>
      <Text style={errorStyles.message}>Please check your network and try again.</Text>
      <TouchableOpacity style={errorStyles.button} onPress={onRetry}>
        <Text style={errorStyles.buttonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  webview: {
    flex: 1,
  },
});

const errorStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Colors.dark.primary,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    color: Colors.dark.text,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.dark.primary,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.dark.primaryForeground,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
