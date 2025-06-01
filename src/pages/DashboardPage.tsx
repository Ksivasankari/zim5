import React from 'react';
import { Users, Activity, AlertCircle, Clock, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PageHeader from '../components/layout/PageHeader';
import StatCard from '../components/dashboard/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { dashboardSummary } from '../data/mockData';
import { formatDate, formatTime } from '../lib/utils';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const handleWhatsAppMessage = (phone: string, name: string) => {
    const message = `Hi ${name}, your gym membership has expired. Please renew your membership to continue enjoying our services.`;
    const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <div>
      <PageHeader 
        title={`Welcome back, ${user?.name?.split(' ')[0] || 'User'}`} 
        description="Here's what's happening at your gym today."
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Members"
          value={dashboardSummary.totalMembers}
          icon={<Users className="h-full w-full" />}
          change={{ value: 4.5, isPositive: true }}
        />
        
        <StatCard
          title="Checked In Today"
          value={dashboardSummary.checkedInToday}
          icon={<Activity className="h-full w-full" />}
          change={{ value: 1.2, isPositive: false }}
          iconColor="text-secondary-600"
          iconBackground="bg-secondary-100"
        />

        <StatCard
          title="Expired Members"
          value={dashboardSummary.expiredMembers}
          icon={<AlertCircle className="h-full w-full" />}
          iconColor="text-red-600"
          iconBackground="bg-red-100"
        />

        <StatCard
          title="Expiring Soon"
          value={dashboardSummary.expiringMembers}
          icon={<Clock className="h-full w-full" />}
          iconColor="text-amber-600"
          iconBackground="bg-amber-100"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Expired Memberships</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-gray-200">
              {dashboardSummary.expiredMembersList.map((member) => (
                <div key={member.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0EA5E9&color=fff`}
                      alt={member.name}
                    />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-500">Expired on {formatDate(member.expiryDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleWhatsAppMessage(member.phone, member.name)}
                      leftIcon={<ExternalLink size={14} />}
                    >
                      WhatsApp
                    </Button>
                    <Link to={`/members/${member.id}`}>
                      <Button variant="outline" size="sm">View</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expiring Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-gray-200">
              {dashboardSummary.expiringMembersList.map((member) => (
                <div key={member.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0EA5E9&color=fff`}
                      alt={member.name}
                    />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-500">Expires on {formatDate(member.expiryDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleWhatsAppMessage(member.phone, member.name)}
                      leftIcon={<ExternalLink size={14} />}
                    >
                      WhatsApp
                    </Button>
                    <Link to={`/members/${member.id}`}>
                      <Button variant="outline" size="sm">View</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;