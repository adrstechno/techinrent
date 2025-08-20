import { Router, Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Suspense, lazy } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import PerformanceOptimizer, {
  CriticalCSS,
} from "./components/layout/PerformanceOptimizer";
import PageLoader from "@/components/layout/LoadingSpinner";
import { ProtectedRoute } from "@/lib/protected-route";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Lazy load components
const Welcome = lazy(() => import("@/components/layout/OptimizedWelcome"));
const Home = lazy(() => import("@/pages/home/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Admin = lazy(() => import("@/pages/admin/Admin"));
const SecureFormAdmin = lazy(() => import("@/pages/secure/SecureFormAdmin"));
const ProviderDashboard = lazy(() => import("@/pages/home/ProviderDashboard"));
const Terms = lazy(() => import("@/pages/secure/Terms"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const SecureForm = lazy(() => import("@/pages/secure/SecureForm"));
const AccountDetailPage = lazy(() => import("@/pages/home/AccountDetailPage"));
const NotFound = lazy(() => import("@/pages/not-found"));
const LinkedInRentingService = lazy(() =>
  import("@/pages/connections/LinkedInRentingService")
);
const EarnMoneyLinkedIn = lazy(() =>
  import("@/pages/connections/EarnMoneyLinkedIn")
);
const BuyLinkedInOnRent = lazy(() =>
  import("@/pages/connections/BuyLinkedInOnRent")
);
const LinkedInMarketplace = lazy(() =>
  import("@/pages/connections/LinkedInMarketplace")
);
const SocialMediaAccountRental = lazy(() =>
  import("@/pages/connections/SocialMediaAccountRental")
);
const Services = lazy(() => import("@/pages/secure/Services_backup"));
const ServerError = lazy(() => import("@/pages/secure/ServerError"));
const BuyConnectionsPage = lazy(() =>
  import("@/pages/connections/buy-connections")
);
const SelectPackage = lazy(() => import("@/pages/connections/select-package"));
const OrderSummary = lazy(() => import("@/pages/order/order-summary"));
const OrderConnections = lazy(() => import("@/pages/order/order-connections"));
const OrderSuccess = lazy(() => import("@/pages/order/OrderSuccess"));
const Testimonials = lazy(() => import("@/components/Testimonials"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      retry: 1,
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
                    <ProtectedRoute
                      path="/admin/secure-forms"
                      component={SecureFormAdmin}
                    />
                    <ProtectedRoute
                      path="/provider-dashboard"
                      component={ProviderDashboard}
                    />
                    <Route path="/terms" component={Terms} />
                    <Route path="/privacy" component={Privacy} />
                    <Route
                      path="/secure-form/:accessUrl"
                      component={SecureForm}
                    />
                    <Route path="/account/:id" component={AccountDetailPage} />
                    <Route
                      path="/linkedin-renting-service"
                      component={LinkedInRentingService}
                    />
                    <Route
                      path="/earn-money-linkedin"
                      component={EarnMoneyLinkedIn}
                    />
                    <Route
                      path="/buy-linkedin-on-rent"
                      component={BuyLinkedInOnRent}
                    />
                    <Route
                      path="/linkedin-marketplace"
                      component={LinkedInMarketplace}
                    />
                    <Route
                      path="/social-media-account-rental"
                      component={SocialMediaAccountRental}
                    />
                    <Route path="/services" component={Services} />
                    <Route
                      path="/buy-connections"
                      component={BuyConnectionsPage}
                    />
                    <Route path="/select-package" component={SelectPackage} />
                    <Route path="/order-summary" component={OrderSummary} />
                    <Route
                      path="/order-connections"
                      component={OrderConnections}
                    />
                    <Route path="/order-success" component={OrderSuccess} />
                    <Route path="/testimonials" component={Testimonials} />
                    <Route path="/500" component={ServerError} />
                    <Route component={NotFound} />
                  </Switch>
                </Router>
              </Suspense>
            </div>
            <ToastContainer />
          </PerformanceOptimizer>
        </ErrorBoundary>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
