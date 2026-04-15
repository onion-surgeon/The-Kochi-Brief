import SubscriptionForm from "./SubscriptionForm";

const MidPageSubscribe = () => (
  <section className="py-14 bg-secondary/50">
    <div className="container max-w-2xl text-center">
      <h2 className="font-serif text-2xl font-bold mb-2">Never Miss a Story</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Get the best of Kochi news delivered to your inbox every morning.
      </p>
      <div className="flex justify-center">
        <SubscriptionForm />
      </div>
    </div>
  </section>
);

export default MidPageSubscribe;
