import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Users, CreditCard, Package, Settings, Shield,
  TrendingUp, UserPlus, Activity, Server, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const adminSidebar = [
  { icon: LayoutDashboard, label: "System Overview", active: true },
  { icon: Users, label: "Merchants" },
  { icon: CreditCard, label: "All Transactions" },
  { icon: Package, label: "Plans & Billing" },
  { icon: Shield, label: "Security Logs" },
  { icon: Settings, label: "System Settings" },
];

const systemStats = [
  { label: "Total Merchants", value: "1,284", change: "+45 this month", icon: Users, color: "text-primary" },
  { label: "Total Revenue", value: "৳12.5M", change: "+18.2%", icon: TrendingUp, color: "text-success" },
  { label: "Active Sessions", value: "342", change: "Real-time", icon: Activity, color: "text-accent" },
  { label: "API Uptime", value: "99.97%", change: "Last 30 days", icon: Server, color: "text-success" },
];

const recentMerchants = [
  { name: "ShopBD", email: "admin@shopbd.com", plan: "Business", status: "active", transactions: 234 },
  { name: "BDMart", email: "info@bdmart.com", plan: "Starter", status: "active", transactions: 56 },
  { name: "EasyPay Store", email: "easypay@mail.com", plan: "Business", status: "suspended", transactions: 0 },
  { name: "QuickSell", email: "hello@quicksell.bd", plan: "Enterprise", status: "active", transactions: 1205 },
  { name: "NovaTech", email: "support@novatech.bd", plan: "Starter", status: "active", transactions: 12 },
];

const planBadge: Record<string, string> = {
  Starter: "bg-muted text-muted-foreground",
  Business: "bg-primary/10 text-primary",
  Enterprise: "bg-accent/10 text-accent",
};

const statusColor: Record<string, string> = {
  active: "bg-success/10 text-success",
  suspended: "bg-destructive/10 text-destructive",
};

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState("System Overview");

  return (
    <div className="min-h-screen bg-muted flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border p-6 hidden lg:flex flex-col">
        <Link to="/" className="flex items-center gap-2 mb-2">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-sm">PV</span>
          </div>
          <span className="font-display font-bold text-lg text-foreground">PVaaS</span>
        </Link>
        <p className="text-xs text-muted-foreground mb-8 ml-11">Admin Panel</p>

        <nav className="flex-1 space-y-1">
          {adminSidebar.map((item) => (
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

        <Link to="/dashboard">
          <Button variant="outline" size="sm" className="w-full text-xs">
            Switch to Merchant View
          </Button>
        </Link>
      </aside>

      {/* Main */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">System-wide overview and management</p>
          </div>
          <Badge className="bg-destructive/10 text-destructive font-semibold">
            <Shield className="w-3 h-3 mr-1" /> Super Admin
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {systemStats.map((stat, i) => (
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
              <span className="text-xs text-muted-foreground">{stat.change}</span>
            </motion.div>
          ))}
        </div>

        {/* Recent Merchants */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="p-6 flex items-center justify-between border-b border-border">
            <h3 className="font-display text-lg font-semibold text-foreground">Recent Merchants</h3>
            <Button size="sm" className="gradient-primary text-primary-foreground text-xs">
              <UserPlus className="w-4 h-4 mr-1" /> Add Merchant
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Merchant</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Plan</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Transactions</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentMerchants.map((merchant) => (
                  <tr key={merchant.email} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-foreground">{merchant.name}</p>
                        <p className="text-xs text-muted-foreground">{merchant.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${planBadge[merchant.plan]}`}>
                        {merchant.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusColor[merchant.status]}`}>
                        {merchant.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-foreground">{merchant.transactions}</td>
                    <td className="px-6 py-4">
                      <Button size="sm" variant="ghost" className="text-xs text-muted-foreground">
                        Details <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </td>
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

export default AdminPanel;
