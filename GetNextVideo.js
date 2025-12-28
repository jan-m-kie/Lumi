const fetchGatedFeed = async () => {
  const { data, error } = await supabase
    .rpc('get_educational_feed'); // Ruft die Logik vom Server ab

  if (data) {
    setVideos(prev => [...prev, ...data]);
  }
};
