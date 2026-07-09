// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DashboardHomePage() {
  // 📊 Real Dashboard Stats


  // 🔔 Notifications Widget


  // Stats cards data from

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Welcome back! Here's what's happening with your workspace.
          </p>
        </div>
        <a
          href="/dashboard/tasks/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition shadow-sm"
        >
          <span>+</span> New Task
        </a>
      </div>

      {/* Stats Cards - Real DB Data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
       
              
        
      </div>

      {/* Bottom Section: Recent Activity & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
              Recent Activity
            </h2>
            <a href="/dashboard/activity" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              View all
            </a>
          </div>
          
            
          </div>
        </div>

        {/* Notifications Widget */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
              Notifications
            </h2>
           
          </div>
          
          

          <div className="border-t border-gray-100 dark:border-gray-800 pt-3 mt-3 text-center">
            <a
              href="/dashboard/notifications"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              View all notifications →
            </a>
          </div>
        </div>
      </div>
    
  );
}