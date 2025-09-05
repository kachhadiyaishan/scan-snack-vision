import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Zap, 
  Droplets, 
  Wheat, 
  Beef, 
  Salad, 
  ShieldCheck, 
  AlertTriangle,
  Heart,
  Brain
} from 'lucide-react';

interface NutritionData {
  productName: string;
  barcode: string;
  nutritionScore: 'A' | 'B' | 'C' | 'D' | 'E';
  calories: number;
  macros: {
    carbs: number;
    protein: number;
    fat: number;
    fiber: number;
  };
  allergens: string[];
  additives: string[];
  recommendation: {
    status: 'healthy' | 'moderate' | 'avoid';
    reason: string;
  };
  healthBenefits: string[];
  concerns: string[];
}

interface NutritionAnalysisProps {
  data: NutritionData;
  onClose: () => void;
}

export function NutritionAnalysis({ data, onClose }: NutritionAnalysisProps) {
  const getScoreColor = (score: string) => {
    switch (score) {
      case 'A': return 'bg-green-500';
      case 'B': return 'bg-blue-500';
      case 'C': return 'bg-yellow-500';
      case 'D': return 'bg-orange-500';
      case 'E': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRecommendationColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-50 border-green-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'avoid': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">{data.productName}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>
          
          <p className="text-sm text-muted-foreground mb-6">Barcode: {data.barcode}</p>
          
          {/* Nutrition Score */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${getScoreColor(data.nutritionScore)}`}>
                {data.nutritionScore}
              </div>
              <div>
                <h3 className="font-semibold">Nutri-Score</h3>
                <p className="text-sm text-muted-foreground">Nutritional quality rating</p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Calories */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-orange-500" />
              <span className="font-semibold">Energy</span>
            </div>
            <p className="text-2xl font-bold">{data.calories} <span className="text-lg font-normal text-muted-foreground">kcal per 100g</span></p>
          </div>

          <Separator className="my-6" />

          {/* Macronutrients */}
          <div className="mb-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Salad className="w-5 h-5 text-green-500" />
              Macronutrients (per 100g)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm flex items-center gap-1">
                    <Wheat className="w-4 h-4" />
                    Carbs
                  </span>
                  <span className="font-semibold">{data.macros.carbs}g</span>
                </div>
                <Progress value={data.macros.carbs} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm flex items-center gap-1">
                    <Beef className="w-4 h-4" />
                    Protein
                  </span>
                  <span className="font-semibold">{data.macros.protein}g</span>
                </div>
                <Progress value={data.macros.protein} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm flex items-center gap-1">
                    <Droplets className="w-4 h-4" />
                    Fat
                  </span>
                  <span className="font-semibold">{data.macros.fat}g</span>
                </div>
                <Progress value={data.macros.fat} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Fiber</span>
                  <span className="font-semibold">{data.macros.fiber}g</span>
                </div>
                <Progress value={data.macros.fiber} className="h-2" />
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Recommendation */}
          <div className="mb-6">
            <div className={`p-4 rounded-lg border ${getRecommendationColor(data.recommendation.status)}`}>
              <div className="flex items-center gap-2 mb-2">
                {data.recommendation.status === 'healthy' ? (
                  <ShieldCheck className="w-5 h-5" />
                ) : (
                  <AlertTriangle className="w-5 h-5" />
                )}
                <span className="font-semibold capitalize">{data.recommendation.status}</span>
              </div>
              <p className="text-sm">{data.recommendation.reason}</p>
            </div>
          </div>

          {/* Health Benefits */}
          {data.healthBenefits.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-green-600">
                <Heart className="w-5 h-5" />
                Health Benefits
              </h3>
              <ul className="space-y-1">
                {data.healthBenefits.map((benefit, index) => (
                  <li key={index} className="text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Concerns */}
          {data.concerns.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                Concerns
              </h3>
              <ul className="space-y-1">
                {data.concerns.map((concern, index) => (
                  <li key={index} className="text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                    {concern}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Allergens */}
          {data.allergens.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Allergens</h3>
              <div className="flex flex-wrap gap-2">
                {data.allergens.map((allergen) => (
                  <Badge key={allergen} variant="destructive">
                    {allergen}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Additives */}
          {data.additives.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Additives</h3>
              <div className="flex flex-wrap gap-2">
                {data.additives.map((additive) => (
                  <Badge key={additive} variant="outline">
                    {additive}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}