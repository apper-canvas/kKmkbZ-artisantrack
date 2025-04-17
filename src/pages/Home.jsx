import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutGrid, 
  ListFilter, 
  PlusCircle, 
  Search, 
  Palette, 
  Users, 
  ShoppingBag,
  BarChart3
} from 'lucide-react';
import MainFeature from '../components/MainFeature';

const Home = () => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample data for dashboard stats
  const stats = [
    { id: 1, title: "Total Artworks", value: "124", icon: Palette, color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" },
    { id: 2, title: "Active Artists", value: "28", icon: Users, color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" },
    { id: 3, title: "Sales This Month", value: "$8,245", icon: ShoppingBag, color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" },
    { id: 4, title: "Pending Commissions", value: "$1,890", icon: BarChart3, color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" },
  ];
  
  const tabs = [
    { id: 'inventory', label: 'Inventory' },
    { id: 'artists', label: 'Artists' },
    { id: 'sales', label: 'Sales' },
    { id: 'customers', label: 'Customers' },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: stat.id * 0.1 }}
            className="card p-5 flex items-center"
          >
            <div className={`p-3 rounded-lg mr-4 ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-surface-500 dark:text-surface-400">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Search and Add New */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-surface-400" />
          </div>
          <input
            type="text"
            className="input pl-10"
            placeholder="Search artworks, artists, or customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn btn-primary flex items-center justify-center gap-2"
        >
          <PlusCircle className="h-5 w-5" />
          <span>Add New</span>
        </motion.button>
      </div>
      
      {/* Tabs */}
      <div className="mb-6 border-b border-surface-200 dark:border-surface-700">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap relative transition-colors
                ${activeTab === tab.id 
                  ? 'text-primary dark:text-primary-light' 
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
                }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary dark:bg-primary-light"
                  initial={false}
                />
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* View Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300">
            <LayoutGrid className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-lg text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700">
            <ListFilter className="h-5 w-5" />
          </button>
        </div>
        <div className="text-sm text-surface-500 dark:text-surface-400">
          Showing {activeTab === 'inventory' ? '124' : activeTab === 'artists' ? '28' : activeTab === 'sales' ? '56' : '42'} results
        </div>
      </div>
      
      {/* Main Feature */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <MainFeature activeTab={activeTab} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Home;