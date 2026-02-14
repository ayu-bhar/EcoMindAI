import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Create styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#080e0d', // Match your dark theme
    color: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
    borderBottomColor: '#1e293b',
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4ade80', // Green-400
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  summarySection: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 10,
  },
  summaryText: {
    fontSize: 12,
    lineHeight: 1.6,
    color: '#d1d5db',
    fontStyle: 'italic',
  },
  itemCard: {
    marginBottom: 15,
    padding: 15,
    borderLeft: 3,
    borderLeftColor: '#22c55e',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  itemDesc: {
    fontSize: 10,
    color: '#94a3b8',
    marginBottom: 8,
  },
  grid: {
    flexDirection: 'row',
    gap: 20,
  },
  metaLabel: {
    fontSize: 8,
    color: '#64748b',
    textTransform: 'uppercase',
  },
  metaValue: {
    fontSize: 9,
    color: '#f8fafc',
  }
});

export const EcoPlanPDF = ({ plan, communityData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>EcoMindAI Strategy Report</Text>
        <Text style={styles.subtitle}>
          Prepared for {communityData.name} | {communityData.location}
        </Text>
      </View>

      {/* Summary */}
      <View style={styles.summarySection}>
        <Text style={[styles.subtitle, { marginBottom: 8, color: '#4ade80' }]}>Executive Summary</Text>
        <Text style={styles.summaryText}>{plan.summary}</Text>
      </View>

      {/* Action Items */}
      <Text style={[styles.subtitle, { marginBottom: 12 }]}>Strategic Initiatives</Text>
      {plan.actionItems.map((item, i) => (
        <View key={i} style={styles.itemCard}>
          <Text style={styles.itemName}>{i + 1}. {item.name}</Text>
          <Text style={styles.itemDesc}>{item.description}</Text>
          <View style={styles.grid}>
            <View>
              <Text style={styles.metaLabel}>Timeline</Text>
              <Text style={styles.metaValue}>{item.timeline}</Text>
            </View>
            <View>
              <Text style={styles.metaLabel}>Budget</Text>
              <Text style={styles.metaValue}>{item.cost}</Text>
            </View>
            <View>
              <Text style={styles.metaLabel}>Impact</Text>
              <Text style={styles.metaValue}>{item.impact}</Text>
            </View>
          </View>
        </View>
      ))}
    </Page>
  </Document>
);