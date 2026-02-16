import { CheckCircle, Clock, Video } from 'lucide-react';
import StatCard from './StatCard';

export default function QuickStats({ stats }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Quick Stats</h2>
      <div className="space-y-3">
        <StatCard
          icon={CheckCircle}
          label="Generated"
          value={stats.totalGenerations}
          color="green"
        />
        <StatCard
          icon={Clock}
          label="Avg Time"
          value={`${stats.averageTime}s`}
          color="blue"
        />
        <StatCard
          icon={Video}
          label="Videos"
          value={stats.totalVideos}
          color="orange"
        />
      </div>
    </div>
  );
}
