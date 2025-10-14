import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight, Clock, DollarSign } from 'lucide-react-native';
import { supabase, SixWeekCourse } from '@/lib/supabase';

export default function SixWeekCoursesScreen() {
  const router = useRouter();
  const [courses, setCourses] = useState<SixWeekCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('six_week_courses')
        .select('*')
        .order('name');

      if (fetchError) throw fetchError;
      setCourses(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#1e40af" />
        <Text style={styles.loadingText}>Loading courses...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchCourses}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>Six-Week Courses</Text>
          <Text style={styles.introDescription}>
            Our focused six-week programs deliver essential skills in a condensed timeframe.
            Ideal for those who want to quickly gain practical knowledge and certification.
          </Text>
        </View>

        <View style={styles.coursesList}>
          {courses.map((course) => (
            <TouchableOpacity
              key={course.id}
              style={styles.courseCard}
              onPress={() => router.push(`/courses/${course.id}?type=six-week`)}>
              <View style={styles.courseHeader}>
                <Text style={styles.courseTitle}>{course.name}</Text>
                <ArrowRight size={20} color="#1e40af" />
              </View>
              <Text style={styles.courseDescription} numberOfLines={2}>
                {course.description}
              </Text>
              <View style={styles.courseFooter}>
                <View style={styles.courseInfo}>
                  <Clock size={16} color="#6b7280" />
                  <Text style={styles.courseInfoText}>{course.duration}</Text>
                </View>
                <View style={styles.courseInfo}>
                  <DollarSign size={16} color="#6b7280" />
                  <Text style={styles.courseInfoText}>R{course.fee.toFixed(2)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.discountNotice}>
          <Text style={styles.discountTitle}>Special Discounts Available</Text>
          <Text style={styles.discountText}>
            • 5% discount when selecting 2 courses{'\n'}
            • 10% discount when selecting 3 courses{'\n'}
            • 15% discount when selecting 4 or more courses
          </Text>
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
  introSection: {
    marginBottom: 24,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  introDescription: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
  },
  coursesList: {
    marginBottom: 24,
  },
  courseCard: {
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
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },
  courseDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  courseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  courseInfoText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  discountNotice: {
    backgroundColor: '#dbeafe',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#1e40af',
  },
  discountTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 12,
  },
  discountText: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 22,
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
    backgroundColor: '#1e40af',
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
