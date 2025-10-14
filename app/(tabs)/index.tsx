import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Empowering the Nation</Text>
          <Text style={styles.logoSubtext}>Skills Development & Training</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Us</Text>
          <Text style={styles.description}>
            Empowering the Nation offers comprehensive training programs designed to equip individuals
            with practical skills for personal and professional development. Our courses are taught by
            experienced instructors at three convenient locations across Johannesburg.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Programs</Text>
          <Text style={styles.description}>
            We offer both intensive six-month courses and shorter six-week programs to suit your
            schedule and learning goals. All courses include hands-on training and certification
            upon completion.
          </Text>
        </View>

        <View style={styles.courseLinksContainer}>
          <TouchableOpacity
            style={styles.courseLink}
            onPress={() => router.push('/courses/six-month')}>
            <View style={styles.courseLinkContent}>
              <View>
                <Text style={styles.courseLinkTitle}>Six-Month Courses</Text>
                <Text style={styles.courseLinkSubtitle}>In-depth professional training</Text>
              </View>
              <ArrowRight size={24} color="#1eaf6eff" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.courseLink}
            onPress={() => router.push('/courses/six-week')}>
            <View style={styles.courseLinkContent}>
              <View>
                <Text style={styles.courseLinkTitle}>Six-Week Courses</Text>
                <Text style={styles.courseLinkSubtitle}>Quick skill development</Text>
              </View>
              <ArrowRight size={24} color="#1e40af" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to Get Started?</Text>
          <Text style={styles.ctaDescription}>
            Use our fee calculator to estimate your course costs, or contact us to speak with
            a consultant who can help you choose the right program.
          </Text>
          <View style={styles.ctaButtons}>
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#1e40af',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  logoSubtext: {
    fontSize: 16,
    color: '#bfdbfe',
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
  },
  courseLinksContainer: {
    marginVertical: 24,
  },
  courseLink: {
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
  courseLinkContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseLinkTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  courseLinkSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  ctaSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  ctaDescription: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
    marginBottom: 20,
  },
  ctaButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#1e40af',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1e40af',
  },
  secondaryButtonText: {
    color: '#1e40af',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
