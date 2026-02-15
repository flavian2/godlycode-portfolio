import { motion } from 'framer-motion';

/**
 * ProjectMockup - Creates beautiful visual mockups for projects using CSS and SVG
 * Each project type has a unique mockup design
 */
const ProjectMockup = ({ projectId, color = '#D4AF37' }) => {
  const mockups = {
    banking: (
      <div className="relative w-full h-full bg-gradient-to-br from-dark-secondary to-dark-bg rounded-lg p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-xs text-gray-500">Dashboard</div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-3 rounded"
            >
              <div className="w-8 h-8 rounded-full mb-2" style={{ background: `${color}20` }} />
              <div className="h-2 bg-gray-700 rounded w-3/4 mb-1" />
              <div className="h-4 rounded w-full" style={{ background: color }} />
            </motion.div>
          ))}
        </div>

        {/* Transaction Chart */}
        <div className="glass p-4 rounded mb-3">
          <div className="h-2 bg-gray-700 rounded w-1/4 mb-3" />
          <div className="flex items-end justify-between h-20">
            {[40, 70, 50, 90, 60, 80, 95].map((height, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                className="w-2 rounded-t"
                style={{ background: color }}
              />
            ))}
          </div>
        </div>

        {/* Transaction List */}
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="flex items-center justify-between glass p-2 rounded"
            >
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full" style={{ background: `${color}30` }} />
                <div className="h-2 bg-gray-700 rounded w-20" />
              </div>
              <div className="h-2 rounded w-12" style={{ background: color }} />
            </motion.div>
          ))}
        </div>
      </div>
    ),

    delivery: (
      <div className="relative w-full h-full bg-gradient-to-br from-dark-secondary to-dark-bg rounded-lg p-6 overflow-hidden">
        {/* Map Background */}
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <path d="M0,200 Q100,100 200,200 T400,200" stroke={color} strokeWidth="2" fill="none" />
            <path d="M0,150 Q100,50 200,150 T400,150" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
            <path d="M0,250 Q100,150 200,250 T400,250" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
          </svg>
        </div>

        {/* Map Pins */}
        <div className="relative z-10">
          {[
            { x: 30, y: 40 },
            { x: 60, y: 60 },
            { x: 50, y: 80 }
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.3, type: 'spring' }}
              className="absolute"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <div className="relative">
                <div
                  className="w-6 h-6 rounded-full animate-pulse"
                  style={{ background: color }}
                />
                <div
                  className="absolute top-0 left-0 w-6 h-6 rounded-full animate-ping"
                  style={{ background: `${color}40` }}
                />
              </div>
            </motion.div>
          ))}

          {/* Delivery Cards */}
          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.2 }}
                className="glass p-3 rounded flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded" style={{ background: `${color}30` }} />
                  <div>
                    <div className="h-2 bg-gray-700 rounded w-20 mb-1" />
                    <div className="h-1.5 bg-gray-800 rounded w-16" />
                  </div>
                </div>
                <div className="w-16 h-6 rounded" style={{ background: color }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    ),

    education: (
      <div className="relative w-full h-full bg-gradient-to-br from-dark-secondary to-dark-bg rounded-lg p-6 overflow-hidden">
        {/* Header */}
        <div className="mb-6">
          <div className="h-3 bg-gray-700 rounded w-1/3 mb-2" />
          <div className="h-2 bg-gray-800 rounded w-1/2" />
        </div>

        {/* Student Cards Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15 }}
              className="glass p-3 rounded"
            >
              <div className="w-12 h-12 rounded-full mx-auto mb-2" style={{ background: `${color}30` }} />
              <div className="h-2 bg-gray-700 rounded w-full mb-1" />
              <div className="h-1.5 bg-gray-800 rounded w-3/4 mx-auto" />
            </motion.div>
          ))}
        </div>

        {/* Grade Chart */}
        <div className="glass p-4 rounded">
          <div className="h-2 bg-gray-700 rounded w-1/4 mb-3" />
          <div className="space-y-2">
            {[85, 92, 78, 95, 88].map((width, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="w-6 h-2 bg-gray-800 rounded" />
                <div className="flex-1 h-3 bg-gray-800 rounded overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${width}%` }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                    className="h-full rounded"
                    style={{ background: color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),

    trading: (
      <div className="relative w-full h-full bg-gradient-to-br from-dark-secondary to-dark-bg rounded-lg p-6 overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-4">
            <div className="h-2 bg-green-500 rounded w-16" />
            <div className="h-2 bg-gray-700 rounded w-12" />
          </div>
          <div className="flex space-x-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-2 h-2 bg-gray-700 rounded-full" />
            ))}
          </div>
        </div>

        {/* Candlestick Chart */}
        <div className="glass p-4 rounded mb-3 h-32 flex items-end justify-around">
          {[
            { h: 60, up: true },
            { h: 80, up: false },
            { h: 70, up: true },
            { h: 90, up: true },
            { h: 75, up: false },
            { h: 85, up: true },
            { h: 95, up: true }
          ].map((candle, i) => (
            <motion.div
              key={i}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: `${candle.h}%`, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="w-1.5 rounded"
              style={{ background: candle.up ? '#10B981' : '#EF4444' }}
            />
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[
            { label: 'BTC', value: '+5.2%', up: true },
            { label: 'ETH', value: '+3.8%', up: true },
            { label: 'ADA', value: '-1.4%', up: false }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="glass p-2 rounded text-center"
            >
              <div className="h-1.5 bg-gray-700 rounded w-2/3 mx-auto mb-1" />
              <div
                className="h-2 rounded w-full"
                style={{ background: stat.up ? '#10B981' : '#EF4444' }}
              />
            </motion.div>
          ))}
        </div>

        {/* Portfolio */}
        <div className="glass p-3 rounded">
          <div className="flex items-center justify-between mb-2">
            <div className="h-2 bg-gray-700 rounded w-1/3" />
            <div className="h-3 rounded w-16" style={{ background: color }} />
          </div>
          <div className="h-1 bg-gray-800 rounded w-full" />
        </div>
      </div>
    )
  };

  return (
    <div className="w-full aspect-[4/3]">
      {mockups[projectId] || mockups.banking}
    </div>
  );
};

export default ProjectMockup;
