import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { Camera, Search, Shield, Zap, Sparkles } from 'lucide-react';
import { CameraScanner } from '@/components/CameraScanner';
import { NutritionAnalysis } from '@/components/NutritionAnalysis';
import { ScanHistory } from '@/components/ScanHistory';

interface ScanResult {
  id: string;
  barcode: string;
  productName: string;
  timestamp: Date;
  nutritionScore: 'A' | 'B' | 'C' | 'D' | 'E';
  allergens: string[];
  recommendation: 'healthy' | 'moderate' | 'avoid';
}

// Mock data for demonstration
const mockNutritionData = {
  productName: "Organic Whole Grain Cereal",
  barcode: "1234567890123",
  nutritionScore: 'A' as const,
  calories: 350,
  macros: {
    carbs: 65,
    protein: 12,
    fat: 6,
    fiber: 8
  },
  allergens: ["Gluten", "May contain nuts"],
  additives: ["Natural flavoring", "Vitamin D"],
  recommendation: {
    status: 'healthy' as const,
    reason: "High in fiber and protein, low in saturated fat. Great choice for breakfast!"
  },
  healthBenefits: [
    "Rich in whole grains for digestive health",
    "High protein content supports muscle maintenance",
    "Fortified with essential vitamins and minerals"
  ],
  concerns: []
};

const mockScanHistory: ScanResult[] = [
  {
    id: "1",
    barcode: "1234567890123",
    productName: "Organic Whole Grain Cereal",
    timestamp: new Date(Date.now() - 86400000),
    nutritionScore: 'A',
    allergens: ["Gluten"],
    recommendation: 'healthy'
  },
  {
    id: "2", 
    barcode: "9876543210987",
    productName: "Sugar-Free Energy Drink",
    timestamp: new Date(Date.now() - 172800000),
    nutritionScore: 'C',
    allergens: [],
    recommendation: 'moderate'
  }
];

const Index = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [scanHistory, setScanHistory] = useState<ScanResult[]>(mockScanHistory);
  const [barcode, setBarcode] = useState('');

  const handleScanComplete = (result: string) => {
    // Add to history
    const newScan: ScanResult = {
      id: Date.now().toString(),
      barcode: result,
      productName: "Scanned Product #" + result.slice(-4),
      timestamp: new Date(),
      nutritionScore: 'B',
      allergens: [],
      recommendation: 'moderate'
    };
    setScanHistory(prev => [newScan, ...prev]);
    
    // Show analysis
    setShowAnalysis(true);
  };

  const handleManualSearch = () => {
    if (barcode.trim()) {
      handleScanComplete(barcode);
      setBarcode('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-3 mt-6 space-y-6">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-scanner-primary rounded-full flex items-center justify-center">
              <Camera className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-2">🥗 NutriScan AI</h1>
            <p className="text-lg text-muted-foreground mb-1">Advanced nutrition analysis & allergen detection</p>
            <p className="text-sm text-muted-foreground">
              🚀 Advanced barcode scanning with instant AI nutrition analysis, allergen detection, and personalized health insights
            </p>
          </div>

          {/* Main Scanner Card */}
          <Card className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-scanner-secondary rounded-full flex items-center justify-center">
              <Camera className="w-8 h-8 text-scanner-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">🥗 NutriScan AI</h2>
            <p className="text-muted-foreground mb-6">Advanced nutrition analysis & allergen detection</p>
            
            <Button 
              onClick={() => setShowCamera(true)}
              className="w-full bg-scanner-primary hover:bg-scanner-primary/90 text-white mb-4"
              size="lg"
            >
              <Camera className="w-5 h-5 mr-2" />
              🚀 Start Camera Scanner
            </Button>
            
            <p className="text-sm text-muted-foreground mb-4">Or</p>
            
            <div className="flex gap-2">
              <Input
                placeholder="Enter barcode manually"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleManualSearch()}
              />
              <Button variant="outline" onClick={handleManualSearch}>
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-scanner-secondary rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-scanner-primary" />
              </div>
              <h3 className="font-semibold mb-2">🤖 AI Analysis</h3>
              <p className="text-sm text-muted-foreground">Advanced machine learning for precise nutrition insights</p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-scanner-secondary rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-scanner-primary" />
              </div>
              <h3 className="font-semibold mb-2">⚡ Instant Results</h3>
              <p className="text-sm text-muted-foreground">Real-time scanning with comprehensive health recommendations</p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-scanner-secondary rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-scanner-primary" />
              </div>
              <h3 className="font-semibold mb-2">🛡️ Safety First</h3>
              <p className="text-sm text-muted-foreground">Automatic allergen detection with safety recommendations</p>
            </Card>
          </div>

          {/* Scan History */}
          <ScanHistory scans={scanHistory} />
          
          {/* Hackathon Badge */}
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">🚀 Hackathon Edition - All Features Unlocked</p>
          </div>
        </div>
      </div>

      {/* Camera Scanner Modal */}
      {showCamera && (
        <CameraScanner
          onScanComplete={handleScanComplete}
          onClose={() => setShowCamera(false)}
        />
      )}

      {/* Nutrition Analysis Modal */}
      {showAnalysis && (
        <NutritionAnalysis
          data={mockNutritionData}
          onClose={() => setShowAnalysis(false)}
        />
      )}
    </div>
  );
};

export default Index;
