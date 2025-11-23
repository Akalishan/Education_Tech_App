import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { addFavouriteForUser, removeFavouriteForUser } from '../store/favouritesSlice';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const course = useSelector((state: any) =>
    state.courses.items.find((item: any) => item.id === Number(id))
  );
  const user = useSelector((state: any) => state.auth.user);
  const favourites = useSelector((state: any) => state.favourites.items);
  const dispatch = useDispatch<AppDispatch>();

  const isFavourite = favourites.includes(Number(id));

  const toggleFavourite = () => {
    const userId = String(user?.id || user?.username);
    if (isFavourite) {
      dispatch(removeFavouriteForUser({ userId, id: Number(id) }));
    } else {
      dispatch(addFavouriteForUser({ userId, id: Number(id) }));
    }
  };

  if (!course) {
    return (
      <View style={detailStyles.container}>
        <View style={detailStyles.notFoundContainer}>
          <Feather name="alert-circle" size={64} color="#E5E7EB" />
          <Text style={detailStyles.notFoundTitle}>Course Not Found</Text>
          <Text style={detailStyles.notFoundText}>
            The course you're looking for doesn't exist
          </Text>
          <TouchableOpacity style={detailStyles.backButton} onPress={() => router.back()}>
            <Feather name="arrow-left" size={20} color="#fff" />
            <Text style={detailStyles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={detailStyles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: course.thumbnail }} style={detailStyles.image} />
      
      <View style={detailStyles.content}>
        <View style={detailStyles.header}>
          <View style={detailStyles.titleContainer}>
            <Text style={detailStyles.title}>{course.title}</Text>
            {course.status && (
              <View style={detailStyles.statusBadge}>
                <Feather name="star" size={14} color="#8B5CF6" />
                <Text style={detailStyles.statusText}>{course.status}</Text>
              </View>
            )}
          </View>
          
          <TouchableOpacity
            style={[detailStyles.favouriteButton, isFavourite && detailStyles.favouriteButtonActive]}
            onPress={toggleFavourite}
            activeOpacity={0.7}
          >
            <Feather name="heart" size={24} color={isFavourite ? '#EF4444' : '#9CA3AF'} />
          </TouchableOpacity>
        </View>

        <View style={detailStyles.section}>
          <View style={detailStyles.sectionHeader}>
            <Feather name="book-open" size={20} color="#8B5CF6" />
            <Text style={detailStyles.sectionTitle}>About This Course</Text>
          </View>
          <Text style={detailStyles.description}>{course.description}</Text>
        </View>

        <View style={detailStyles.section}>
          <View style={detailStyles.sectionHeader}>
            <Feather name="info" size={20} color="#8B5CF6" />
            <Text style={detailStyles.sectionTitle}>Course Details</Text>
          </View>
          <View style={detailStyles.detailRow}>
            <Feather name="tag" size={16} color="#6B7280" />
            <Text style={detailStyles.detailLabel}>Status:</Text>
            <Text style={detailStyles.detailValue}>{course.status}</Text>
          </View>
          <View style={detailStyles.detailRow}>
            <Feather name="hash" size={16} color="#6B7280" />
            <Text style={detailStyles.detailLabel}>Course ID:</Text>
            <Text style={detailStyles.detailValue}>{course.id}</Text>
          </View>
        </View>

        <TouchableOpacity style={detailStyles.enrollButton} activeOpacity={0.8}>
          <Text style={detailStyles.enrollButtonText}>Enroll Now</Text>
          <Feather name="arrow-right" size={20} color="#fff" style={detailStyles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const detailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  image: {
    width: '100%',
    height: 280,
    backgroundColor: '#E5E7EB',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
    lineHeight: 32,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8B5CF6',
    marginLeft: 4,
  },
  favouriteButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  favouriteButtonActive: {
    borderColor: '#FEE2E2',
    backgroundColor: '#FEF2F2',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 8,
  },
  description: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  detailLabel: {
    fontSize: 15,
    color: '#6B7280',
    marginLeft: 8,
    marginRight: 8,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  enrollButton: {
    flexDirection: 'row',
    backgroundColor: '#8B5CF6',
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 24,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  enrollButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  buttonIcon: {
    marginLeft: 8,
  },
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  notFoundTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  notFoundText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  backButton: {
    flexDirection: 'row',
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
});