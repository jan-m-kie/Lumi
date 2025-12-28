import React from 'react';
import { StyleSheet, View, FlatList, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';

const { height, width } = Dimensions.get('window');

// Beispiel-Daten mit Lern-Kategorien
const VIDEOS = [
  { id: '1', uri: 'https://dein-video-link-1.mp4', title: 'Wie wachsen Blumen?', color: '#FFB7B2' },
  { id: '2', uri: 'https://dein-video-link-2.mp4', title: 'Zählen mit Äpfeln', color: '#B2E2F2' },
  { id: '3', uri: 'https://dein-video-link-3.mp4', title: 'Warum ist der Himmel blau?', color: '#FDFD96' },
];

export default function KidShortsApp() {
  const renderItem = ({ item }) => (
    <View style={[styles.videoContainer, { backgroundColor: item.color }]}>
      {/* Hier würde die Video-Komponente sitzen */}
      <View style={styles.videoPlaceholder}>
         <Text style={styles.emoji}>🌱</Text>
         <Text style={styles.title}>{item.title}</Text>
      </View>

      {/* Kinderfreundliche Interaktions-Buttons */}
      <View style={styles.uiOverlay}>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={{fontSize: 40}}>❤️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={{fontSize: 40}}>💡</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={VIDEOS}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      pagingEnabled // Erzeugt den Snap-Effekt
      showsVerticalScrollIndicator={false}
      snapToInterval={height}
      snapToAlignment="start"
      decelerationRate="fast"
    />
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlaceholder: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  uiOverlay: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    gap: 20,
  },
  iconButton: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  }
});
