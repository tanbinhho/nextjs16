import Link from 'next/link';

export const metadata = {
  title: 'BeautyPay — Fast & Seamless Payments',
  description: 'Pay beautifully. Simple checkout, flexible payouts, and delightful experiences.',
};

export default function Page() {
  return (
    <main className="bg-white text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Replace with your logo image */}
            <div className="size-8 rounded-lg bg-pink-500" aria-hidden />
            <span className="font-semibold text-lg">TABI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link className="hover:text-gray-700" href="/products/ssr">
              SSR
            </Link>
            <Link className="hover:text-gray-700" href="/products/isr">
              ISR
            </Link>
            <Link className="hover:text-gray-700" href="/products/csr">
              CSR
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <a className="hidden sm:inline-block text-sm" href="#login">
              Log in
            </a>
            <a
              href="#get-started"
              className="inline-flex items-center justify-center rounded-md bg-pink-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-pink-700"
            >
              Get started
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-24 grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Pay beautifully. Grow effortlessly.
            </h1>
            <p className="text-lg text-gray-600">
              A modern payments platform for beauty brands and creators. Faster checkouts, flexible
              payouts, and delightful customer experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#get-started"
                className="inline-flex items-center justify-center rounded-md bg-pink-600 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-pink-700"
              >
                Start free
              </a>
              <a
                href="#demo"
                className="inline-flex items-center justify-center rounded-md border border-gray-300 px-5 py-3 text-sm font-medium hover:bg-gray-50"
              >
                Book a demo
              </a>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>No credit card required</span>
              <span aria-hidden>•</span>
              <span>Cancel anytime</span>
            </div>
          </div>

          {/* Replace this with your hero image from Figma */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-gray-200">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-white to-purple-100" />
            {/* Example product screenshot placeholder */}
            <div className="absolute inset-6 rounded-xl bg-white shadow-2xl border border-gray-100" />
            {/* Optional decorative */}
            <div className="absolute -bottom-6 -right-6 size-28 rounded-full bg-pink-200 blur-xl opacity-60" />
          </div>
        </div>
      </section>

      {/* Logos / Social proof */}
      <section className="border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-center text-sm text-gray-500 mb-6">Trusted by modern beauty brands</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            {/* Replace with real brand logos */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-8 w-28 rounded-md bg-gray-100" aria-hidden />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold">Everything you need to convert and retain</h2>
            <p className="mt-3 text-gray-600">
              From instant checkout to flexible payouts — designed for delight and performance.
            </p>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Instant checkout',
                desc: 'Frictionless payment flows that boost conversion.',
              },
              {
                title: 'Subscriptions',
                desc: 'Recurring billing with smart dunning and proration.',
              },
              { title: 'Payouts', desc: 'Flexible schedules and multi-currency support.' },
              { title: 'Analytics', desc: 'Real-time revenue insights and cohort retention.' },
              { title: 'Fraud & risk', desc: 'Built-in protection with adaptive verification.' },
              { title: 'Widgets', desc: 'Drop-in UI components that match your brand.' },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-gray-200 p-6">
                <div className="size-9 rounded-md bg-pink-100 mb-4" aria-hidden />
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-bold">How it works</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Connect', desc: 'Link your store or site in minutes.' },
              { step: '02', title: 'Customize', desc: 'Match your brand with Tailwind themes.' },
              { step: '03', title: 'Launch', desc: 'Go live with a single snippet or widget.' },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl bg-white border border-gray-200 p-6">
                <div className="text-xs font-mono text-gray-500">{s.step}</div>
                <h3 className="mt-2 font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-bold">Loved by customers</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <figure key={i} className="rounded-2xl border border-gray-200 p-6">
                <blockquote className="text-gray-700">
                  “BeautyPay increased our checkout conversion by 18% in the first month.”
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3 text-sm text-gray-500">
                  <div className="size-8 rounded-full bg-gray-200" aria-hidden />
                  <div>
                    <div className="text-gray-800 font-medium">Customer Name</div>
                    <div>Brand • Role</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-bold">Simple pricing</h2>
          <p className="mt-2 text-gray-600">Transparent fees. Volume discounts available.</p>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {['Starter', 'Growth', 'Scale'].map((tier) => (
              <div key={tier} className="rounded-2xl bg-white border border-gray-200 p-6">
                <h3 className="font-semibold">{tier}</h3>
                <p className="mt-2 text-sm text-gray-600">Best for {tier.toLowerCase()} teams.</p>
                <div className="mt-6">
                  <a
                    href="#get-started"
                    className="inline-flex items-center justify-center rounded-md bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700"
                  >
                    Choose {tier}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-bold">Frequently asked questions</h2>
          <div className="mt-6 space-y-4">
            {[
              {
                q: 'Is there a free trial?',
                a: 'Yes, you can start for free. No credit card required.',
              },
              {
                q: 'Do you support subscriptions?',
                a: 'Yes, with dunning, proration, and webhooks.',
              },
              {
                q: 'How are payouts handled?',
                a: 'Flexible schedules with multi-currency support.',
              },
            ].map((item) => (
              <details key={item.q} className="rounded-xl border border-gray-200 p-4">
                <summary className="cursor-pointer font-medium">{item.q}</summary>
                <p className="mt-2 text-sm text-gray-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex flex-col sm:flex-row justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-pink-500" aria-hidden />
            <span className="font-semibold">BeautyPay</span>
          </div>
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} BeautyPay. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
