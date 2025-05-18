import React from 'react';
import { 
  UserGroupIcon, 
  DocumentTextIcon, 
  CheckCircleIcon, 
  ClockIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';

const stats = [
  { 
    name: 'Total Agents', 
    value: '24', 
    icon: UserGroupIcon, 
    change: '+4', 
    changeType: 'increase',
    description: 'Active agents in the system'
  },
  { 
    name: 'Active Lists', 
    value: '12', 
    icon: DocumentTextIcon, 
    change: '+2', 
    changeType: 'increase',
    description: 'Currently active lists'
  },
  { 
    name: 'Completed Tasks', 
    value: '156', 
    icon: CheckCircleIcon, 
    change: '+12', 
    changeType: 'increase',
    description: 'Tasks completed this month'
  },
  { 
    name: 'Pending Tasks', 
    value: '8', 
    icon: ClockIcon, 
    change: '-2', 
    changeType: 'decrease',
    description: 'Tasks awaiting completion'
  },
];

const recentActivity = [
  {
    id: 1,
    type: 'agent',
    title: 'New agent added',
    description: 'John Doe was added to the system',
    time: '1h ago',
    icon: UserGroupIcon,
    color: 'bg-blue-500'
  },
  {
    id: 2,
    type: 'list',
    title: 'List upload completed',
    description: 'March Leads list was successfully uploaded',
    time: '3h ago',
    icon: DocumentTextIcon,
    color: 'bg-green-500'
  },
  {
    id: 3,
    type: 'task',
    title: 'Task completed',
    description: 'Lead follow-up task was marked as complete',
    time: '5h ago',
    icon: CheckCircleIcon,
    color: 'bg-purple-500'
  }
];

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="mt-1 text-sm text-gray-500">Welcome back! Here's what's happening.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Generate Report
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Export Data
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow hover:shadow-md transition-shadow duration-200"
          >
            <dt>
              <div className="absolute rounded-md bg-blue-50 p-3">
                <stat.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.changeType === 'increase' ? (
                  <ArrowUpIcon className="h-4 w-4 flex-shrink-0 self-center" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 flex-shrink-0 self-center" />
                )}
                <span className="ml-1">{stat.change}</span>
              </p>
            </dd>
            <p className="mt-1 ml-16 text-sm text-gray-500">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800">View all</button>
          </div>
          <div className="border-t border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="flow-root">
                <ul className="-mb-8">
                  {recentActivity.map((activity, activityIdx) => (
                    <li key={activity.id}>
                      <div className="relative pb-8">
                        {activityIdx !== recentActivity.length - 1 ? (
                          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${activity.color}`}>
                              <activity.icon className="h-5 w-5 text-white" aria-hidden="true" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                              <p className="text-sm text-gray-500">{activity.description}</p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              <time dateTime="2024-03-20">{activity.time}</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Quick Actions</h3>
          </div>
          <div className="border-t border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <UserGroupIcon className="h-5 w-5 mr-2 text-gray-400" />
                  Add New Agent
                </button>
                <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <DocumentTextIcon className="h-5 w-5 mr-2 text-gray-400" />
                  Upload List
                </button>
                <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <CheckCircleIcon className="h-5 w-5 mr-2 text-gray-400" />
                  Create Task
                </button>
                <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <ClockIcon className="h-5 w-5 mr-2 text-gray-400" />
                  Schedule Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 