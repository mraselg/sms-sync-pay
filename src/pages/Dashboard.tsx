import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, CreditCard, Smartphone, Key, Settings, LogOut,
  TrendingUp, CheckCircle, Clock, AlertCircle, Copy, Eye, EyeOff,
  Plus, MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: CreditCard, label: "Transactions" },
  { icon: Smartphone, label: "Payment Numbers" },
  { icon: Key, label: "API Keys" },
  { icon: Settings, label: "Settings" },
];

const mockTransactions = [
  { id: "TRX001", trxId: "8A1B2C3D4E", method: "bkash", amount: 500, sender: "01712XXXXXX", status: "verified", time: "2 min ago" },
  { id: "TRX002", trxId: "9B2C3D4E5F", method: "nagad", amount: 1200, sender: "01812XXXXXX", status: "verified", time: "15 min ago" },
  { id: "TRX003", trxId: "7C3D4E5F6G", method: "rocket", amount: 300, sender: "01612XXXXXX", status: "pending", time: "30 min ago" },
  { id: "TRX004", trxId: "6D4E5F6G7H", method: "bkash", amount: 2500, sender: "01912XXXXXX", status: "verified", time: "1 hr ago" },
  { id: "TRX005", trxId: "5E5F6G7H8I", method: "nagad", amount: 800, sender: "01512XXXXXX", status: "failed", time: "2 hr ago" },
];

const stats = [
  { label: "Total Revenue", value: "৳45,250", change: "+12.5%", icon: TrendingUp, color: "text-success" },
  { label: "Verified", value: "142", change: "+8", icon: CheckCircle, color: "text-success" },
  { label: "Pending", value: "3", change: "-2", icon: Clock, color: "text-warning" },
  { label: "Failed", value: "5", change: "+1", icon: AlertCircle, color: "text-destructive" },
];

const methodBadge: Record<string, string> = {
  bkash: "bg-bkash/10 text-bkash",
  nagad: "bg-nagad/10 text-nagad",
  rocket: "bg-rocket/10 text-rocket",
};

const statusBadge: Record<string, string> = {
  verified: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  failed: "bg-destructive/10 text-destructive",
};

const Dashboard = () => {
  const [showKey, setShowKey] = useState(false);
  const [activeSection, setActiveSection] = useState("Overview");
  const apiKey = "pk_live_aBcDeFgHiJkLmNoPqRsT";
  const secretKey = "sk_live_xYzAbCdEfGhIjKlMnOpQ";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-muted flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border p-6 hidden lg:flex flex-col">
        <Link to="/" className="flex items-center gap-2 mb-10">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-sm">PV</span>
          </div>
          <span className="font-display font-bold text-lg text-foreground">PVaaS</span>
        </Link>

        <nav className="flex-1 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveSection(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeSection === item.label
                  ? "gradient-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <button className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-destructive transition-colors">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Merchant Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back! Here's your payment overview.</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="gradient-primary text-primary-foreground">Pro Plan</Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-5 border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground font-medium">{stat.label}</span>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
              <span className={`text-xs font-medium ${stat.color}`}>{stat.change}</span>
            </motion.div>
          ))}
        </div>

        {/* API Keys Section */}
        <div className="bg-card rounded-2xl p-6 border border-border mb-8">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">API Credentials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground font-medium mb-2 block">API Key (Public)</label>
              <div className="flex items-center gap-2">
                <Input value={apiKey} readOnly className="font-mono text-sm h-10" />
                <Button size="icon" variant="outline" onClick={() => copyToClipboard(apiKey)}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-medium mb-2 block">Secret Key</label>
              <div className="flex items-center gap-2">
                <Input
                  value={showKey ? secretKey : "sk_live_••••••••••••••••"}
                  readOnly
                  className="font-mono text-sm h-10"
                />
                <Button size="icon" variant="outline" onClick={() => setShowKey(!showKey)}>
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Button size="icon" variant="outline" onClick={() => copyToClipboard(secretKey)}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="p-6 flex items-center justify-between border-b border-border">
            <h3 className="font-display text-lg font-semibold text-foreground">Recent Transactions</h3>
            <Button size="sm" variant="outline" className="text-xs">View All</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">TrxID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Method</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Sender</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Time</th>
                </tr>
              </thead>
              <tbody>
                {mockTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-mono font-medium text-foreground">{tx.trxId}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${methodBadge[tx.method]}`}>
                        {tx.method}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-foreground">৳{tx.amount}</td>
                    <td className="px-6 py-4 text-muted-foreground">{tx.sender}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusBadge[tx.status]}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{tx.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
