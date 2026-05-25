import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

import Home from "@/pages/Home";
const HomeFR = lazy(() => import("@/pages/HomeFR"));

const Experiences = lazy(() => import("@/pages/Experiences"));
const ExperiencesFR = lazy(() => import("@/pages/ExperiencesFR"));
const Testimonials = lazy(() => import("@/pages/Testimonials"));
const TestimonialsFR = lazy(() => import("@/pages/TestimonialsFR"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const FAQFR = lazy(() => import("@/pages/FAQFR"));
const Contact = lazy(() => import("@/pages/Contact"));
const ContactFR = lazy(() => import("@/pages/ContactFR"));

const PrivateChefMarrakech = lazy(() => import("@/pages/SEO/PrivateChefMarrakech"));
const PrivateChefMarrakechFR = lazy(() => import("@/pages/SEO/PrivateChefMarrakechFR"));
const PrivateChefCostMarrakech = lazy(() => import("@/pages/SEO/PrivateChefCostMarrakech"));
const CookingClassVsPrivateChef = lazy(() => import("@/pages/SEO/CookingClassVsPrivateChef"));
const MarrakechVillaWithPrivateChef = lazy(() => import("@/pages/SEO/MarrakechVillaWithPrivateChef"));
const RomanticDinnerMarrakech = lazy(() => import("@/pages/SEO/RomanticDinnerMarrakech"));
const VillaChefMarrakech = lazy(() => import("@/pages/SEO/VillaChefMarrakech"));
const MoroccanCookingExperience = lazy(() => import("@/pages/SEO/MoroccanCookingExperience"));
const MarrakechCookingClass = lazy(() => import("@/pages/SEO/MarrakechCookingClass"));
const MarrakechCookingClassFR = lazy(() => import("@/pages/SEO/MarrakechCookingClassFR"));

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
            <Route path="/marrakech-cooking-class" component={MarrakechCookingClass} />
            <Route path="/fr/marrakech-cooking-class" component={MarrakechCookingClassFR} />

            {/* French routes */}
            <Route path="/fr" component={HomeFR} />
            <Route path="/fr/experiences" component={ExperiencesFR} />
            <Route path="/fr/testimonials" component={TestimonialsFR} />
            <Route path="/fr/faq" component={FAQFR} />
            <Route path="/fr/contact" component={ContactFR} />
            <Route path="/fr/private-chef-marrakech" component={PrivateChefMarrakechFR} />

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
