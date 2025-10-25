import Sidebar from '../components/Sidebar';
import OwnerDashboard from '../components/OwnerDashboard';

export default function OwnerDashboardPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <OwnerDashboard />
    </div>
  );
}
