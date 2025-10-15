import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { Phone, Mail, MapPin, Clock } from 'lucide-react-native';

const venues = [
  {
    name: 'Sandton Campus',
    address: '123 Rivonia Road, Sandton, Johannesburg, 2196',
    phone: '011 234 5678',
    email: 'sandton@empoweringthenation.co.za',
    coordinates: { latitude: -26.1076, longitude: 28.0567 },
  },
  {
    name: 'Rosebank Campus',
    address: '45 Oxford Road, Rosebank, Johannesburg, 2196',
    phone: '011 345 6789',
    email: 'rosebank@empoweringthenation.co.za',
    coordinates: { latitude: -26.1469, longitude: 28.0404 },
  },
  {
    name: 'Randburg Campus',
    address: '78 Republic Road, Randburg, Johannesburg, 2194',
    phone: '011 456 7890',
    email: 'randburg@empoweringthenation.co.za',
    coordinates: { latitude: -26.0942, longitude: 27.9820 },
  },
];

export default function ContactScreen() {
  const handlePhonePress = (phone: string) => {
    Linking.openURL(`tel:R{phone.replace(/\s/g, '')}`);
  };

  const handleEmailPress = (email: string) => {
    Linking.openURL(`mailto:R{email}`);
  };

  const handleMapPress = (latitude: number, longitude: number, name: string) => {
    const url = `https://www.bing.com/maps/directions?ty=0&v=2&sV=1&rtp=%7Epos.-33.960960388183594_18.471986770629883__The+IIE%27s+Varsity+College_&mode=d&cp=-33.960960%7E18.467266&lvl=16&style=r=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Contact Us</Text>
          <Text style={styles.subtitle}>
            Visit any of our three convenient locations across Johannesburg or get in touch with us
            to learn more about our courses.
          </Text>
        </View>

        <View style={styles.businessHours}>
          <Clock size={24} color="#1eaf73ff" />
          <View style={styles.hoursContent}>
            <Text style={styles.hoursTitle}>Business Hours</Text>
            <Text style={styles.hoursText}>Monday - Friday: 8:00 AM - 5:00 PM</Text>
            <Text style={styles.hoursText}>Saturday: 9:00 AM - 1:00 PM</Text>
            <Text style={styles.hoursText}>Sunday: Closed</Text>
          </View>
        </View>

        <View style={styles.venuesSection}>
          <Text style={styles.sectionTitle}>Our Locations</Text>

          {venues.map((venue, index) => (
            <View key={index} style={styles.venueCard}>
              <Text style={styles.venueName}>{venue.name}</Text>

              <TouchableOpacity
                style={styles.contactItem}
                onPress={() =>
                  handleMapPress(venue.coordinates.latitude, venue.coordinates.longitude, venue.name)
                }>
                <MapPin size={20} color="#1eaf73ff" />
                <Text style={styles.contactText}>{venue.address}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.contactItem}
                onPress={() => handlePhonePress(venue.phone)}>
                <Phone size={20} color="#1eaf73ff" />
                <Text style={styles.contactLink}>{venue.phone}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.contactItem}
                onPress={() => handleEmailPress(venue.email)}>
                <Mail size={20} color="#1eaf73ff" />
                <Text style={styles.contactLink}>{venue.email}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.mapButton}
                onPress={() =>
                  handleMapPress(venue.coordinates.latitude, venue.coordinates.longitude, venue.name)
                }>
                <MapPin size={16} color="#ffffff" />
                <Text style={styles.mapButtonText}>View on Map</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>General Inquiries</Text>
          <Text style={styles.infoText}>
            For general questions about our courses, enrollment process, or any other inquiries,
            please contact our head office:
          </Text>

          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => handlePhonePress('011 123 4567')}>
            <Phone size={20} color="#1eaf73ff" />
            <Text style={styles.contactLink}>011 123 4567</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => handleEmailPress('info@empoweringthenation.co.za')}>
            <Mail size={20} color="#1eaf73ff" />
            <Text style={styles.contactLink}>info@empoweringthenation.co.za</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to Start Learning?</Text>
          <Text style={styles.ctaText}>
            Use our fee calculator to see how much your chosen courses will cost, including any
            applicable discounts.
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
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
  },
  businessHours: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: 16,
  },
  hoursContent: {
    flex: 1,
  },
  hoursTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  hoursText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 22,
  },
  venuesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  venueCard: {
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
  venueName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  contactText: {
    flex: 1,
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  contactLink: {
    flex: 1,
    fontSize: 14,
    color: '#1eaf73ff',
    textDecorationLine: 'underline',
  },
  mapButton: {
    flexDirection: 'row',
    backgroundColor: '#1eaf73ff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  mapButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 22,
    marginBottom: 16,
  },
  ctaSection: {
    backgroundColor: '#dbeafe',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#1eaf73ff',
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1eaf73ff',
    marginBottom: 8,
  },
  ctaText: {
    fontSize: 14,
    color: '#1eaf73ff',
    lineHeight: 22,
  },
});
