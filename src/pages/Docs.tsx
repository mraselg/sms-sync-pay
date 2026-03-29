import { useState } from "react";
import { motion } from "framer-motion";
import { Book, Code2, Plug, Webhook, Key, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  { id: "getting-started", icon: Book, label: "Getting Started" },
  { id: "api-reference", icon: Code2, label: "API Reference" },
  { id: "integration", icon: Plug, label: "Integration Guide" },
  { id: "webhooks", icon: Webhook, label: "Webhooks" },
  { id: "authentication", icon: Key, label: "Authentication" },
];

const Docs = () => {
  const [active, setActive] = useState("getting-started");

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-72 bg-card border-r border-border p-6 hidden lg:flex flex-col">
        <Link to="/" className="flex items-center gap-2 mb-10">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-sm">PV</span>
          </div>
          <span className="font-display font-bold text-lg text-foreground">PVaaS Docs</span>
        </Link>

        <nav className="space-y-1">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                active === s.id
                  ? "gradient-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <s.icon className="w-4 h-4" />
              {s.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 lg:p-12 max-w-4xl">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {active === "getting-started" && (
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-6">Getting Started</h1>
              <p className="text-muted-foreground leading-relaxed mb-8">
                PVaaS provides automated bKash, Nagad, and Rocket payment verification via SMS.
                Follow these steps to integrate with your site.
              </p>

              <div className="space-y-6">
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">1. Create Account</h3>
                  <p className="text-muted-foreground text-sm">Sign up at the dashboard and obtain your API Key and Secret Key.</p>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">2. Install SMS Forwarder App</h3>
                  <p className="text-muted-foreground text-sm mb-4">Download the Android app and login with your merchant credentials. The app will auto-forward payment SMS to our server.</p>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">3. Embed Payment Widget</h3>
                  <p className="text-muted-foreground text-sm mb-4">Add the iframe widget to your checkout page:</p>
                  <pre className="bg-foreground text-background rounded-xl p-4 text-sm overflow-x-auto font-mono">
{`<iframe 
  src="https://your-domain.com/payment?a=500&p=bkash&orderId=ORD123"
  width="100%" 
  height="700" 
  frameBorder="0">
</iframe>`}
                  </pre>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">4. Configure Webhook</h3>
                  <p className="text-muted-foreground text-sm mb-4">Set your webhook URL in the dashboard. We'll POST verification results:</p>
                  <pre className="bg-foreground text-background rounded-xl p-4 text-sm overflow-x-auto font-mono">
{`{
  "event": "payment.verified",
  "trx_id": "8A1B2C3D4E",
  "amount": 500,
  "method": "bkash",
  "sender": "01712XXXXXX",
  "order_id": "ORD123",
  "timestamp": "2026-03-29T10:30:00Z"
}`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {active === "api-reference" && (
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-6">API Reference</h1>
              <p className="text-muted-foreground mb-8">Base URL: <code className="bg-muted px-2 py-1 rounded text-sm font-mono">https://api.pvaas.com/v1</code></p>

              <div className="space-y-6">
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-success/10 text-success text-xs font-bold px-3 py-1 rounded-full">POST</span>
                    <code className="font-mono text-sm text-foreground">/verify-transaction</code>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Manually verify a transaction ID.</p>
                  <pre className="bg-foreground text-background rounded-xl p-4 text-sm overflow-x-auto font-mono">
{`curl -X POST https://api.pvaas.com/v1/verify-transaction \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "X-Signature: HMAC_SIGNATURE" \\
  -d '{"trx_id": "8A1B2C3D4E", "method": "bkash", "amount": 500}'`}
                  </pre>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-blue-500/10 text-blue-500 text-xs font-bold px-3 py-1 rounded-full">GET</span>
                    <code className="font-mono text-sm text-foreground">/transactions</code>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">List all transactions for the authenticated merchant.</p>
                  <pre className="bg-foreground text-background rounded-xl p-4 text-sm overflow-x-auto font-mono">
{`curl https://api.pvaas.com/v1/transactions \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {active === "integration" && (
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-6">Integration Guide</h1>
              
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">WordPress / WooCommerce</h3>
                  <p className="text-sm text-muted-foreground mb-4">Install the PVaaS plugin from WordPress Plugin Directory, enter your API Key in settings, and it will auto-add as a WooCommerce payment gateway.</p>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">PHP SDK</h3>
                  <pre className="bg-foreground text-background rounded-xl p-4 text-sm overflow-x-auto font-mono">
{`composer require pvaas/php-sdk

$pvaas = new PVaaS\\Client('YOUR_API_KEY', 'YOUR_SECRET');
$result = $pvaas->verifyTransaction('8A1B2C3D4E', 'bkash', 500);

if ($result->isVerified()) {
    // Payment confirmed!
}`}
                  </pre>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">HTML Iframe</h3>
                  <p className="text-sm text-muted-foreground mb-4">The simplest integration — just embed an iframe:</p>
                  <pre className="bg-foreground text-background rounded-xl p-4 text-sm overflow-x-auto font-mono">
{`<!-- URL Parameters: a=amount, p=method, orderId=your_order_id -->
<iframe 
  src="https://pay.pvaas.com/payment?a=1000&orderId=ORD456"
  width="450" height="700" 
  style="border:none; border-radius:16px;">
</iframe>`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {active === "webhooks" && (
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-6">Webhooks</h1>
              <p className="text-muted-foreground mb-8">PVaaS sends a POST request to your configured webhook URL immediately after payment verification.</p>

              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">Webhook Payload</h3>
                <pre className="bg-foreground text-background rounded-xl p-4 text-sm overflow-x-auto font-mono">
{`POST /your-webhook-endpoint HTTP/1.1
Content-Type: application/json
X-PVaaS-Signature: sha256=abc123...

{
  "event": "payment.verified",
  "trx_id": "8A1B2C3D4E",
  "amount": 500,
  "method": "bkash",
  "sender_number": "01712XXXXXX",
  "order_id": "ORD123",
  "merchant_id": "m_abc123",
  "verified_at": "2026-03-29T10:30:00Z"
}`}
                </pre>
              </div>
            </div>
          )}

          {active === "authentication" && (
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-6">Authentication</h1>
              <p className="text-muted-foreground mb-8">All API requests must include your API key and HMAC signature.</p>

              <div className="space-y-6">
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">HMAC Signature</h3>
                  <p className="text-sm text-muted-foreground mb-4">Generate HMAC-SHA256 signature using your secret key:</p>
                  <pre className="bg-foreground text-background rounded-xl p-4 text-sm overflow-x-auto font-mono">
{`const crypto = require('crypto');

const payload = JSON.stringify(requestBody);
const signature = crypto
  .createHmac('sha256', YOUR_SECRET_KEY)
  .update(payload)
  .digest('hex');

// Add header: X-Signature: sha256={signature}`}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Docs;
