import { useEffect, useMemo, useRef, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPhoneNumber, type ConfirmationResult } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const emailSchema = z.object({
  email: z.string().email("请输入正确的邮箱地址"),
  password: z.string().min(6, "密码至少 6 位"),
});

const phoneSchema = z.object({
  phone: z.string().min(8, "请输入正确的手机号").startsWith("+", "请包含国际区号，如 +86"),
  code: z.string().optional(),
});

export default function AuthPage() {
  const navigate = useNavigate();

  // Email form
  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "", password: "" },
  });

  // Phone form
  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "+86", code: "" },
  });

  const [sending, setSending] = useState<boolean>(false);
  const [confirming, setConfirming] = useState<boolean>(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const recaptchaContainerId = useMemo(() => `recaptcha-container-${Math.random().toString(36).slice(2)}`, []);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => {
    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
    };
  }, []);

  const ensureRecaptcha = () => {
    if (!recaptchaVerifierRef.current) {
      if (!auth) throw new Error("Firebase 未配置");
      recaptchaVerifierRef.current = new RecaptchaVerifier(auth, recaptchaContainerId, {
        size: "invisible",
      });
    }
    return recaptchaVerifierRef.current;
  };

  const onEmailRegister = async (values: z.infer<typeof emailSchema>) => {
    if (!auth) throw new Error("Firebase 未配置");
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    navigate("/", { replace: true });
  };

  const onEmailLogin = async (values: z.infer<typeof emailSchema>) => {
    if (!auth) throw new Error("Firebase 未配置");
    await signInWithEmailAndPassword(auth, values.email, values.password);
    navigate("/", { replace: true });
  };

  const onSendCode = async (values: z.infer<typeof phoneSchema>) => {
    setSending(true);
    try {
      if (!auth) throw new Error("Firebase 未配置");
      const verifier = ensureRecaptcha();
      const result = await signInWithPhoneNumber(auth, values.phone, verifier);
      setConfirmationResult(result);
    } finally {
      setSending(false);
    }
  };

  const onConfirmCode = async (values: z.infer<typeof phoneSchema>) => {
    if (!auth || !confirmationResult || !values.code) return;
    setConfirming(true);
    try {
      await confirmationResult.confirm(values.code);
      navigate("/", { replace: true });
    } finally {
      setConfirming(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold text-center">登录 / 注册</h1>
        {!auth && (
          <div className="text-sm text-destructive text-center">未检测到 Firebase 配置，请在项目根目录创建 `.env.local` 并填入 `env.example` 的变量。</div>
        )}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            localStorage.setItem("auth:bypass", "1");
            toast.success("已启用访客模式");
            navigate("/", { replace: true });
          }}
        >
          访客进入（跳过登录）
        </Button>
        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email">邮箱</TabsTrigger>
            <TabsTrigger value="phone">手机号</TabsTrigger>
          </TabsList>
          <TabsContent value="email" className="space-y-4">
            <Form {...emailForm}>
              <form className="space-y-4" onSubmit={emailForm.handleSubmit(onEmailLogin)}>
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>邮箱</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={emailForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>密码</FormLabel>
                      <FormControl>
                        <Input placeholder="至少 6 位" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">邮箱登录</Button>
                  <Button type="button" variant="outline" className="flex-1" onClick={emailForm.handleSubmit(onEmailRegister)}>邮箱注册</Button>
                </div>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="phone" className="space-y-4">
            <Form {...phoneForm}>
              <form className="space-y-4" onSubmit={phoneForm.handleSubmit(confirmationResult ? onConfirmCode : onSendCode)}>
                <FormField
                  control={phoneForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>手机号（含区号，如 +86）</FormLabel>
                      <FormControl>
                        <Input placeholder="+86 13800138000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {confirmationResult && (
                  <FormField
                    control={phoneForm.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>短信验证码</FormLabel>
                        <FormControl>
                          <Input inputMode="numeric" placeholder="6 位验证码" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <div className="flex gap-2">
                  {!confirmationResult ? (
                    <Button type="submit" disabled={sending} className="flex-1">{sending ? "发送中..." : "发送验证码"}</Button>
                  ) : (
                    <Button type="submit" disabled={confirming} className="flex-1">{confirming ? "验证中..." : "验证并登录/注册"}</Button>
                  )}
                </div>
                <div id={recaptchaContainerId} />
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}


