import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

import Home from "@/pages/Home";

const Experiences = lazy(() => import("@/pages/Experiences"));
const Chef = lazy(() => import("@/pages/Chef"));
const Gallery = lazy(() => import("@/pages/Gallery"));
const Testimonials = lazy(() => import("@/pages/Testimonials"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Contact = lazy(() => import("@/pages/Contact"));

const PrivateChefMarrakech = lazy(() => import("@/pages/SEO/PrivateChefMarrakech"));
const RomanticDinnerMarrakech = lazy(() => import("@/pages/SEO/RomanticDinnerMarrakech"));
const VillaChefMarrakech = lazy(() => import("@/pages/SEO/VillaChefMarrakech"));
const MoroccanCookingExperience = lazy(() => import("@/pages/SEO/MoroccanCookingExperience"));

const NotFound = lazy(() => import("@/pages/not-found"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function RouteFallback() {
  return <div className="min-h-screen" aria-busy="true" />;
}

function Router() {
  return (
    <div className="relative flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<RouteFallback />}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/experiences" component={Experiences} />
            <Route path="/chef" component={Chef} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/testimonials" component={Testimonials} />
            <Route path="/faq" component={FAQ} />
            <Route path="/contact" component={Contact} />

            <Route path="/private-chef-marrakech" component={PrivateChefMarrakech} />
            <Route path="/romantic-dinner-marrakech" component={RomanticDinnerMarrakech} />
            <Route path="/villa-chef-marrakech" component={VillaChefMarrakech} />
            <Route path="/moroccan-cooking-experience" component={MoroccanCookingExperience} />

            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
