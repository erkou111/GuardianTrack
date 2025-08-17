import { Settings, User, Bot, Phone, Mail, Calendar, MapPin, Heart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-background pb-20 px-4 pt-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">个人中心</h1>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        {/* Software User Profile */}
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-primary">
              <User className="h-5 w-5" />
              软件使用者信息
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="" alt="用户头像" />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg">
                  张
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">张明</h3>
                <p className="text-sm text-muted-foreground">家属监护人</p>
                <Badge variant="outline" className="mt-1">
                  <div className="w-2 h-2 bg-success rounded-full mr-1" />
                  已认证
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>138****5678</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>zhang.m****@example.com</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>注册时间: 2024年1月15日</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Robot User Profile */}
        <Card className="bg-gradient-card shadow-health border-0">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-health">
              <Bot className="h-5 w-5" />
              机器人使用者信息
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="" alt="使用者头像" />
                <AvatarFallback className="bg-gradient-health text-health-foreground text-lg">
                  王
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">王奶奶</h3>
                <p className="text-sm text-muted-foreground">78岁 · 独居老人</p>
                <Badge variant="outline" className="mt-1 border-health text-health">
                  <Heart className="w-2 h-2 mr-1" />
                  健康监护中
                </Badge>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="bg-background rounded-lg p-3">
                <h4 className="text-sm font-medium text-foreground mb-2">基本信息</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    <span>北京市朝阳区XXX社区</span>
                  </div>
                  <div>紧急联系人: 张明 (子女)</div>
                  <div>慢性疾病: 高血压、糖尿病</div>
                </div>
              </div>
              
              <div className="bg-background rounded-lg p-3">
                <h4 className="text-sm font-medium text-foreground mb-2">设备状态</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <span>机器人在线</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <span>健康手表连接</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-warning rounded-full" />
                    <span>电量 65%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <span>网络正常</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-12 flex-col gap-1">
                <Shield className="h-4 w-4" />
                <span className="text-xs">安全设置</span>
              </Button>
              <Button variant="outline" className="h-12 flex-col gap-1">
                <Heart className="h-4 w-4" />
                <span className="text-xs">健康档案</span>
              </Button>
              <Button variant="outline" className="h-12 flex-col gap-1">
                <Phone className="h-4 w-4" />
                <span className="text-xs">紧急联系</span>
              </Button>
              <Button variant="outline" className="h-12 flex-col gap-1">
                <Settings className="h-4 w-4" />
                <span className="text-xs">系统设置</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}