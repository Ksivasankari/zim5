import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Calendar, Award, Users } from 'lucide-react';
import { trainers, members } from '../data/mockData';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { formatDate } from '../lib/utils';
import { useMemberContext } from '../context/MemberContext';
import { Trainer } from '../types';

const TrainerDetailsPage: React.FC = () => {
  const { id } = useParams();
  const {trainers,updateTrainer} = useMemberContext();
  const trainer = trainers.find(t => t.id === id);

  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState(trainer);

  const assignedMembers = members.slice(0, 3); 
  if (!trainer) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Trainer not found</h2>
          <p className="mt-2 text-gray-600">The trainer you're looking for doesn't exist.</p>
          <Link to="/members" className="mt-4 inline-block">
            <Button variant="primary" leftIcon={<ArrowLeft size={16} />}>
              Back to Members
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData!, [field]: value });
  };

  const handleSave = () => {
    // updateTrainer();
    console.log('Updated data:', formData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <Link to="/members" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Members
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex items-center">
            <img
              src={trainer.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(trainer.name)}&background=0EA5E9&color=fff`}
              alt={trainer.name}
              className="h-16 w-16 rounded-full"
            />
            <div className="ml-4">
              {isEditing ? (
                <input
                  type="text"
                  value={formData?.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="text-2xl font-bold text-gray-900 border rounded px-2 py-1"
                />
              ) : (
                <h1 className="text-2xl font-bold text-gray-900">{trainer.name}</h1>
              )}
              <div className="mt-1 flex items-center">
                <Badge variant={trainer.status === 'active' ? 'success' : 'danger'}>
                  {trainer.status.charAt(0).toUpperCase() + trainer.status.slice(1)}
                </Badge>
                <span className="ml-2 text-sm text-gray-500">Trainer ID: {trainer.trainerId}</span>
              </div>
            </div>
            <Button variant="outline" className="ml-[200px]" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel Edit' : 'Edit Trainer'}
        </Button>
          </div>
        </div>

        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="flex items-center">
                    <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {isEditing ? (
                        <input
                          type="email"
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                          value={formData?.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                        />
                      ) : (
                        trainer.email
                      )}
                    </dd>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center">
                    <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
                      <Phone className="h-4 w-4 mr-2" />
                      Phone
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {isEditing ? (
                        <input
                          type="text"
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                          value={formData?.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                        />
                      ) : (
                        trainer.phone
                      )}
                    </dd>
                  </div>

                  {/* Join Date */}
                  <div className="flex items-center">
                    <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
                      <Calendar className="h-4 w-4 mr-2" />
                      Joined
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formatDate(trainer.joinDate)}
                    </dd>
                  </div>

                  {/* Experience */}
                  <div className="flex items-center">
                    <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
                      <Award className="h-4 w-4 mr-2" />
                      Experience
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {isEditing ? (
                        <input
                          type="text"
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                          value={formData?.experience}
                          onChange={(e) => handleChange('experience', e.target.value)}
                        />
                      ) : (
                        trainer.experience
                      )}
                    </dd>
                  </div>
                </dl>

                {/* Save Button */}
                {isEditing && (
                  <div className="mt-4">
                    <Button variant="primary" onClick={handleSave}>
                      Save Changes
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Specialization */}
            <Card>
              <CardHeader>
                <CardTitle>Specialization</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <textarea
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                    rows={2}
                    value={formData?.specialization}
                    onChange={(e) => handleChange('specialization', e.target.value)}
                  />
                ) : (
                  <p className="text-gray-700">{trainer.specialization}</p>
                )}
              </CardContent>
            </Card>

            {/* Assigned Members */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Assigned Members</span>
                  <Button variant="outline" size="sm">
                    Assign New Member
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-gray-200">
                  {assignedMembers.map((member) => (
                    <div key={member.id} className="py-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0EA5E9&color=fff`}
                          alt={member.name}
                          className="h-10 w-10 rounded-full"
                        />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{member.name}</p>
                          <p className="text-sm text-gray-500">{member.email}</p>
                        </div>
                      </div>
                      <Link to={`/members/${member.id}`}>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetailsPage;
