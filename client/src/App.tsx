import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import ChatAssistant from "@/pages/ChatAssistant";
import RoomVisualizer from "@/pages/RoomVisualizer";
import Market from "@/pages/Market";
import Exhibition from "@/pages/Exhibition";
import ProductDetail from "@/pages/ProductDetail";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/market" component={Market} />
      <Route path="/chat" component={ChatAssistant} />
      <Route path="/exhibition" component={Exhibition} />
      <Route path="/room/:id" component={RoomVisualizer} />
      <Route path="/product/:id" component={ProductDetail} />
      {/* Fallback to Home for profile/cart for now or create them if needed, but for now 404 is okay or just map them to Home/NotFound */}
      <Route path="/profile" component={Home} /> 
      <Route path="/cart" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
