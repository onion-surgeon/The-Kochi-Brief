import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubscriptionForm from "@/components/SubscriptionForm";

const AboutPage = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">
      <div className="container max-w-2xl py-16 animate-fade-in-up">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-6">About The Kochi Brief</h1>

        <div className="space-y-5 text-foreground/85 leading-relaxed">
          <p>
            <strong>The Kochi Brief</strong> is a daily news digest built for people who care about Kochi but don't have time to scroll through dozens of news sites every morning.
          </p>
          <p>
            We curate the most important stories from across the city — from metro updates and business news to cultural events and weather alerts — and deliver them in a concise, easy-to-read format that takes just 5 minutes.
          </p>
          <p>
            Whether you're a working professional in Kakkanad, a student at CUSAT, or a Kochite living abroad who wants to stay connected, The Kochi Brief keeps you informed without the noise.
          </p>
          <p>
            Our team handpicks stories from verified local sources, fact-checks every detail, and writes summaries that get straight to the point. No clickbait, no fluff — just the news that matters.
          </p>
        </div>

        <div className="mt-12 p-6 rounded-lg bg-secondary/60 border">
          <h2 className="font-serif text-xl font-bold mb-3">Subscribe to The Kochi Brief</h2>
          <p className="text-sm text-muted-foreground mb-4">Get Kochi's top stories in your inbox every morning.</p>
          <SubscriptionForm />
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default AboutPage;
