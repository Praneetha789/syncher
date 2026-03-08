import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { Audio } from "expo-av";
import * as ImagePicker from "expo-image-picker";

export default function BloomCircle() {

  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);
  const [tag, setTag] = useState("#mood");
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [recording, setRecording] = useState(null);

  const tags = ["#diet", "#mood", "#workout", "#symptom"];

  // ---------------- ADD POST ----------------

  const addPost = () => {
    if (!postText && !image && !audio) return;

    const newPost = {
      id: Date.now().toString(),
      user: "Anonymous 🌸",
      text: postText,
      tag: tag,
      image: image,
      audio: audio,
      reactions: {
        love: 0,
        bloom: 0,
        strength: 0
      }
    };

    setPosts([newPost, ...posts]);
    setPostText("");
    setImage(null);
    setAudio(null);
  };

  // ---------------- REACT TO POST ----------------

  const reactPost = (id, type) => {

    const updatedPosts = posts.map((post) => {

      if (post.id === id) {
        return {
          ...post,
          reactions: {
            ...post.reactions,
            [type]: post.reactions[type] + 1
          }
        };
      }

      return post;
    });

    setPosts(updatedPosts);
  };

  // ---------------- IMAGE PICKER ----------------

  const pickImage = async () => {

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // ---------------- RECORD VOICE ----------------

  const startRecording = async () => {

    const permission = await Audio.requestPermissionsAsync();

    if (permission.status !== "granted") return;

    const recordingObject = new Audio.Recording();

    await recordingObject.prepareToRecordAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );

    await recordingObject.startAsync();

    setRecording(recordingObject);
  };

  const stopRecording = async () => {

    await recording.stopAndUnloadAsync();

    const uri = recording.getURI();

    setAudio(uri);

    setRecording(null);
  };

  // ---------------- LEADERBOARD ----------------

  const leaderboard = [
    { id: "1", name: "Ananya", points: 320 },
    { id: "2", name: "Sneha", points: 280 },
    { id: "3", name: "Anonymous 🌙", points: 240 }
  ];

  // ---------------- CHALLENGES ----------------

  const challenges = [
    {
      id: "1",
      title: "7 Day Walk Challenge",
      goal: "7000 steps daily",
      reward: "50 points"
    },
    {
      id: "2",
      title: "Water Challenge",
      goal: "Drink 2.5L daily",
      reward: "40 points"
    }
  ];

  // ---------------- POLL ----------------

  const [poll, setPoll] = useState({
    question: "What helps most with PCOD cramps?",
    options: [
      { id: 1, text: "Exercise", votes: 10 },
      { id: 2, text: "Diet", votes: 6 },
      { id: 3, text: "Medicine", votes: 4 },
      { id: 4, text: "Rest", votes: 3 }
    ]
  });

  const vote = (id) => {

    const updated = poll.options.map((option) => {

      if (option.id === id) {
        return { ...option, votes: option.votes + 1 };
      }

      return option;
    });

    setPoll({ ...poll, options: updated });
  };

  // ---------------- UI ----------------

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>🌸 Bloom Circle</Text>

      <TextInput
        placeholder="Share your experience..."
        value={postText}
        onChangeText={setPostText}
        style={styles.input}
      />

      <View style={styles.tagRow}>

        {tags.map((t) => (
          <TouchableOpacity
            key={t}
            style={[
              styles.tag,
              tag === t && { backgroundColor: "#ff1493" }
            ]}
            onPress={() => setTag(t)}
          >
            <Text style={{ color: "white" }}>{t}</Text>
          </TouchableOpacity>
        ))}

      </View>

      <View style={styles.mediaRow}>

        <TouchableOpacity onPress={pickImage}>
          <Text style={styles.mediaButton}>📷 Image</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={startRecording}>
          <Text style={styles.mediaButton}>🎙 Start</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={stopRecording}>
          <Text style={styles.mediaButton}>⏹ Stop</Text>
        </TouchableOpacity>

      </View>

      <TouchableOpacity style={styles.postButton} onPress={addPost}>
        <Text style={{ color: "white" }}>Post</Text>
      </TouchableOpacity>

      <FlatList
        data={posts}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <View style={styles.postCard}>

            <Text style={styles.user}>{item.user}</Text>
            <Text>{item.text}</Text>
            <Text style={styles.tagLabel}>{item.tag}</Text>

            {item.image && (
              <Image source={{ uri: item.image }} style={styles.image} />
            )}

            {item.audio && (
              <Text style={{ marginTop: 5 }}>🎙 Voice note attached</Text>
            )}

            <View style={styles.reactionRow}>

              <TouchableOpacity onPress={() => reactPost(item.id, "love")}>
                <Text>❤️ {item.reactions.love}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => reactPost(item.id, "bloom")}>
                <Text>🌸 {item.reactions.bloom}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => reactPost(item.id, "strength")}>
                <Text>💪 {item.reactions.strength}</Text>
              </TouchableOpacity>

            </View>

          </View>
        )}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Community Poll</Text>

        <Text>{poll.question}</Text>

        {poll.options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.pollOption}
            onPress={() => vote(option.id)}
          >
            <Text>
              {option.text} ({option.votes})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌟 Weekly Challenges</Text>

        {challenges.map((challenge) => (
          <View key={challenge.id} style={styles.challengeCard}>

            <Text style={{ fontWeight: "bold" }}>{challenge.title}</Text>
            <Text>{challenge.goal}</Text>
            <Text>Reward: {challenge.reward}</Text>

          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏆 Weekly Leaderboard</Text>

        {leaderboard.map((user, index) => (
          <View key={user.id} style={styles.leaderCard}>

            <Text>{index + 1}. {user.name}</Text>
            <Text>{user.points} pts</Text>

          </View>
        ))}
      </View>

    </ScrollView>
  );
}

// ---------------- STYLES ----------------

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff0f5"
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
  },

  tagRow: {
    flexDirection: "row",
    marginBottom: 10
  },

  tag: {
    backgroundColor: "#ff8fb1",
    padding: 6,
    borderRadius: 10,
    marginRight: 8
  },

  mediaRow: {
    flexDirection: "row",
    marginBottom: 10
  },

  mediaButton: {
    marginRight: 15,
    color: "#ff1493"
  },

  postButton: {
    backgroundColor: "#ff1493",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15
  },

  postCard: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10
  },

  user: {
    fontWeight: "bold"
  },

  tagLabel: {
    color: "gray",
    marginTop: 5
  },

  image: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 10
  },

  reactionRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10
  },

  section: {
    marginTop: 20
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },

  pollOption: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 5,
    borderRadius: 8
  },

  challengeCard: {
    backgroundColor: "#ffe4f2",
    padding: 10,
    borderRadius: 10,
    marginBottom: 8
  },

  leaderCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 5
  }

});