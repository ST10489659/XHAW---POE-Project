import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Clock, DollarSign, BookOpen, Award } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';

interface CourseDetails {
  id: string;
  name: string;
  description: string;
  fee: number;
  duration: string;
}

export default function CourseDetailScreen() {
  const { id, type } = useLocalSearchParams<{ id: string; type: string }>();
  const router = useRouter();
  const [course, setCourse] = useState<CourseDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id && type) {
      fetchCourseDetails();
    }
  }, [id, type]);

  const fetchCourseDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const tableName = type === 'six-month' ? 'six_month_courses' : 'six_week_courses';
      const { data, error: fetchError } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (fetchError) throw fetchError;
      if (!data) throw new Error('Course not found');

      setCourse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load course details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#1eaf73ff" />
        <Text style={styles.loadingText}>Loading course details...</Text>
      </View>
    );
  }

  if (error || !course) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error || 'Course not found'}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => router.back()}>
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{course.name}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {type === 'six-month' ? 'Six-Month Program' : 'Six-Week Program'}
            </Text>
          </View>
        </View>

        <View style={styles.infoCards}>
          <View style={styles.infoCard}>
            <Clock size={24} color="#1eaf73ff" />
            <Text style={styles.infoLabel}>Duration</Text>
            <Text style={styles.infoValue}>{course.duration}</Text>
          </View>
          <View style={styles.infoCard}>
            <DollarSign size={24} color="#1eaf73ff" />
            <Text style={styles.infoLabel}>Course Fee</Text>
            <Text style={styles.infoValue}>R{course.fee.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <BookOpen size={20} color="#1eaf73ff" />
            <Text style={styles.sectionTitle}>Course Description</Text>
          </View>
          <Text style={styles.description}>{course.description}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Award size={20} color="#1eaf73ff" />
            <Text style={styles.sectionTitle}>What You'll Learn</Text>
          </View>
          <View style={styles.bulletPoints}>
            <Text style={styles.bulletPoint}>• Comprehensive hands-on training</Text>
            <Text style={styles.bulletPoint}>• Industry-standard techniques and practices</Text>
            <Text style={styles.bulletPoint}>• Practical skills applicable to real-world scenarios</Text>
            <Text style={styles.bulletPoint}>• Expert instruction from experienced professionals</Text>
            <Text style={styles.bulletPoint}>• Certificate of completion upon finishing the course</Text>
          </View>
        </View>

        <View style={styles.discountSection}>
          <Text style={styles.discountTitle}>Save with Multiple Courses</Text>
          <Text style={styles.discountText}>
            Enroll in multiple courses and receive discounts:{'\n\n'}
            • 5% off for 2 courses{'\n'}
            • 10% off for 3 courses{'\n'}
            • 15% off for 4+ courses{'\n\n'}
            Use our fee calculator to estimate your total costs with discounts applied.
          </Text>
        </View>

        <View style={styles.ctaSection}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('/calculator')}>
            <Text style={styles.primaryButtonText}>Calculate Fees</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push('/contact')}>
            <Text style={styles.secondaryButtonText}>Contact Us</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9fafb',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  badge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#1eaf73ff',
    fontSize: 14,
    fontWeight: '600',
  },
  infoCards: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 8,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  description: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
  },
  bulletPoints: {
    gap: 8,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
  },
  discountSection: {
    backgroundColor: '#dbeafe',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#1eaf73ff',
  },
  discountTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1eaf73ff',
    marginBottom: 8,
  },
  discountText: {
    fontSize: 14,
    color: '#1eaf73ff',
    lineHeight: 22,
  },
  ctaSection: {
    gap: 12,
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: '#1eaf73ff',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1eaf73ff',
  },
  secondaryButtonText: {
    color: '#1eaf73ff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6b7280',
  },
  errorText: {
    fontSize: 16,
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#1eaf73ff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
