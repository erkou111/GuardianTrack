import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string | undefined,
};

const requiredKeys = [
  firebaseConfig.apiKey,
  firebaseConfig.authDomain,
  firebaseConfig.projectId,
  firebaseConfig.appId,
];

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

try {
  if (requiredKeys.every(Boolean)) {
    app = initializeApp(firebaseConfig as Record<string, string>);
    auth = getAuth(app);
    auth.useDeviceLanguage();
  } else {
    // 控制台提示未配置环境变量，但不阻断页面渲染
    // eslint-disable-next-line no-console
    console.warn("Firebase 未配置：请在 .env.local 中设置 VITE_FIREBASE_* 变量");
  }
} catch (error) {
  // eslint-disable-next-line no-console
  console.error("初始化 Firebase 失败", error);
}

export { app, auth };


