import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ShieldCheck, AlertTriangle, TrendingUp } from 'lucide-react';

interface ScanResult {
  id: string;
  barcode: string;
  productName: string;
  timestamp: Date;
  nutritionScore: 'A' | 'B' | 'C' | 'D' | 'E';
  allergens: string[];
  recommendation: 'healthy' | 'moderate' | 'avoid';
}

interface ScanHistoryProps {
  scans: ScanResult[];
}

export function ScanHistory({ scans }: ScanHistoryProps) {
  if (scans.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-scanner-secondary rounded-full flex items-center justify-center">
          <TrendingUp className="w-8 h-8 text-scanner-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No Scan History</h3>
        <p className="text-muted-foreground">Start scanning products to build your history</p>
      </Card>
    );
  }

  const getScoreColor = (score: string) => {
    switch (score) {
      case 'A': return 'bg-green-100 text-green-800 border-green-200';
      case 'B': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'C': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'D': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'E': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'healthy': return <ShieldCheck className="w-4 h-4 text-green-600" />;
      case 'moderate': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'avoid': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Recent Scans</h3>
      {scans.map((scan) => (
        <Card key={scan.id} className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h4 className="font-semibold text-lg">{scan.productName}</h4>
              <p className="text-sm text-muted-foreground">Barcode: {scan.barcode}</p>
            </div>
            <div className="flex items-center gap-2">
              {getRecommendationIcon(scan.recommendation)}
              <Badge className={`${getScoreColor(scan.nutritionScore)} border`}>
                Nutri-Score {scan.nutritionScore}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{scan.timestamp.toLocaleDateString()}</span>
            </div>
            {scan.allergens.length > 0 && (
              <div className="flex gap-1">
                {scan.allergens.map((allergen) => (
                  <Badge key={allergen} variant="outline" className="text-xs">
                    {allergen}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}