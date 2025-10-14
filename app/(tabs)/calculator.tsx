import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { CheckSquare, Square, Calculator as CalcIcon, Percent } from 'lucide-react-native';
import { supabase, SixMonthCourse, SixWeekCourse } from '@/lib/supabase';

type CourseItem = {
  id: string;
  name: string;
  fee: number;
  type: 'six-month' | 'six-week';
  selected: boolean;
};

export default function CalculatorScreen() {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const fetchAllCourses = async () => {
    try {
      setLoading(true);
      const [sixMonthResult, sixWeekResult] = await Promise.all([
        supabase.from('six_month_courses').select('*').order('name'),
        supabase.from('six_week_courses').select('*').order('name'),
      ]);

      const sixMonthCourses: CourseItem[] =
        sixMonthResult.data?.map((c: SixMonthCourse) => ({
          id: c.id,
          name: c.name,
          fee: c.fee,
          type: 'six-month' as const,
          selected: false,
        })) || [];

      const sixWeekCourses: CourseItem[] =
        sixWeekResult.data?.map((c: SixWeekCourse) => ({
          id: c.id,
          name: c.name,
          fee: c.fee,
          type: 'six-week' as const,
          selected: false,
        })) || [];

      setCourses([...sixMonthCourses, ...sixWeekCourses]);
    } catch (err) {
      Alert.alert('Error', 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const toggleCourse = (id: string) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === id ? { ...course, selected: !course.selected } : course
      )
    );
    setShowResults(false);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const selectedCount = courses.filter((c) => c.selected).length;
    if (selectedCount === 0) {
      newErrors.courses = 'Please select at least one course';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateTotal = () => {
    if (!validateForm()) {
      return;
    }

    setShowResults(true);
  };

  const getDiscount = (count: number): number => {
    if (count >= 4) return 0.15;
    if (count === 3) return 0.1;
    if (count === 2) return 0.05;
    return 0;
  };

  const selectedCourses = courses.filter((c) => c.selected);
  const subtotal = selectedCourses.reduce((sum, course) => sum + course.fee, 0);
  const discountRate = getDiscount(selectedCourses.length);
  const discountAmount = subtotal * discountRate;
  const afterDiscount = subtotal - discountAmount;
  const vat = afterDiscount * 0.15;
  const total = afterDiscount + vat;

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#1e40af" />
        <Text style={styles.loadingText}>Loading courses...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <CalcIcon size={32} color="#1e40af" />
          <Text style={styles.title}>Fee Calculator</Text>
          <Text style={styles.subtitle}>
            Select your courses and enter your details to get a quote
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Details</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name *</Text>
            <TextInput
              style={[styles.input, errors.name && styles.inputError]}
              value={name}
              onChangeText={(text) => {
                setName(text);
                setErrors((prev) => ({ ...prev, name: '' }));
              }}
              placeholder="Enter your full name"
              placeholderTextColor="#9ca3af"
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              style={[styles.input, errors.phone && styles.inputError]}
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
                setErrors((prev) => ({ ...prev, phone: '' }));
              }}
              placeholder="e.g., 0821234567"
              placeholderTextColor="#9ca3af"
              keyboardType="phone-pad"
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address *</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrors((prev) => ({ ...prev, email: '' }));
              }}
              placeholder="your.email@example.com"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Courses *</Text>
          {errors.courses && <Text style={styles.errorText}>{errors.courses}</Text>}

          <View style={styles.courseList}>
            {courses.map((course) => (
              <TouchableOpacity
                key={course.id}
                style={[styles.courseItem, course.selected && styles.courseItemSelected]}
                onPress={() => {
                  toggleCourse(course.id);
                  setErrors((prev) => ({ ...prev, courses: '' }));
                }}>
                <View style={styles.courseCheckbox}>
                  {course.selected ? (
                    <CheckSquare size={24} color="#1e40af" />
                  ) : (
                    <Square size={24} color="#9ca3af" />
                  )}
                </View>
                <View style={styles.courseInfo}>
                  <Text style={styles.courseName}>{course.name}</Text>
                  <Text style={styles.courseType}>
                    {course.type === 'six-month' ? '6 months' : '6 weeks'}
                  </Text>
                </View>
                <Text style={styles.courseFee}>R{course.fee.toFixed(2)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.calculateButton} onPress={calculateTotal}>
          <CalcIcon size={20} color="#ffffff" />
          <Text style={styles.calculateButtonText}>Calculate Total</Text>
        </TouchableOpacity>

        {showResults && selectedCourses.length > 0 && (
          <View style={styles.resultsSection}>
            <Text style={styles.resultsTitle}>Quote Summary</Text>

            <View style={styles.selectedCoursesList}>
              <Text style={styles.selectedCoursesTitle}>Selected Courses:</Text>
              {selectedCourses.map((course) => (
                <View key={course.id} style={styles.selectedCourseItem}>
                  <Text style={styles.selectedCourseName}>{course.name}</Text>
                  <Text style={styles.selectedCourseFee}>R{course.fee.toFixed(2)}</Text>
                </View>
              ))}
            </View>

            <View style={styles.breakdown}>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>Subtotal:</Text>
                <Text style={styles.breakdownValue}>R{subtotal.toFixed(2)}</Text>
              </View>

              {discountRate > 0 && (
                <View style={styles.breakdownRow}>
                  <View style={styles.discountLabel}>
                    <Percent size={16} color="#059669" />
                    <Text style={styles.breakdownLabelDiscount}>
                      Discount ({(discountRate * 100).toFixed(0)}%):
                    </Text>
                  </View>
                  <Text style={styles.breakdownValueDiscount}>-R{discountAmount.toFixed(2)}</Text>
                </View>
              )}

              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>After Discount:</Text>
                <Text style={styles.breakdownValue}>R{afterDiscount.toFixed(2)}</Text>
              </View>

              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>VAT (15%):</Text>
                <Text style={styles.breakdownValue}>R{vat.toFixed(2)}</Text>
              </View>

              <View style={[styles.breakdownRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalValue}>R{total.toFixed(2)}</Text>
              </View>
            </View>

            <View style={styles.disclaimer}>
              <Text style={styles.disclaimerText}>
                This is a quoted fee only and not a formal invoice. Contact us to confirm your
                registration and receive an official invoice.
              </Text>
            </View>
          </View>
        )}
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
    backgroundColor: '#f9fafb',
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 12,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#ffffff',
  },
  inputError: {
    borderColor: '#dc2626',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    marginTop: 4,
  },
  courseList: {
    gap: 12,
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    gap: 12,
  },
  courseItemSelected: {
    borderColor: '#1e40af',
    backgroundColor: '#eff6ff',
  },
  courseCheckbox: {
    width: 24,
    height: 24,
  },
  courseInfo: {
    flex: 1,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  courseType: {
    fontSize: 14,
    color: '#6b7280',
  },
  courseFee: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  calculateButton: {
    flexDirection: 'row',
    backgroundColor: '#1e40af',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  calculateButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultsSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
  },
  selectedCoursesList: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  selectedCoursesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  selectedCourseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  selectedCourseName: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
  },
  selectedCourseFee: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  breakdown: {
    gap: 12,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownLabel: {
    fontSize: 16,
    color: '#6b7280',
  },
  breakdownValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  discountLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  breakdownLabelDiscount: {
    fontSize: 16,
    color: '#059669',
    fontWeight: '500',
  },
  breakdownValueDiscount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
  },
  totalRow: {
    marginTop: 12,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: '#e5e7eb',
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  disclaimer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#fef3c7',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  disclaimerText: {
    fontSize: 14,
    color: '#92400e',
    lineHeight: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6b7280',
  },
});
