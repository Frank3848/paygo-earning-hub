import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import BuyPayId from "./pages/BuyPayId";
import BuyPayIdPreparing from "./pages/BuyPayIdPreparing";
import BuyPayIdPayment from "./pages/BuyPayIdPayment";
import BuyPayIdConfirming from "./pages/BuyPayIdConfirming";
import BuyPayIdFailed from "./pages/BuyPayIdFailed";
import UpgradeBenefits from "./pages/UpgradeBenefits";
import UpgradePayment from "./pages/UpgradePayment";
import UpgradeConfirming from "./pages/UpgradeConfirming";
import UpgradeFailed from "./pages/UpgradeFailed";
import Airtime from "./pages/Airtime";
import Data from "./pages/Data";
import Profile from "./pages/Profile";
import Communities from "./pages/Communities";
import Support from "./pages/Support";
import EarnMore from "./pages/EarnMore";
import Watch from "./pages/Watch";
import Transfer from "./pages/Transfer";
import TransferProcessing from "./pages/TransferProcessing";
import TransferSuccess from "./pages/TransferSuccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/buy-pay-id" element={<BuyPayId />} />
          <Route path="/buy-pay-id/preparing" element={<BuyPayIdPreparing />} />
          <Route path="/buy-pay-id/payment" element={<BuyPayIdPayment />} />
          <Route path="/buy-pay-id/confirming" element={<BuyPayIdConfirming />} />
          <Route path="/buy-pay-id/failed" element={<BuyPayIdFailed />} />
          <Route path="/upgrade/benefits" element={<UpgradeBenefits />} />
          <Route path="/upgrade/payment" element={<UpgradePayment />} />
          <Route path="/upgrade/confirming" element={<UpgradeConfirming />} />
          <Route path="/upgrade/failed" element={<UpgradeFailed />} />
          <Route path="/airtime" element={<Airtime />} />
          <Route path="/data" element={<Data />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/support" element={<Support />} />
          <Route path="/earn-more" element={<EarnMore />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/transfer/processing" element={<TransferProcessing />} />
          <Route path="/transfer/success" element={<TransferSuccess />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
