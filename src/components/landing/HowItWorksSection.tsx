import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Sign Up & Get API Key",
    description: "Create your merchant account and get your unique API key and secret instantly.",
  },
  {
    step: "02",
    title: "Install Android App",
    description: "Download the SMS Forwarder app on your bKash/Nagad/Rocket phone. Login with your credentials.",
  },
  {
    step: "03",
    title: "Add Payment Widget",
    description: "Embed the payment widget on your site using iframe, WordPress plugin, or PHP SDK.",
  },
  {
    step: "04",
    title: "Auto-Verify Payments",
    description: "Customers send money → SMS detected → TrxID verified → Webhook fires → Order confirmed. Fully automated.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-background" id="how-it-works">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Four simple steps to start accepting automated payments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative text-center"
            >
              <div className="w-16 h-16 rounded-2xl gradient-primary mx-auto mb-6 flex items-center justify-center font-display text-2xl font-bold text-primary-foreground">
                {item.step}
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-border" />
              )}
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
