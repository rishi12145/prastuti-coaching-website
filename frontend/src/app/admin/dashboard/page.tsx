export const dynamic = "force-dynamic";

import React from 'react';

const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'Total Students', value: 1245, icon: '👨‍🎓' },
    { label: 'Total Courses', value: 38, icon: '📚' },
  ];

  const recentActivity = [
    'New student registered: Riya Sharma',
    'Course updated: Advanced JavaScript',
    'New payment received from: Rohit Singh',
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-6 text-gray-800">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 rounded-lg bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back, Admin. Here is your overview.</p>
        </header>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {stats.map((item) => (
            <article
              key={item.label}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{item.icon}</span>
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
                  {item.label}
                </span>
              </div>
              <p className="mt-4 text-4xl font-extrabold text-gray-900">{item.value}</p>
            </article>
          ))}

          <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:col-span-2 xl:col-span-1">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              <span className="text-sm text-gray-500">Latest updates</span>
            </div>
            <ul className="space-y-2">
              {recentActivity.map((line, idx) => (
                <li
                  key={`activity-${idx}`}
                  className="rounded-md bg-gray-50 px-4 py-3 text-sm text-gray-700"
                >
                  {line}
                </li>
              ))}
            </ul>
          </article>
        </section>
      </div>
    </main>
  );
};

export default AdminDashboard;