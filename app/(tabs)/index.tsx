import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
  const [darkMode, setDarkMode] = useState(false);

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

  // Dynamic theme colors
  const theme = {
    background: darkMode ? '#111827' : '#F9FAFB',
    card: darkMode ? '#1F2937' : '#fff',
    text: darkMode ? '#F9FAFB' : '#111827',
    textSecondary: darkMode ? '#9CA3AF' : '#6B7280',
    border: darkMode ? '#374151' : '#E5E7EB',
    primary: darkMode ? '#A78BFA' : '#8B5CF6',
    primaryLight: darkMode ? '#4C1D95' : '#F3E8FF',
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View>
          <Text style={[styles.title, { color: theme.text }]}>Courses</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {courses.length} available courses
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.themeToggle, { backgroundColor: theme.card, borderColor: theme.border }]}
          onPress={() => setDarkMode(!darkMode)}
          activeOpacity={0.7}
        >
          <Feather
            name={darkMode ? 'sun' : 'moon'}
            size={20}
            color={darkMode ? '#FCD34D' : theme.primary}
          />
        </TouchableOpacity>
      </View>

      {/* Loading State */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[styles.loading, { color: theme.textSecondary }]}>Loading courses...</Text>
        </View>
      ) : (
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isFavourite = favourites.includes(item.id);
            
            return (
              <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
                {/* Card Image - Clickable */}
                <TouchableOpacity
                  onPress={() => router.push({ pathname: '/[id]' as any, params: { id: item.id } })}
                  activeOpacity={0.7}
                >
                  <Image source={{ uri: item.thumbnail }} style={styles.image} />
                </TouchableOpacity>

                {/* Card Content */}
                <View style={styles.info}>
                  {/* Title and Status - Clickable */}
                  <TouchableOpacity
                    onPress={() => router.push({ pathname: '/[id]' as any, params: { id: item.id } })}
                    activeOpacity={0.7}
                  >
                    <View style={styles.titleRow}>
                      <Text style={[styles.courseTitle, { color: theme.text }]} numberOfLines={1}>
                        {item.title}
                      </Text>
                      {item.status && (
                        <View style={[styles.statusBadge, { backgroundColor: theme.primaryLight }]}>
                          <Text style={[styles.statusText, { color: theme.primary }]}>
                            {item.status}
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text style={[styles.description, { color: theme.textSecondary }]} numberOfLines={2}>
                      {item.description}
                    </Text>
                  </TouchableOpacity>

                  {/* Favorite Button - Independent */}
                  <TouchableOpacity
                    style={styles.favBtn}
                    onPress={() => handleFavourite(item.id)}
                    activeOpacity={0.7}
                  >
                    <Feather
                      name="heart"
                      size={20}
                      color={isFavourite ? '#EF4444' : theme.textSecondary}
                    />
                    <Text style={[styles.favText, { color: isFavourite ? '#EF4444' : theme.textSecondary }]}>
                      {isFavourite ? 'Favourited' : 'Add to Favourites'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  themeToggle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    fontSize: 16,
    marginTop: 12,
    fontWeight: '600',
  },
  card: {
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: '#E5E7EB',
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  courseTitle: {
    fontSize: 17,
    fontWeight: '700',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 8,
  },
  favBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 4,
  },
  favText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '600',
  },
});