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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Download,
  Image
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Background patterns
const backgroundPatterns = [
  {
    id: "tech-circles",
    name: "Tech Circles",
    industry: "Technology"
  },
  {
    id: "business-grid",
    name: "Business Grid",
    industry: "Business"
  },
  {
    id: "minimal-dots",
    name: "Minimal Dots",
    industry: "General"
  }
];

// Color themes
const colorThemes = [
  {
    id: "blue",
    name: "Professional Blue",
    primaryColor: "#0077B5",
    secondaryColor: "#004182"
  },
  {
    id: "purple",
    name: "Creative Purple",
    primaryColor: "#7C3AED",
    secondaryColor: "#5B21B6"
  },
  {
    id: "green",
    name: "Growth Green",
    primaryColor: "#10B981",
    secondaryColor: "#047857"
  }
];

// Industry options
const industryOptions = [
  { id: "all", label: "All Industries" },
  { id: "technology", label: "Technology" },
  { id: "business", label: "Business" },
  { id: "creative", label: "Creative" }
];

export default function ProfileBackgroundGenerator() {
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedTheme, setSelectedTheme] = useState(colorThemes[0].id);
  const [selectedBackground, setSelectedBackground] = useState("");
  const [previewName] = useState("John Smith");
  const [previewTitle] = useState("Software Engineer");
  const { toast } = useToast();

  const filteredPatterns = selectedIndustry === "all"
    ? backgroundPatterns
    : backgroundPatterns.filter(pattern =>
        pattern.industry.toLowerCase() === selectedIndustry || pattern.industry === "General"
      );

  const selectedThemeData = colorThemes.find(theme => theme.id === selectedTheme);

  const generateBackground = () => {
    if (!selectedBackground) {
      toast({
        title: "Please select a background pattern",
        variant: "destructive"
      });
      return;
    }

    // Create canvas and generate image
    const canvas = document.createElement('canvas');
    canvas.width = 1584;
    canvas.height = 396;
    const ctx = canvas.getContext('2d');

    // Apply gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, selectedThemeData.primaryColor);
    gradient.addColorStop(1, selectedThemeData.secondaryColor);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add pattern overlay
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Download the image
    const link = document.createElement('a');
    link.download = 'linkedin-background.png';
    link.href = canvas.toDataURL();
    link.click();

    toast({
      title: "Background generated!",
      description: "Your LinkedIn background has been downloaded."
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          LinkedIn Background Generator
        </h1>
        <p className="text-lg text-gray-600">
          Create professional LinkedIn backgrounds that match your industry and personal brand
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5" />
              Customize Your Background
            </CardTitle>
            <CardDescription>
              Select your industry, theme, and pattern to create the perfect LinkedIn background
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Industry Selection */}
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  {industryOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}