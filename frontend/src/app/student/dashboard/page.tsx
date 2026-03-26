"use client";

export const dynamic = "force-dynamic";

import React from 'react';

const StudentDashboard: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-50 p-6 text-gray-800">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 rounded-lg bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back, Student. Here is your overview.</p>
        </header>

        <section className="grid gap-5 md:grid-cols-2">
          <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">My Courses</h2>
            <p className="mt-2 text-gray-600">Enrolled in 3 courses.</p>
          </article>

          <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Tests</h2>
            <p className="mt-2 text-gray-600">Next test: Math Mock Test on 2026-03-30</p>
          </article>
        </section>
      </div>
    </main>
  );
};

export default StudentDashboard;
