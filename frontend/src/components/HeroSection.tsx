import SubscriptionForm from "./SubscriptionForm";

const HeroSection = () => (
  <section className="py-16 md:py-24 text-center">
    <div className="container max-w-2xl animate-fade-in-up">
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
        Kochi News, in 5 Minutes
      </h1>
      <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
        Daily quick updates on everything happening in Kochi — delivered straight to your inbox.
      </p>
      <div className="flex justify-center">
        <SubscriptionForm />
      </div>
    </div>
  </section>
);

export default HeroSection;
