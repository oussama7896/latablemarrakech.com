import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

import Home from "@/pages/Home";
import Experiences from "@/pages/Experiences";
import Chef from "@/pages/Chef";
import Gallery from "@/pages/Gallery";
import Testimonials from "@/pages/Testimonials";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";

// SEO Pages
import PrivateChefMarrakech from "@/pages/SEO/PrivateChefMarrakech";
import RomanticDinnerMarrakech from "@/pages/SEO/RomanticDinnerMarrakech";
import VillaChefMarrakech from "@/pages/SEO/VillaChefMarrakech";
import MoroccanCookingExperience from "@/pages/SEO/MoroccanCookingExperience";

import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/experiences" component={Experiences} />
          <Route path="/chef" component={Chef} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/testimonials" component={Testimonials} />
          <Route path="/faq" component={FAQ} />
          <Route path="/contact" component={Contact} />
          <Route path="/admin" component={Admin} />
          
          <Route path="/private-chef-marrakech" component={PrivateChefMarrakech} />
          <Route path="/romantic-dinner-marrakech" component={RomanticDinnerMarrakech} />
          <Route path="/villa-chef-marrakech" component={VillaChefMarrakech} />
          <Route path="/moroccan-cooking-experience" component={MoroccanCookingExperience} />
          
          <Route component={NotFound} />
        </Switch>
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
