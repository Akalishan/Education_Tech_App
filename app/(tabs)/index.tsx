import { useColorScheme } from '@/components/useColorScheme';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { fetchCourses } from '../../store/coursesSlice';
import {
  addFavouriteForUser,
  loadFavouritesForUser,
  removeFavouriteForUser,
} from '../../store/favouritesSlice';

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const courses = useSelector((state: any) => state.courses.items);
  const loading = useSelector((state: any) => state.courses.loading);
  const favourites = useSelector((state: any) => state.favourites.items);
  const user = useSelector((state: any) => state.auth.user);
  const systemScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(systemScheme === 'dark');

  useEffect(() => {
    dispatch(fetchCourses());
    const userId = user?.id || user?.username;
    if (userId) {
      dispatch(loadFavouritesForUser(String(userId)));
    }
  }, [dispatch, user]);

  const handleFavourite = (id: number) => {
    const userId = user?.id || user?.username;
    if (!userId) return;
    if (favourites.includes(id)) {
      dispatch(removeFavouriteForUser({ userId: String(userId), id }));
    } else {
      dispatch(addFavouriteForUser({ userId: String(userId), id }));
    }
  };

  const backgroundColor = darkMode ? '#000' : '#fff';
  const textColor = darkMode ? '#fff' : '#000';
  const cardColor = darkMode ? '#222' : '#f9f9f9';

  return (
    <View style={[styles.container, { backgroundColor }]}> 
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: textColor }]}>Courses</Text>
        <View style={styles.toggleRow}>
          <Feather name={darkMode ? 'moon' : 'sun'} size={24} color={darkMode ? '#FFD700' : '#007AFF'} />
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            thumbColor={darkMode ? '#FFD700' : '#007AFF'}
          />
        </View>
      </View>
      {loading ? (
        <Text style={[styles.loading, { color: textColor }]}>Loading...</Text>
      ) : (
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.card, { backgroundColor: cardColor }]}
              onPress={() => router.push({ pathname: '/[id]' as any, params: { id: item.id } })}
            >
              <Image source={{ uri: item.thumbnail }} style={styles.image} />
              <View style={styles.info}>
                <Text style={[styles.courseTitle, { color: textColor }]}>{item.title}</Text>
                <Text style={[styles.description, { color: textColor }]}>{item.description}</Text>
                <Text style={[styles.status, { color: darkMode ? '#FFD700' : '#007AFF' }]}>{item.status}</Text>
                <TouchableOpacity
                  style={styles.favBtn}
                  onPress={() => handleFavourite(item.id)}
                >
                  <Feather
                    name={favourites.includes(item.id) ? 'star' : 'star'}
                    size={24}
                    color={favourites.includes(item.id) ? '#FFD700' : '#ccc'}
                  />
                  <Text style={[styles.favText, { color: favourites.includes(item.id) ? '#FFD700' : '#ccc' }]}>{favourites.includes(item.id) ? 'Favourited' : 'Favourite'}</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  loading: {
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 40,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    alignItems: 'center',
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginVertical: 4,
  },
  status: {
    fontSize: 12,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  favBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  favText: {
    marginLeft: 6,
    fontWeight: 'bold',
  },
});
