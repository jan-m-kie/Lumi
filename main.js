import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Dimensions, Text, TouchableOpacity, Modal } from 'react-native';

const { height, width } = Dimensions.get('window');

const VIDEOS = [
  { id: '1', title: 'Der Wasserkreislauf 🌧️', question: 'Woher kommt der Regen?', options: ['Vom Boden', 'Aus den Wolken', 'Aus dem Wasserhahn'], correct: 1 },
  { id: '2', title: 'Bienen & Blumen 🐝', question: 'Was sammeln Bienen?', options: ['Honig', 'Nektar', 'Blätter'], correct: 1 },
  { id: '3', title: 'Zahlen-Spaß 🔢', question: 'Was kommt nach der 2?', options: ['1', '4', '3'], correct: 2 },
  { id: '4', title: 'Warum wir schlafen 😴', question: 'Wann schlafen wir?', options: ['Nachts', 'Mittags', 'Immer'], correct: 0 },
];

export default function KidShortsApp() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  // Diese Funktion erkennt, wenn ein Video fertig geschaut wurde (oder man wischt)
  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setCurrentIndex(index);
      
      // Jedes mal, wenn wir beim 3. Video (Index 2) ankommen, Quiz zeigen
      if ((index + 1) % 3 === 0 && index !== 0) {
        setShowQuiz(true);
      }
    }
  };

  const handleAnswer = (selectedIndex) => {
    if (selectedIndex === VIDEOS[currentIndex].correct) {
      setScore(score + 1);
      alert("Super gemacht! 🌟");
    } else {
      alert("Fast richtig! Versuch es nochmal. ✨");
    }
    setShowQuiz(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.videoContainer}>
      <Text style={styles.emoji}>📺</Text>
      <Text style={styles.videoTitle}>{item.title}</Text>
      
      <View style={styles.uiOverlay}>
        <Text style={styles.scoreText}>Punkte: {score}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={VIDEOS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      />

      {/* Das Quiz-Overlay */}
      <Modal visible={showQuiz} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.quizCard}>
            <Text style={styles.quizEmoji}>🤔</Text>
            <Text style={styles.questionText}>{VIDEOS[currentIndex]?.question}</Text>
            
            {VIDEOS[currentIndex]?.options.map((option, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.answerButton} 
                onPress={() => handleAnswer(index)}
              >
                <Text style={styles.answerText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  videoContainer: { width, height, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E0F7FA' },
  videoTitle: { fontSize: 28, fontWeight: 'bold', marginTop: 20 },
  emoji: { fontSize: 100 },
  uiOverlay: { position: 'absolute', top: 50, right: 20 },
  scoreText: { fontSize: 20, fontWeight: 'bold', color: '#FF9800' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)' },
  quizCard: { width: '85%', backgroundColor: 'white', borderRadius: 30, padding: 30, alignItems: 'center' },
  quizEmoji: { fontSize: 50, marginBottom: 10 },
  questionText: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  answerButton: { backgroundColor: '#FFCCBC', padding: 15, borderRadius: 20, width: '100%', marginBottom: 10 },
  answerText: { fontSize: 18, textAlign: 'center', fontWeight: '600' }
});
