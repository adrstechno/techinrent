import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Briefcase,
  MapPin,
  Award,
  Calendar,
  Clock,
  BookOpen,
  Image,
  Sparkles
} from "lucide-react";
import ProfileBackgroundGenerator from "./ProfileBackgroundGenerator";
import { useToast } from "@/hooks/use-toast";

export default function ProviderProfile({ className = "" }) {
  const [activeTab, setActiveTab] = useState("preview");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const { toast } = useToast();

  // Sample profile data
  const [profile, setProfile] = useState({
    name: "Alexandra Peters",
    title: "Marketing Specialist",
    location: "San Francisco, CA",
    connections: 500,
    backgroundInfo: "Experienced marketing professional with a passion for building impactful digital strategies and growing brand presence.",
    skills: ["Digital Marketing", "Content Strategy", "SEO/SEM", "Social Media", "Brand Development"],
    experience: [
      {
        title: "Senior Marketing Manager",
        company: "TechCorp",
        duration: "Jan 2020 - Present",
        description: "Led a team of 10 to develop and execute marketing campaigns, increasing brand engagement by 40%."
      },
      {
        title: "Marketing Coordinator",
        company: "GrowEasy",
        duration: "Jun 2017 - Dec 2019",
        description: "Managed social media channels and content creation, boosting follower growth by 25%."
      }
    ],
    education: [
      {
        degree: "MBA, Marketing",
        school: "UC Berkeley",
        year: "2017"
      },
      {
        degree: "BBA, Business Administration",
        school: "Stanford University",
        year: "2015"
      }
    ]
  });

  const handleBackgroundSelect = (backgroundUrl) => {
    setBackgroundImage(backgroundUrl);
    setIsGeneratorOpen(false);
    toast({
      title: "Background Updated",
      description: "Your profile background image has been successfully updated!",
    });
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Card className="bg-white/95 backdrop-blur-lg border-2 border-white/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Provider Profile
          </CardTitle>
          <CardDescription>
            Preview and customize how your LinkedIn profile appears to renters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="preview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview">Profile Preview</TabsTrigger>
              <TabsTrigger value="customize">Customize</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="space-y-4 pt-4">
              {/* Profile Preview */}
              <div className="border rounded-lg overflow-hidden">
                {/* Header/Cover Image */}
                <div className="relative h-40">
                  <div
                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600"
                    style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white"
                    onClick={() => setIsGeneratorOpen(true)}
                  >
                    <Image className="h-4 w-4 mr-1" />
                    Customize Background
                  </Button>
                </div>
                {/* Profile Avatar */}
                <div className="absolute -bottom-12 left-6">
                  <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Profile Content */}
                <div className="mt-14 px-6 pb-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-xl font-bold">{profile.name}</h2>
                      <p className="text-gray-600">{profile.title}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {profile.location}
                        </span>
                        <span className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {profile.connections} connections
                        </span>
                        <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                          Verified Profile
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                      <Button variant="outline" size="sm">Message</Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                      >
                        Connect
                      </Button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="font-semibold text-lg">About</h3>
                    <p className="mt-2 text-gray-700">{profile.backgroundInfo}</p>
                  </div>
                  <div className="mt-6">
                    <h3 className="font-semibold text-lg">Skills</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profile.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-600">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="font-semibold text-lg flex items-center">
                      <Briefcase className="h-4 w-4 mr-2 text-blue-600" />
                      Experience
                    </h3>
                    <div className="space-y-4 mt-3">
                      {profile.experience.map((exp, index) => (
                        <div key={index} className="border-l-2 border-blue-200 pl-4">
                          <h4 className="font-medium">{exp.title}</h4>
                          <p className="text-sm text-gray-600">{exp.company}</p>
                          <p className="text-sm text-gray-500 flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {exp.duration}
                          </p>
                          <p className="text-sm mt-1">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="font-semibold text-lg flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                      Education
                    </h3>
                    <div className="space-y-4 mt-3">
                      {profile.education.map((edu, index) => (
                        <div key={index} className="border-l-2 border-blue-200 pl-4">
                          <h4 className="font-medium">{edu.degree}</h4>
                          <p className="text-sm text-gray-600">{edu.school}</p>
                          <p className="text-sm text-gray-500 flex items-center mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            {edu.year}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="customize" className="space-y-6 pt-4">
              {/* Profile Customization */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Professional Title</Label>
                    <Input
                      id="title"
                      value={profile.title}
                      onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="connections">Connections</Label>
                    <Input
                      id="connections"
                      type="number"
                      value={profile.connections}
                      onChange={(e) => setProfile({ ...profile, connections: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="background">About Section</Label>
                  <Textarea
                    id="background"
                    value={profile.backgroundInfo}
                    onChange={(e) => setProfile({ ...profile, backgroundInfo: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="pt-4">
                  <Button
                    onClick={() => setIsGeneratorOpen(true)}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Background Image
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <Dialog open={isGeneratorOpen} onOpenChange={setIsGeneratorOpen}>
        <DialogTrigger asChild>
          <Button className="hidden">Open Generator</Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Profile Background Generator</DialogTitle>
          </DialogHeader>
          <ProfileBackgroundGenerator onSelectBackground={handleBackgroundSelect} />
        </DialogContent>
      </Dialog>
    </div>
  );
}