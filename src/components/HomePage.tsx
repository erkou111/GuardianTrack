import { useState } from "react";
import { Camera, Heart, Phone, Lock, Shield, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function HomePage() {
  const [isHealthUnlocked, setIsHealthUnlocked] = useState(false);
  const [serialNumber, setSerialNumber] = useState("");

  const handleUnlockHealth = () => {
    if (serialNumber.trim()) {
      setIsHealthUnlocked(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background pb-20 px-4 pt-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">机器人护理中心</h1>
          <p className="text-muted-foreground">实时监控与健康管理</p>
        </div>

        {/* Remote Monitoring Card */}
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-primary">
              <Camera className="h-5 w-5" />
              远程监控
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Video Monitor Area */}
            <div className="relative bg-secondary rounded-lg h-48 flex items-center justify-center">
              <div className="text-center">
                <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">监控画面</p>
                <Badge variant="outline" className="mt-2">
                  <div className="w-2 h-2 bg-success rounded-full mr-1 animate-pulse" />
                  在线
                </Badge>
              </div>
            </div>

            {/* Behavior Analysis */}
            <div className="bg-background rounded-lg p-3">
              <h4 className="text-sm font-medium text-foreground mb-2">行为分析</h4>
              <div className="space-y-1 text-xs">
                <p className="text-success">✓ 正常活动中</p>
                <p className="text-muted-foreground">• 上次活动: 2分钟前</p>
                <p className="text-muted-foreground">• 位置: 客厅</p>
              </div>
            </div>

            {/* Voice Call Button */}
            <Button 
              className="w-full bg-gradient-primary hover:scale-105 transition-transform duration-200"
              size="lg"
            >
              <Phone className="h-4 w-4 mr-2" />
              语音通话
            </Button>
          </CardContent>
        </Card>

        {/* Health Monitoring Card */}
        <Card className={cn(
          "shadow-health border-0 transition-all duration-300",
          isHealthUnlocked ? "bg-gradient-card" : "bg-muted/20"
        )}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-health">
              <Heart className="h-5 w-5" />
              身体健康监测
              {!isHealthUnlocked && <Lock className="h-4 w-4 text-muted-foreground" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!isHealthUnlocked ? (
              <div className="text-center space-y-4">
                <div className="bg-background rounded-lg p-4">
                  <Shield className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-4">
                    需购买配套手表并输入产品序列号解锁
                  </p>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="请输入产品序列号"
                      value={serialNumber}
                      onChange={(e) => setSerialNumber(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-health focus:border-transparent"
                    />
                    <Button 
                      onClick={handleUnlockHealth}
                      className="w-full bg-gradient-health"
                      disabled={!serialNumber.trim()}
                    >
                      解锁功能
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Health Data Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-background rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-health">72</div>
                    <div className="text-xs text-muted-foreground">心率 bpm</div>
                  </div>
                  <div className="bg-background rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-health">98%</div>
                    <div className="text-xs text-muted-foreground">血氧</div>
                  </div>
                  <div className="bg-background rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-health">120/80</div>
                    <div className="text-xs text-muted-foreground">血压 mmHg</div>
                  </div>
                  <div className="bg-background rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-health">16</div>
                    <div className="text-xs text-muted-foreground">呼吸/分</div>
                  </div>
                </div>

                {/* AI Analysis */}
                <div className="bg-background rounded-lg p-3">
                  <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-1">
                    <Activity className="h-4 w-4" />
                    AI健康分析
                  </h4>
                  <p className="text-xs text-success mb-2">✓ 整体健康状况良好</p>
                  <p className="text-xs text-muted-foreground">建议保持规律作息，适量运动</p>
                </div>

                {/* Reports & Doctor */}
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 text-xs">
                    查看报告
                  </Button>
                  <Button className="flex-1 bg-gradient-health text-xs">
                    咨询医生
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}