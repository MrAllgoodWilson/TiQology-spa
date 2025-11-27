import { useState } from 'react';
import type { UserPreferences } from '../../mocks/profileMock';

interface PreferencesCardProps {
  preferences: UserPreferences;
}

export default function PreferencesCard({ preferences: initialPreferences }: PreferencesCardProps) {
  const [preferences, setPreferences] = useState(initialPreferences);

  const handleNotificationChange = (key: keyof UserPreferences['notifications']) => {
    setPreferences({
      ...preferences,
      notifications: {
        ...preferences.notifications,
        [key]: !preferences.notifications[key],
      },
    });
  };

  const handlePrivacyChange = (key: keyof UserPreferences['privacy']) => {
    setPreferences({
      ...preferences,
      privacy: {
        ...preferences.privacy,
        [key]: !preferences.privacy[key],
      },
    });
  };

  const handleThemeChange = (theme: 'light' | 'dark' | 'auto') => {
    setPreferences({
      ...preferences,
      theme,
    });
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Preferences & Settings</h2>

        {/* Notifications */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-3">Notifications</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Email Notifications</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={preferences.notifications.email}
                onChange={() => handleNotificationChange('email')}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Push Notifications</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={preferences.notifications.push}
                onChange={() => handleNotificationChange('push')}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">SMS Notifications</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={preferences.notifications.sms}
                onChange={() => handleNotificationChange('sms')}
              />
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="divider"></div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Privacy</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Profile Visible</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={preferences.privacy.profileVisible}
                onChange={() => handlePrivacyChange('profileVisible')}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Show Activity</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={preferences.privacy.showActivity}
                onChange={() => handlePrivacyChange('showActivity')}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Share Data for Analytics</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={preferences.privacy.shareData}
                onChange={() => handlePrivacyChange('shareData')}
              />
            </div>
          </div>
        </div>

        {/* Theme */}
        <div className="divider"></div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Appearance</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Theme</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={preferences.theme}
              onChange={(e) => handleThemeChange(e.target.value as 'light' | 'dark' | 'auto')}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        </div>

        {/* Localization */}
        <div className="divider"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Language</span>
            </label>
            <select className="select select-bordered w-full" value={preferences.language}>
              <option value="en-US">English (US)</option>
              <option value="es-ES">Spanish</option>
              <option value="fr-FR">French</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Currency</span>
            </label>
            <select className="select select-bordered w-full" value={preferences.currency}>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Timezone</span>
          </label>
          <select className="select select-bordered w-full" value={preferences.timezone}>
            <option value="America/New_York">Eastern Time (ET)</option>
            <option value="America/Chicago">Central Time (CT)</option>
            <option value="America/Denver">Mountain Time (MT)</option>
            <option value="America/Los_Angeles">Pacific Time (PT)</option>
          </select>
        </div>

        {/* Actions */}
        <div className="card-actions justify-end mt-6">
          <button className="btn btn-ghost btn-sm">Reset</button>
          <button className="btn btn-primary btn-sm">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
