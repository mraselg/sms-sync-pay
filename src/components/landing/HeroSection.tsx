import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8 text-sm text-primary-foreground/90"
          >
            <Zap className="w-4 h-4" />
            <span>Automated Payment Verification for Bangladesh</span>
          </motion.div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-primary-foreground leading-tight mb-6">
            Automated{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-accent to-warning bg-clip-text text-transparent">
                bKash, Nagad & Rocket
              </span>
            </span>{" "}
            Payment Gateway
          </h1>

          <p className="text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Accept Send Money payments automatically on your WordPress, PHP, or HTML site.
            SMS-based verification with zero manual work.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-primary-foreground text-secondary hover:bg-primary-foreground/90 font-display font-semibold px-8 py-6 text-lg rounded-xl shadow-lg">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/docs">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-display px-8 py-6 text-lg rounded-xl">
                View Documentation
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 flex flex-wrap justify-center gap-8 text-primary-foreground/60 text-sm"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>HMAC Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Real-time Verification</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>WordPress Compatible</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
