import { Routes, Route, Navigate } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import SplashScreen from "@/screens/SplashScreen";
import HomeScreen from "@/screens/HomeScreen";
import SituationsScreen from "@/screens/SituationsScreen";
import RelationshipsScreen from "@/screens/RelationshipsScreen";
import RelationshipDetailScreen from "@/screens/RelationshipDetailScreen";
import ReportScreen from "@/screens/ReportScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import WelcomeScreen from "@/screens/onboarding/WelcomeScreen";
import AuthScreen from "@/screens/onboarding/AuthScreen";
import InfoScreen from "@/screens/onboarding/InfoScreen";
import CoreQuestionsScreen from "@/screens/onboarding/CoreQuestionsScreen";
import RecommendScreen from "@/screens/onboarding/RecommendScreen";
import SelectScreen from "@/screens/onboarding/SelectScreen";
import IntroScreen from "@/screens/onboarding/IntroScreen";
import { isOnboardingComplete } from "@/lib/supabase";

/**
 * EntryGate — evaluated on every route match (reactive).
 * Must be a component, NOT an inline ternary in App's element prop:
 * App is passed as a stable element to <BrowserRouter> and never re-renders,
 * so an inline isOnboardingComplete() would freeze at first mount and trap the
 * user in onboarding even after the flag is set.
 */
function EntryGate() {
  return isOnboardingComplete() ? <HomeScreen /> : <Navigate to="/splash" replace />;
}

/**
 * Navigation IA (visual reference confirmed):
 * 홈 / 상황카드 / 관계 / 리포트 / 마이
 * Recommendations folded into Home ("오늘의 추천 관계" section).
 */
export default function App() {
  return (
    <Routes>
      <Route path="/splash" element={<SplashScreen />} />

      {/* 7-step onboarding stack */}
      <Route path="/onboarding/welcome"   element={<WelcomeScreen />} />
      <Route path="/onboarding/auth"      element={<AuthScreen />} />
      <Route path="/onboarding/info"      element={<InfoScreen />} />
      <Route path="/onboarding/questions" element={<CoreQuestionsScreen />} />
      <Route path="/onboarding/recommend" element={<RecommendScreen />} />
      <Route path="/onboarding/select"    element={<SelectScreen />} />
      <Route path="/onboarding/intro"     element={<IntroScreen />} />

      {/* Main app shell — 5-tab dark nav */}
      <Route element={<AppShell />}>
        <Route path="/" element={<EntryGate />} />
        <Route path="/situations"    element={<SituationsScreen />} />
        <Route path="/relationships" element={<RelationshipsScreen />} />
        <Route path="/relationships/:id" element={<RelationshipDetailScreen />} />
        <Route path="/report"        element={<ReportScreen />} />
        <Route path="/profile"       element={<ProfileScreen />} />

        {/* Legacy alias: /questions → /situations */}
        <Route path="/questions"     element={<Navigate to="/situations" replace />} />
        {/* Legacy alias: /recommendations → / */}
        <Route path="/recommendations" element={<Navigate to="/" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
