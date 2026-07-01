import { useAuth } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";
import DashboardCard from "../components/DashboardCard";

function Dashboard() {
  const { user } = useAuth();

  return (
    <MainLayout>
      <div>
        <h1 className="text-4xl font-bold">
          Welcome back, {user?.fullName || user?.username} 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Here's an overview of your channel.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <DashboardCard title="Videos" value="0" />
          <DashboardCard title="Subscribers" value="0" />
          <DashboardCard title="Views" value="0" />
          <DashboardCard title="Playlists" value="0" />
        </div>

        <div className="bg-white rounded-xl shadow p-6 mt-8">
          <h2 className="text-2xl font-semibold mb-4">
            Recent Activity
          </h2>

          <p className="text-gray-500">
            Upload your first video to get started 🚀
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;