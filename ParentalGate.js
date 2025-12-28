import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity } from 'react-native';

export default function ParentalGate({ visible, onPass, onCancel }) {
  const [problem, setProblem] = useState({ a: 0, b: 0, result: 0 });
  const [input, setInput] = useState('');

  // Generiert eine neue Aufgabe, wenn das Modal geöffnet wird
  useEffect(() => {
    if (visible) {
      const a = Math.floor(Math.random() * 15) + 5; // Zahl zwischen 5 und 20
      const b = Math.floor(Math.random() * 10) + 2; // Zahl zwischen 2 und 12
      setProblem({ a, b, result: a + b });
      setInput('');
    }
  }, [visible]);

  const checkAnswer = () => {
    if (parseInt(input) === problem.result) {
      onPass(); // Erfolg!
    } else {
      alert(t.wrongAnswer);
      onCancel();
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.gateCard}>
          <Text style={styles.emoji}>🔒</Text>
          <Text style={styles.title}>{t.parentGateTitle}</Text>
          <Text style={styles.desc}>{t.parentGateDesc}</Text>
          
          <Text style={styles.mathText}>{problem.a} + {problem.b} = ?</Text>
          
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={input}
            onChangeText={setInput}
            placeholder="???"
            autoFocus={true}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onCancel} style={[styles.btn, styles.cancelBtn]}>
              <Text style={styles.btnText}>{t.cancel}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={checkAnswer} style={[styles.btn, styles.confirmBtn]}>
              <Text style={styles.btnText}>{t.confirm}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  gateCard: { width: '80%', backgroundColor: 'white', borderRadius: 30, padding: 30, alignItems: 'center' },
  emoji: { fontSize: 40, marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2C3E50' },
  desc: { fontSize: 16, textAlign: 'center', color: '#7F8C8D', marginVertical: 10 },
  mathText: { fontSize: 32, fontWeight: 'bold', color: '#FF9800', marginVertical: 20 },
  input: { backgroundColor: '#F0F4F8', width: '100%', borderRadius: 15, padding: 15, fontSize: 24, textAlign: 'center' },
  buttonRow: { flexDirection: 'row', gap: 15, marginTop: 25 },
  btn: { flex: 1, padding: 15, borderRadius: 15, alignItems: 'center' },
  cancelBtn: { backgroundColor: '#ECF0F1' },
  confirmBtn: { backgroundColor: '#4CAF50' },
  btnText: { fontWeight: 'bold', fontSize: 16 }
});
