import React from 'react';
import { Clock, CalendarCheck, User, History } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useMemberContext } from '../../context/MemberContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { formatDate, formatTime } from '../../lib/utils';
import toast from 'react-hot-toast';

const CustomerDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { members, memberships } = useMemberContext();
  
  // Find the member details for the logged-in user
  const member = members.find(m => m.email === user?.email);
  const membership = member ? memberships.find(m => m.id === member.membershipId) : null;

  const handleCheckIn = () => {
    // In a real app, this would call an API
    toast.success('Successfully checked in!');
  };

  const handleCheckOut = () => {
    // In a real app, this would call an API
    toast.success('Successfully checked out!');
  };

  if (!member || !membership) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Member information not found.</p>
      </div>
    );
  }

  // Calculate membership expiry
  const joinDate = new Date(member.joinDate);
  const expiryDate = new Date(joinDate);
  expiryDate.setDate(expiryDate.getDate() + membership.duration);
  const daysLeft = Math.ceil((expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {member.name}</h1>
        <p className="mt-1 text-gray-500">Manage your gym activities and view your profile</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="primary"
              className="w-full"
              leftIcon={<Clock />}
              onClick={handleCheckIn}
            >
              Check In
            </Button>
            <Button
              variant="outline"
              className="w-full"
              leftIcon={<Clock />}
              onClick={handleCheckOut}
            >
              Check Out
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Membership Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Plan</span>
                <span className="font-medium">{membership.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Status</span>
                <span className={`font-medium ${daysLeft > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {daysLeft > 0 ? 'Active' : 'Expired'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Expires</span>
                <span className="font-medium">
                  {formatDate(expiryDate)} ({daysLeft} days left)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Check-ins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center">
                    <CalendarCheck className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium">Check-in</p>
                      <p className="text-sm text-gray-500">{formatDate(new Date(Date.now() - i * 24 * 60 * 60 * 1000))}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{formatTime(new Date(Date.now() - i * 24 * 60 * 60 * 1000))}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Name</label>
                <p className="mt-1">{member.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Member ID</label>
                <p className="mt-1">{member.memberId}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Email</label>
                <p className="mt-1">{member.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Phone</label>
                <p className="mt-1">{member.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Join Date</label>
                <p className="mt-1">{formatDate(member.joinDate)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDashboardPage;