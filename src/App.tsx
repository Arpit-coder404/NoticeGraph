import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TopMasthead } from './components/layout/TopMasthead';
import { HomePage } from './pages/HomePage';
import { AnnouncementReaderPage } from './pages/AnnouncementReaderPage';
import { GraphPage } from './pages/GraphPage';
import { CalendarDeadlinesPage } from './pages/CalendarDeadlinesPage';
import { SavedNoticesPage } from './pages/SavedNoticesPage';
import { PersonalInboxPage } from './pages/PersonalInboxPage';
import { PublisherStudioPage } from './pages/PublisherStudioPage';
import { AdminAnalyticsPage } from './pages/AdminAnalyticsPage';

export function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-paper text-ink font-sans">
        <TopMasthead />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/announcement/:id" element={<AnnouncementReaderPage />} />
            <Route path="/graph" element={<GraphPage />} />
            <Route path="/calendar" element={<CalendarDeadlinesPage />} />
            <Route path="/saved" element={<SavedNoticesPage />} />
            <Route path="/inbox" element={<PersonalInboxPage />} />
            <Route path="/studio" element={<PublisherStudioPage />} />
            <Route path="/admin" element={<AdminAnalyticsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

