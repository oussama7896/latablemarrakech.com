import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";

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
const PrivateChefCostMarrakech = lazy(() => import("@/pages/SEO/PrivateChefCostMarrakech"));
const CookingClassVsPrivateChef = lazy(() => import("@/pages/SEO/CookingClassVsPrivateChef"));
const MarrakechVillaWithPrivateChef = lazy(() => import("@/pages/SEO/MarrakechVillaWithPrivateChef"));
const RomanticDinnerMarrakech = lazy(() => import("@/pages/SEO/RomanticDinnerMarrakech"));
const VillaChefMarrakech = lazy(() => import("@/pages/SEO/VillaChefMarrakech"));
const MoroccanCookingExperience = lazy(() => import("@/pages/SEO/MoroccanCookingExperience"));

const NotFound = lazy(() => import("@/pages/not-found"));

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
            <Route path="/pricing" component={PrivateChefCostMarrakech} />
            <Route path="/private-chef-cost-marrakech" component={PrivateChefCostMarrakech} />
            <Route path="/marrakech-cooking-class-vs-private-chef" component={CookingClassVsPrivateChef} />
            <Route path="/marrakech-villa-with-private-chef" component={MarrakechVillaWithPrivateChef} />
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
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}

export default App;
