const express = require('express');
const ExcelJS = require('exceljs');
const geoip = require('geoip-lite');
const useragent = require('express-useragent');
const router = express.Router();

// In-memory storage (replace with MongoDB in production)
let analyticsData = [];
let sessionsData = new Map();

// Analytics data collection endpoint
router.post('/analytics', (req, res) => {
  try {
    const {
      sessionId,
      eventType,
      timestamp,
      country,
      state,
      city,
      referralSource,
      deviceType,
      browser,
      pagePath,
      pageTitle,
      buttonName,
      formName,
      platform,
      query,
      clinicId,
      ip
    } = req.body;

    // Get additional data from request
    const userAgent = req.get('User-Agent');
    const realIP = req.ip || req.connection.remoteAddress;
    
    // Create analytics entry
    const analyticsEntry = {
      id: Date.now() + Math.random(),
      sessionId,
      eventType,
      timestamp: timestamp || new Date().toISOString(),
      country: country || 'Unknown',
      state: state || 'Unknown',
      city: city || 'Unknown',
      referralSource: referralSource || 'Direct',
      deviceType: deviceType || 'Unknown',
      browser: browser || 'Unknown',
      pagePath,
      pageTitle,
      buttonName,
      formName,
      platform,
      query,
      clinicId,
      userAgent,
      ip: ip || realIP,
      createdAt: new Date(),
    };

    // Store the data
    analyticsData.push(analyticsEntry);

    // Update session data
    if (sessionId) {
      if (!sessionsData.has(sessionId)) {
        sessionsData.set(sessionId, {
          sessionId,
          startTime: new Date(),
          events: [],
          country: country || 'Unknown',
          state: state || 'Unknown',
          city: city || 'Unknown',
          referralSource: referralSource || 'Direct',
          deviceType: deviceType || 'Unknown',
          browser: browser || 'Unknown',
        });
      }
      
      const session = sessionsData.get(sessionId);
      session.events.push(analyticsEntry);
      session.lastActivity = new Date();
    }

    // Keep only last 30 days of data (optional cleanup)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    analyticsData = analyticsData.filter(entry => 
      new Date(entry.timestamp) > thirtyDaysAgo
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Failed to store analytics data' });
  }
});

// Get analytics data for admin dashboard
router.get('/admin/analytics', (req, res) => {
  try {
    const { range = '7days' } = req.query;
    
    // Calculate date range
    const now = new Date();
    let startDate = new Date();
    
    switch (range) {
      case '7days':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30days':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90days':
        startDate.setDate(now.getDate() - 90);
        break;
      case '1year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 7);
    }

    // Filter data by date range
    const filteredData = analyticsData.filter(entry => 
      new Date(entry.timestamp) >= startDate
    );

    // Process analytics data
    const processedData = processAnalyticsData(filteredData, startDate, now);
    
    res.json(processedData);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
});

// Export analytics to Excel
router.post('/admin/analytics/export', async (req, res) => {
  try {
    const { range = '7days' } = req.body;
    
    // Calculate date range
    const now = new Date();
    let startDate = new Date();
    
    switch (range) {
      case '7days':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30days':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90days':
        startDate.setDate(now.getDate() - 90);
        break;
      case '1year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 7);
    }

    // Filter data by date range
    const filteredData = analyticsData.filter(entry => 
      new Date(entry.timestamp) >= startDate
    );

    // Create Excel workbook
    const workbook = new ExcelJS.Workbook();
    
    // Summary Sheet
    const summarySheet = workbook.addWorksheet('Summary');
    const processedData = processAnalyticsData(filteredData, startDate, now);
    
    // Add summary data
    summarySheet.addRow(['Dental Tourism Clinics India - Analytics Report']);
    summarySheet.addRow(['Generated:', new Date().toLocaleString()]);
    summarySheet.addRow(['Date Range:', `${startDate.toLocaleDateString()} - ${now.toLocaleDateString()}`]);
    summarySheet.addRow([]);
    
    summarySheet.addRow(['Key Metrics']);
    summarySheet.addRow(['Total Visitors', processedData.totalVisitors]);
    summarySheet.addRow(['Total Sessions', processedData.totalSessions]);
    summarySheet.addRow(['Appointment Bookings', processedData.appointmentBookings]);
    summarySheet.addRow(['Conversion Rate', `${processedData.conversionRate.toFixed(2)}%`]);
    summarySheet.addRow([]);

    // Country data
    summarySheet.addRow(['Top Countries']);
    summarySheet.addRow(['Country', 'Visitors']);
    processedData.topCountries.forEach(item => {
      summarySheet.addRow([item.country, item.count]);
    });
    summarySheet.addRow([]);

    // State data
    summarySheet.addRow(['Top States']);
    summarySheet.addRow(['State', 'Visitors']);
    processedData.topStates.forEach(item => {
      summarySheet.addRow([item.state, item.count]);
    });
    summarySheet.addRow([]);

    // Referral sources
    summarySheet.addRow(['Traffic Sources']);
    summarySheet.addRow(['Source', 'Visitors']);
    processedData.referralSources.forEach(item => {
      summarySheet.addRow([item.source, item.count]);
    });

    // Device data
    summarySheet.addRow([]);
    summarySheet.addRow(['Device Types']);
    summarySheet.addRow(['Device', 'Count']);
    processedData.deviceTypes.forEach(item => {
      summarySheet.addRow([item.device, item.count]);
    });

    // Raw Events Sheet (anonymized)
    const eventsSheet = workbook.addWorksheet('Events');
    eventsSheet.addRow([
      'Date',
      'Event Type',
      'Country',
      'State',
      'City',
      'Referral Source',
      'Device Type',
      'Browser',
      'Page Path',
      'Button Name',
      'Platform'
    ]);

    filteredData.forEach(entry => {
      eventsSheet.addRow([
        new Date(entry.timestamp).toLocaleString(),
        entry.eventType,
        entry.country,
        entry.state,
        entry.city,
        entry.referralSource,
        entry.deviceType,
        entry.browser,
        entry.pagePath,
        entry.buttonName,
        entry.platform
      ]);
    });

    // Popular Pages Sheet
    const pagesSheet = workbook.addWorksheet('Popular Pages');
    pagesSheet.addRow(['Page Path', 'Views', 'Unique Visitors']);
    processedData.popularPages.forEach(page => {
      pagesSheet.addRow([page.path, page.views, page.uniqueVisitors]);
    });

    // Social Media Sheet
    const socialSheet = workbook.addWorksheet('Social Media');
    socialSheet.addRow(['Platform', 'Clicks']);
    processedData.socialMediaClicks.forEach(social => {
      socialSheet.addRow([social.platform, social.clicks]);
    });

    // Style the sheets
    [summarySheet, eventsSheet, pagesSheet, socialSheet].forEach(sheet => {
      // Auto-fit columns
      sheet.columns.forEach(column => {
        column.width = 15;
      });
      
      // Style header row
      if (sheet.getRow(1)) {
        sheet.getRow(1).font = { bold: true };
        sheet.getRow(1).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '2C73D2' }
        };
      }
    });

    // Generate Excel file
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=analytics-report-${new Date().toISOString().split('T')[0]}.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error('Error exporting analytics:', error);
    res.status(500).json({ error: 'Failed to export analytics data' });
  }
});

// Helper function to process analytics data
function processAnalyticsData(data, startDate, endDate) {
  const uniqueVisitors = new Set();
  const uniqueSessions = new Set();
  const countries = {};
  const states = {};
  const referralSources = {};
  const deviceTypes = {};
  const browsers = {};
  const pages = {};
  const socialClicks = {};
  const appDownloads = {};
  const dailyVisitors = {};
  
  let appointmentBookings = 0;

  data.forEach(entry => {
    // Unique visitors and sessions
    if (entry.sessionId) {
      uniqueSessions.add(entry.sessionId);
      uniqueVisitors.add(`${entry.sessionId}_${entry.country}_${entry.state}`);
    }

    // Geographic distribution
    countries[entry.country] = (countries[entry.country] || 0) + 1;
    if (entry.country === 'India' || entry.country === 'Unknown') {
      states[entry.state] = (states[entry.state] || 0) + 1;
    }

    // Traffic sources
    referralSources[entry.referralSource] = (referralSources[entry.referralSource] || 0) + 1;

    // Device and browser data
    deviceTypes[entry.deviceType] = (deviceTypes[entry.deviceType] || 0) + 1;
    browsers[entry.browser] = (browsers[entry.browser] || 0) + 1;

    // Page views
    if (entry.pagePath) {
      if (!pages[entry.pagePath]) {
        pages[entry.pagePath] = { views: 0, uniqueVisitors: new Set() };
      }
      pages[entry.pagePath].views++;
      if (entry.sessionId) {
        pages[entry.pagePath].uniqueVisitors.add(entry.sessionId);
      }
    }

    // Social media clicks
    if (entry.eventType === 'social_interaction') {
      socialClicks[entry.platform] = (socialClicks[entry.platform] || 0) + 1;
    }

    // App downloads
    if (entry.eventType === 'app_download') {
      appDownloads[entry.platform] = (appDownloads[entry.platform] || 0) + 1;
    }

    // Appointment bookings
    if (entry.eventType === 'appointment_booking') {
      appointmentBookings++;
    }

    // Daily visitors
    const date = new Date(entry.timestamp).toISOString().split('T')[0];
    if (!dailyVisitors[date]) {
      dailyVisitors[date] = new Set();
    }
    if (entry.sessionId) {
      dailyVisitors[date].add(entry.sessionId);
    }
  });

  // Convert to arrays and sort
  const topCountries = Object.entries(countries)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const topStates = Object.entries(states)
    .map(([state, count]) => ({ state, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const topReferralSources = Object.entries(referralSources)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count);

  const topDeviceTypes = Object.entries(deviceTypes)
    .map(([device, count]) => ({ device, count }))
    .sort((a, b) => b.count - a.count);

  const popularPages = Object.entries(pages)
    .map(([path, data]) => ({
      path,
      views: data.views,
      uniqueVisitors: data.uniqueVisitors.size
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 20);

  const socialMediaClicks = Object.entries(socialClicks)
    .map(([platform, clicks]) => ({ platform, clicks }));

  const appDownloadData = Object.entries(appDownloads)
    .map(([platform, downloads]) => ({ platform, downloads }));

  const dailyVisitorsArray = Object.entries(dailyVisitors)
    .map(([date, visitors]) => ({ date, count: visitors.size }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const conversionRate = uniqueVisitors.size > 0 
    ? (appointmentBookings / uniqueVisitors.size) * 100 
    : 0;

  return {
    totalVisitors: uniqueVisitors.size,
    totalSessions: uniqueSessions.size,
    appointmentBookings,
    conversionRate,
    topCountries,
    topStates,
    referralSources: topReferralSources,
    deviceTypes: topDeviceTypes,
    browsers: Object.entries(browsers).map(([browser, count]) => ({ browser, count })),
    popularPages,
    socialMediaClicks,
    appDownloads: appDownloadData,
    dailyVisitors: dailyVisitorsArray,
    averageSessionDuration: 0, // Would need session tracking for this
  };
}

module.exports = router;
