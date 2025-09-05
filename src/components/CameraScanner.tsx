import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, X, RotateCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CameraScannerProps {
  onScanComplete: (result: string) => void;
  onClose: () => void;
}

export function CameraScanner({ onScanComplete, onClose }: CameraScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const captureAndAnalyze = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsScanning(true);
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    
    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      
      // Simulate barcode detection (in real app, use a barcode scanning library)
      setTimeout(() => {
        const mockBarcode = `${Math.random().toString().substr(2, 12)}`;
        onScanComplete(mockBarcode);
        setIsScanning(false);
        stopCamera();
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="flex justify-between items-center p-4 bg-black/80">
        <h2 className="text-white text-lg font-semibold">Scan Product</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
          <X className="w-6 h-6" />
        </Button>
      </div>
      
      <div className="flex-1 relative">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted
        />
        
        {/* Scanning overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-64 h-40 border-2 border-scanner-primary rounded-lg">
              <div className="absolute -top-2 -left-2 w-6 h-6 border-l-4 border-t-4 border-scanner-primary rounded-tl-lg"></div>
              <div className="absolute -top-2 -right-2 w-6 h-6 border-r-4 border-t-4 border-scanner-primary rounded-tr-lg"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-4 border-b-4 border-scanner-primary rounded-bl-lg"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-4 border-b-4 border-scanner-primary rounded-br-lg"></div>
              
              {isScanning && (
                <div className="absolute inset-0 bg-scanner-primary/20 flex items-center justify-center rounded-lg">
                  <RotateCw className="w-8 h-8 text-scanner-primary animate-spin" />
                </div>
              )}
            </div>
            <p className="text-white text-center mt-4">Position barcode within the frame</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-black/80">
        <Button 
          onClick={captureAndAnalyze}
          disabled={isScanning}
          className="w-full bg-scanner-primary hover:bg-scanner-primary/90 text-white"
          size="lg"
        >
          {isScanning ? (
            <>
              <RotateCw className="w-5 h-5 mr-2 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Camera className="w-5 h-5 mr-2" />
              Capture & Analyze
            </>
          )}
        </Button>
      </div>
      
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}