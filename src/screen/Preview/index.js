import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import IconBack from 'react-native-vector-icons/MaterialCommunityIcons';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/FontAwesome'
import { AudioPath, ImagePath, VideoPath } from '../../service';
import { SafeAreaView } from 'react-native-safe-area-context';

const Preview = ({ route, navigation }) => {
  const { image } = route.params;
  console.log('video', image);

  const imageSize = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  };

  const isVideo = image.endsWith('.mp4');
  const isAudio = image.endsWith('.mp3');

  const [isPlaying, setIsPlaying] = useState(false);
  const currentAudio = useRef(null);

  const toggleAudio = (audioUrl) => {
    if (isPlaying) {
      // stop audio playback
      stopAudio();
      setIsPlaying(false);
    } else {
      // start audio playback
      playAudio(audioUrl);
      setIsPlaying(true);
    }
  }

  const playAudio = (audioUrl) => {
    currentAudio.current = new Sound(audioUrl, '', (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // play the sound
      currentAudio.current.play(() => {
        currentAudio.current.release();
        stopAudio();
      });
      setIsPlaying(true);
    });
  }

  const stopAudio = () => {
    if (currentAudio.current) {
      currentAudio.current.stop(() => {
        currentAudio.current.release();
        setIsPlaying(false);
      });
    }
  }

  useEffect(() => {
    // cleanup function to stop audio playback when component unmounts
    return () => {
      stopAudio();
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <IconBack name="keyboard-backspace" color="grey" size={50} style={{ height: 40, width: 40, marginTop: 20 }} />
      </TouchableOpacity>
      {isVideo ? (
        <Video
          source={{ uri: VideoPath+`${image}` }}
          style={[styles.image, imageSize]}
          controls={true}
          resizeMode={'contain'}
          paused={false}
          audioOnly={true}
        />
      ) : (
        <Image source={{ uri: ImagePath+`${image}` }} style={[styles.image, imageSize]} />
      )}
      {isAudio && (
        <TouchableOpacity onPress={() =>
          toggleAudio(
            AudioPath+`${image}`
          )
        } style={styles.playButton}>
          <Icon
            name={isPlaying ? 'pause' : 'play'}
            size={50}
            color="white"
            // style={{ alignSelf: 'center' }}
          />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: 'black',
  },
  image: {
    resizeMode: 'contain',
  },
  playButton: {
    position: 'absolute', bottom:300,
    alignSelf: 'center',
  },
});

export default Preview;
