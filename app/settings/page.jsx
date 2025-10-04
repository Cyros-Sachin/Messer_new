'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '../components/settings/Sidebar'
import AccountSettings from '../components/settings/AccountSettings'
import GeneralSettings from '../components/settings/GeneralSettings'
import NotificationSettings from '../components/settings/NotificationSettings'
import IntegrationSettings from '../components/settings/IntegrationSettings'
import PlanSettings from '../components/settings/PlanSettings'
import LegalSettings from '../components/settings/LegalSettings'

// Import icons
import { User, SettingsIcon, Bell, Link2, Heart, FileText } from 'lucide-react'

const tabs = [
  { id: 'Account', label: 'Account', icon: <User className="w-5 h-5" /> },
  { id: 'General', label: 'General', icon: <SettingsIcon className="w-5 h-5" /> },
  { id: 'Notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
  { id: 'Integrations', label: 'Integrations', icon: <Link2 className="w-5 h-5" /> },
  { id: 'Plans', label: 'Plans', icon: <Heart className="w-5 h-5" /> },
  { id: 'Legal & Info', label: 'Legal & Info', icon: <FileText className="w-5 h-5" /> },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('General') // default to General like screenshot

  const renderTab = () => {
    switch (activeTab) {
      case 'Account': return <AccountSettings />
      case 'General': return <GeneralSettings />
      case 'Notifications': return <NotificationSettings />
      case 'Integrations': return <IntegrationSettings />
      case 'Plans': return <PlanSettings />
      case 'Legal & Info': return <LegalSettings />
      default: return null
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      <main className="flex-1 p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
