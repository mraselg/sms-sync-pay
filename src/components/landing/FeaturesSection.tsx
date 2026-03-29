import { motion } from "framer-motion";
import { Smartphone, ShieldCheck, Code2, Plug, Webhook, Clock } from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "SMS Auto-Verification",
    description: "Android app listens for bKash/Nagad/Rocket SMS and auto-verifies payments in real-time.",
    color: "text-bkash",
  },
  {
    icon: ShieldCheck,
    title: "Anti-Fraud Protection",
    description: "TrxID locking, HMAC signing, SMS sender verification, and rate limiting built-in.",
    color: "text-secondary",
  },
  {
    icon: Code2,
    title: "Easy Integration",
    description: "Simple REST API with PHP SDK, WordPress plugin, and embeddable iframe widget.",
    color: "text-accent",
  },
  {
    icon: Plug,
    title: "WordPress & WooCommerce",
    description: "Drop-in WooCommerce payment gateway. Install plugin, enter API key, done.",
    color: "text-success",
  },
  {
    icon: Webhook,
    title: "Webhook Notifications",
    description: "Instant POST callback to your server when a payment is verified.",
    color: "text-nagad",
  },
  {
    icon: Clock,
    title: "5-Second Verification",
    description: "From SMS received to webhook fired — average verification time under 5 seconds.",
    color: "text-rocket",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-muted/50" id="features">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything You Need for{" "}
            <span className="text-gradient">Payment Automation</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A complete payment verification ecosystem for Bangladeshi merchants.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-5`}>
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
