import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Camera, ChevronRight, HelpCircle, Info, MessageCircle, Check, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import paygoLogo from "@/assets/paygo-logo.png";

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  about: string;
}

const defaultProfile: UserProfile = {
  fullName: "Frank",
  email: "sureplug3848@gmail.com",
  phone: "+234 801 234 5678",
  about: "PayGo user since 2023"
};

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(defaultProfile);

  // Load profile from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfile(parsed);
      setEditedProfile(parsed);
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    localStorage.setItem('userProfile', JSON.stringify(editedProfile));
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully.",
    });
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <button onClick={() => navigate('/home')} className="p-2 -ml-2">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <img src={paygoLogo} alt="PayGo" className="h-8" />
        <div className="w-10" />
      </div>

      {/* Profile Avatar Section */}
      <div className="bg-white px-6 py-8 flex flex-col items-center">
        <div className="relative">
          {/* Avatar with gradient ring */}
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-violet-200 via-purple-200 to-fuchsia-200 flex items-center justify-center ring-4 ring-purple-100">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-violet-100 to-purple-50 flex items-center justify-center">
              <User className="w-16 h-16 text-violet-500" />
            </div>
          </div>
          {/* Camera button */}
          <button className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center shadow-lg">
            <Camera className="w-5 h-5 text-white" />
          </button>
        </div>
        <p className="mt-4 text-gray-500 text-sm">Tap camera icon to change profile picture</p>
      </div>

      {/* Profile Information Card */}
      <div className="px-4 mt-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            {/* Profile Information Header */}
            <button 
              onClick={handleEditClick}
              className="w-full flex items-center gap-4 p-4 border-b border-gray-100"
            >
              <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center">
                <User className="w-6 h-6 text-violet-500" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-gray-900">Profile Information</h3>
                <p className="text-sm text-gray-500">
                  {isEditing ? "Edit your profile details" : "View and edit your profile details"}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            {/* User Details */}
            <div className="p-4 space-y-4">
              {isEditing ? (
                <>
                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Full Name</label>
                    <Input
                      value={editedProfile.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="h-12"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Email</label>
                    <Input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="h-12"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Phone</label>
                    <Input
                      type="tel"
                      value={editedProfile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="h-12"
                      placeholder="Enter your phone"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block mb-1">About</label>
                    <Input
                      value={editedProfile.about}
                      onChange={(e) => handleInputChange('about', e.target.value)}
                      className="h-12"
                      placeholder="Tell us about yourself"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button 
                      onClick={handleCancel}
                      variant="outline" 
                      className="flex-1 h-12"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSave}
                      className="flex-1 h-12 bg-violet-500 hover:bg-violet-600"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-semibold text-gray-900">{profile.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-gray-900">{profile.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-semibold text-gray-900">{profile.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">About</p>
                    <p className="font-semibold text-gray-900">{profile.about}</p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Help & Support */}
      <div className="px-4 mt-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <button className="w-full flex items-center gap-4 p-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-emerald-500" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-gray-900">Help & Support</h3>
                <p className="text-sm text-gray-500">Get help with using PayGo</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </CardContent>
        </Card>
      </div>

      {/* About PayGo */}
      <div className="px-4 mt-4 pb-24">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <button className="w-full flex items-center gap-4 p-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Info className="w-6 h-6 text-blue-500" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-gray-900">About PayGo</h3>
                <p className="text-sm text-gray-500">Learn more about PayGo services</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Chat FAB */}
      <button className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-violet-500 flex items-center justify-center shadow-lg hover:bg-violet-600 transition-colors">
        <MessageCircle className="w-7 h-7 text-white" />
      </button>
    </div>
  );
};

export default Profile;
