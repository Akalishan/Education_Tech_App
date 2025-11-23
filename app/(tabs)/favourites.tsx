import { Feather } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import {
    loadFavouritesForUser,
    removeFavouriteForUser,
} from '../../store/favouritesSlice';

export default function FavouritesScreen() {
  const favourites = useSelector((state: any) => state.favourites.items);
  const courses = useSelector((state: any) => state.courses.items);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    const userId = user?.id || user?.username;
    if (userId) dispatch(loadFavouritesForUser(String(userId)));
  }, [dispatch, user]);

  const favCourses = courses.filter((course: any) => favourites.includes(course.id));

  const handleRemoveFavourite = (courseId: number) => {
    const userId = String(user?.id || user?.username);
    dispatch(removeFavouriteForUser({ userId, id: courseId }));
  };

  return (
    <View style={styles.container}>
      {favCourses.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <Feather name="heart" size={64} color="#E5E7EB" />
          </View>
          <Text style={styles.emptyTitle}>No Favourites Yet</Text>
          <Text style={styles.emptyText}>
            Start adding courses to your favourites to see them here
          </Text>
        </View>
      ) : (
        <FlatList
          data={favCourses}
          keyExtractor={(item: any) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: { item: any }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.thumbnail }} style={styles.image} />
              <View style={styles.info}>
                <View style={styles.header}>
                  <Text style={styles.courseTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  {item.status && (
                    <View style={styles.statusBadge}>
                      <Text style={styles.statusText}>{item.status}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.description} numberOfLines={2}>
                  {item.description}
                </Text>
                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => handleRemoveFavourite(item.id)}
                  activeOpacity={0.7}
                >
                  <Feather name="heart" size={18} color="#EF4444" />
                  <Text style={styles.removeText}>Remove from Favourites</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  courseTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  removeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  removeText: {
    marginLeft: 6,
    color: '#EF4444',
    fontWeight: '600',
    fontSize: 13,
  },
});