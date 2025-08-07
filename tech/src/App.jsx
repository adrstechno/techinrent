import { Router, Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { HelmetProvider } from "react-helmet-async";
import { Suspense, lazy } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import PerformanceOptimizer, { CriticalCSS } from "@/components/PerformanceOptimizer";
import { PageLoader } from "@/components/LoadingSpinner";
import { ProtectedRoute } from "@/lib/protected-route";
import SecureFormAdmin from "@/pages/SecureFormAdmin";

// Lazy load components
const Welcome = lazy(() => import("@/components/OptimizedWelcome"));
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Admin = lazy(() => import("@/pages/Admin"));
const ProviderDashboard = lazy(() => import("@/pages/ProviderDashboard"));
const Terms = lazy(() => import("@/pages/Terms"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const SecureForm = lazy(() => import("@/pages/SecureForm"));
const AccountDetailPage = lazy(() => import("@/pages/AccountDetailPage"));
const NotFound = lazy(() => import("@/pages/not-found"));
const LinkedInRentingService = lazy(() => import("@/pages/LinkedInRentingService"));
const EarnMoneyLinkedIn = lazy(() => import("@/pages/EarnMoneyLinkedIn"));
const BuyLinkedInOnRent = lazy(() => import("@/pages/BuyLinkedInOnRent"));
const LinkedInMarketplace = lazy(() => import("@/pages/LinkedInMarketplace"));
const SocialMediaAccountRental = lazy(() => import("@/pages/SocialMediaAccountRental"));
const Services = lazy(() => import("@/pages/Services_backup"));
const ServerError = lazy(() => import("@/pages/ServerError"));
const AdminLogin = lazy(() => import("@/pages/AdminLogin"));
const BuyConnectionsPage = lazy(() => import("@/pages/buy-connections"));
const SelectPackage = lazy(() => import("@/pages/select-package"));
const OrderSummary = lazy(() => import("@/pages/order-summary"));
const OrderConnections = lazy(() => import("@/pages/order-connections"));
const OrderSuccess = lazy(() => import("@/pages/OrderSuccess"));
import Testimonials from "./components/Testimonials";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ErrorBoundary>
          <PerformanceOptimizer>
            <CriticalCSS />
            <div className="min-h-screen bg-blue-50">
              <Suspense fallback={<PageLoader />}>
                <Router>
                  <Switch>
                    <Route path="/" component={Welcome} />
                    <Route path="/home" component={Home} />
                    <Route path="/login" component={Login} />
                    <ProtectedRoute path="/admin" component={Admin} />
                    <ProtectedRoute path="/admin/secure-forms" component={SecureFormAdmin} />
                    <ProtectedRoute path="/provider-dashboard" component={ProviderDashboard} />
                    <Route path="/terms" component={Terms} />
                    <Route path="/privacy" component={Privacy} />
                    <Route path="/secure-form/:accessUrl" component={SecureForm} />
                    <Route path="/account/:id" component={AccountDetailPage} />
                    <Route path="/linkedin-renting-service" component={LinkedInRentingService} />
                    <Route path="/earn-money-linkedin" component={EarnMoneyLinkedIn} />
                    <Route path="/buy-linkedin-on-rent" component={BuyLinkedInOnRent} />
                    <Route path="/linkedin-marketplace" component={LinkedInMarketplace} />
                    <Route path="/social-media-account-rental" component={SocialMediaAccountRental} />
                    <Route path="/services" component={Services} />
                    <Route path="/buy-connections" component={BuyConnectionsPage} />
                    <Route path="/select-package" component={SelectPackage} />
                    <Route path="/order-summary" component={OrderSummary} />
                    <Route path="/order-connections" component={OrderConnections} />
                    <Route path="/order-success" component={OrderSuccess} />
                    <Route path="/admin-login" component={AdminLogin} />
                    <Route path="/testimonials" component={Testimonials} />
                    <Route path="/500" component={ServerError} />
                    <Route component={NotFound} />
                  </Switch>
                </Router>
              </Suspense>
              <Toaster />
            </div>
          </PerformanceOptimizer>
        </ErrorBoundary>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;