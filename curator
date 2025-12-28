import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('DEINE_URL', 'DEIN_KEY');

export default function CuratorDashboard() {
  const [formData, setFormData] = useState({
    title: '',
    video_url: '',
    question: '',
    opt1: '', opt2: '', opt3: '',
    correct: 0
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('videos').insert([{
      title: formData.title,
      video_url: formData.video_url,
      question: formData.question,
      options: [formData.opt1, formData.opt2, formData.opt3],
      correct_index: parseInt(formData.correct),
      approved: false // Kuratoren reichen ein, Admin gibt frei
    }]);

    if (!error) alert("Lerninhalt erfolgreich eingereicht! 🎉");
  };

  return (
    <div style={styles.dashboard}>
      <h1>👨‍🏫 Kuratoren-Bereich</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input placeholder="Titel des Videos" onChange={e => setFormData({...formData, title: e.target.value})} />
        <input placeholder="Video URL (z.B. von Mux oder Cloudinary)" onChange={e => setFormData({...formData, video_url: e.target.value})} />
        
        <hr />
        <h3>Quiz-Frage erstellen</h3>
        <input placeholder="Die Frage..." onChange={e => setFormData({...formData, question: e.target.value})} />
        <input placeholder="Antwort 1" onChange={e => setFormData({...formData, opt1: e.target.value})} />
        <input placeholder="Antwort 2" onChange={e => setFormData({...formData, opt2: e.target.value})} />
        <input placeholder="Antwort 3" onChange={e => setFormData({...formData, opt3: e.target.value})} />
        
        <select onChange={e => setFormData({...formData, correct: e.target.value})}>
          <option value={0}>Antwort 1 ist korrekt</option>
          <option value={1}>Antwort 2 ist korrekt</option>
          <option value={2}>Antwort 3 ist korrekt</option>
        </select>

        <button type="submit">Inhalt zur Prüfung einsenden</button>
      </form>
    </div>
  );
}

const styles = {
  dashboard: { padding: '40px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' }
};
