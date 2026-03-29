import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Send, Loader2, CheckCircle, XCircle, AlertCircle, Smartphone, Wallet, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type PaymentMethod = "bkash" | "nagad" | "rocket";
type PopupType = "verification" | "processing" | "success" | "error" | "already-paid" | null;

interface PaymentConfig {
  amount: number;
  orderId?: string;
  method?: PaymentMethod;
  numbers: Record<PaymentMethod, string>;
}

const methodConfig = {
  bkash: { label: "বিকাশ", icon: Smartphone, color: "bg-bkash", appName: "বিকাশ" },
  nagad: { label: "নগদ", icon: Wallet, color: "bg-nagad", appName: "নগদ" },
  rocket: { label: "রকেট", icon: Rocket, color: "bg-rocket", appName: "রকেট" },
};

const PaymentWidget = ({ config }: { config?: Partial<PaymentConfig> }) => {
  const defaultConfig: PaymentConfig = {
    amount: config?.amount || 100,
    orderId: config?.orderId || "",
    method: config?.method,
    numbers: config?.numbers || { bkash: "01XXXXXXXXX", nagad: "01XXXXXXXXX", rocket: "01XXXXXXXXX" },
  };

  const [activeTab, setActiveTab] = useState<PaymentMethod>(defaultConfig.method || "bkash");
  const [transactionId, setTransactionId] = useState("");
  const [popup, setPopup] = useState<PopupType>(null);
  const [copied, setCopied] = useState(false);

  const copyNumber = (number: string) => {
    navigator.clipboard.writeText(number);
    setCopied(true);
    toast.success("নাম্বার কপি হয়েছে!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = () => {
    if (!transactionId.trim()) {
      toast.error("দয়া করে ট্রানজেকশন আইডি লিখুন");
      return;
    }
    setPopup("verification");
  };

  const confirmPayment = async () => {
    setPopup("processing");
    // Simulate API call
    setTimeout(() => {
      setPopup("success");
    }, 2500);
  };

  const availableMethods = defaultConfig.method
    ? [defaultConfig.method]
    : (["bkash", "nagad", "rocket"] as PaymentMethod[]);

  return (
    <div className="w-full max-w-md mx-auto bg-card rounded-2xl shadow-lg overflow-hidden border border-border">
      {/* Header */}
      <div className="gradient-primary p-6 text-center text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_70%)]" />
        <div className="relative z-10">
          <div className="w-14 h-14 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="font-display font-bold text-lg">PV</span>
          </div>
          <h2 className="font-display text-xl font-bold mb-1">পেমেন্ট ভেরিফিকেশন</h2>
          <p className="text-sm opacity-80">Send Money করে পেমেন্ট সম্পন্ন করুন</p>

          {defaultConfig.orderId && (
            <div className="mt-3 bg-primary-foreground/15 rounded-lg px-4 py-2 text-sm">
              অর্ডার আইডি: <strong>{defaultConfig.orderId}</strong>
            </div>
          )}
        </div>
      </div>

      {/* Amount Card */}
      <div className="bg-card -mt-4 mx-5 rounded-xl p-4 text-center shadow-md border border-border relative z-10">
        <p className="text-sm text-muted-foreground mb-1">মোট পেমেন্ট</p>
        <p className="font-display text-3xl font-bold text-primary">{defaultConfig.amount}৳</p>
      </div>

      {/* Method Tabs */}
      <div className="flex bg-muted mx-0 border-b border-border">
        {availableMethods.map((method) => {
          const cfg = methodConfig[method];
          return (
            <button
              key={method}
              onClick={() => setActiveTab(method)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-sm font-semibold transition-all relative ${
                activeTab === method ? "text-foreground bg-card" : "text-muted-foreground"
              }`}
            >
              <cfg.icon className="w-5 h-5" />
              <span>{cfg.label}</span>
              {activeTab === method && (
                <motion.div
                  layoutId="tab-indicator"
                  className={`absolute bottom-0 left-0 right-0 h-[3px] ${cfg.color}`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="p-5"
        >
          <div className="bg-muted rounded-xl p-5 text-center mb-5 border-l-4 border-primary">
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">
              {methodConfig[activeTab].label} পেমেন্ট
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              নিচের নাম্বারে <strong className="text-foreground">{defaultConfig.amount}৳</strong> সেন্ড মানি করুন
            </p>
            <div className="flex items-center justify-between bg-card rounded-lg p-3 border border-dashed border-primary">
              <span className="font-display text-lg font-bold text-foreground tracking-wide">
                {defaultConfig.numbers[activeTab]}
              </span>
              <Button
                size="sm"
                onClick={() => copyNumber(defaultConfig.numbers[activeTab])}
                className="gradient-primary text-primary-foreground"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span className="ml-1 text-xs">{copied ? "কপি হয়েছে" : "কপি"}</span>
              </Button>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4 mb-5 border-l-4 border-blue-400">
            <h4 className="font-semibold text-sm text-foreground mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-blue-500" />
              পেমেন্ট করার নিয়ম
            </h4>
            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
              <li>{methodConfig[activeTab].appName} অ্যাপে "Send Money" নির্বাচন করুন</li>
              <li>উপরের নাম্বারে {defaultConfig.amount}৳ সেন্ড মানি করুন</li>
              <li>ট্রানজেকশন আইডি কপি করে নিচে লিখুন</li>
              <li>সাবমিট বাটনে ক্লিক করুন</li>
            </ol>
          </div>

          {/* Transaction ID Input */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-foreground mb-2">
              ট্রানজেকশন আইডি
            </label>
            <Input
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="যেমন: 8A1B2C3D4E"
              className="h-12 text-base rounded-xl"
            />
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full h-12 gradient-primary text-primary-foreground font-display font-semibold text-base rounded-xl"
          >
            <Send className="w-5 h-5 mr-2" />
            পেমেন্ট সাবমিট করুন
          </Button>
        </motion.div>
      </AnimatePresence>

      {/* Popups */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl shadow-xl max-w-sm w-full overflow-hidden"
            >
              {popup === "verification" && (
                <>
                  <div className="gradient-primary p-5 text-center text-primary-foreground">
                    <CheckCircle className="w-10 h-10 mx-auto mb-2" />
                    <h3 className="font-display text-lg font-bold">পেমেন্ট যাচাই করুন</h3>
                  </div>
                  <div className="p-6 text-center">
                    <p className="text-muted-foreground mb-6">
                      আপনি কি নিশ্চিত যে আপনি <strong className="text-foreground">{defaultConfig.amount}৳</strong> পেমেন্ট সম্পন্ন করেছেন?
                    </p>
                    <div className="flex gap-3">
                      <Button onClick={confirmPayment} className="flex-1 bg-success text-primary-foreground hover:bg-success/90">
                        <Check className="w-4 h-4 mr-1" /> হ্যাঁ, নিশ্চিত
                      </Button>
                      <Button onClick={() => setPopup(null)} variant="outline" className="flex-1">
                        পরিবর্তন করব
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {popup === "processing" && (
                <>
                  <div className="gradient-primary p-5 text-center text-primary-foreground">
                    <Loader2 className="w-10 h-10 mx-auto mb-2 animate-spin" />
                    <h3 className="font-display text-lg font-bold">পেমেন্ট প্রসেসিং</h3>
                  </div>
                  <div className="p-10 text-center">
                    <Loader2 className="w-12 h-12 mx-auto mb-4 text-primary animate-spin" />
                    <h4 className="font-semibold text-foreground mb-2">আপনার পেমেন্টটি প্রসেসিং হচ্ছে</h4>
                    <p className="text-sm text-muted-foreground">কয়েক সেকেন্ড অপেক্ষা করুন...</p>
                  </div>
                </>
              )}

              {popup === "success" && (
                <>
                  <div className="bg-success p-5 text-center text-primary-foreground">
                    <CheckCircle className="w-10 h-10 mx-auto mb-2" />
                    <h3 className="font-display text-lg font-bold">পেমেন্ট সফল!</h3>
                  </div>
                  <div className="p-6 text-center">
                    <p className="text-muted-foreground mb-4">আপনার পেমেন্ট সফলভাবে যাচাই হয়েছে।</p>
                    <div className="bg-muted rounded-xl p-4 text-left text-sm space-y-2 mb-6">
                      <div className="flex justify-between">
                        <span className="font-semibold text-foreground">গেটওয়ে:</span>
                        <span className="text-muted-foreground">{methodConfig[activeTab].label}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-foreground">অ্যামাউন্ট:</span>
                        <span className="text-muted-foreground">{defaultConfig.amount}৳</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-foreground">স্ট্যাটাস:</span>
                        <span className="text-success font-bold">Paid</span>
                      </div>
                    </div>
                    <Button onClick={() => setPopup(null)} className="w-full bg-success text-primary-foreground hover:bg-success/90">
                      ঠিক আছে
                    </Button>
                  </div>
                </>
              )}

              {popup === "error" && (
                <>
                  <div className="bg-destructive p-5 text-center text-destructive-foreground">
                    <XCircle className="w-10 h-10 mx-auto mb-2" />
                    <h3 className="font-display text-lg font-bold">পেমেন্ট যাচাই হয়নি</h3>
                  </div>
                  <div className="p-6 text-center">
                    <p className="text-muted-foreground mb-6">ট্রানজেকশন আইডি সঠিক নয়। আবার চেষ্টা করুন।</p>
                    <Button onClick={() => setPopup(null)} variant="outline" className="w-full">
                      ঠিক আছে
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentWidget;
