const HomeMobile = () => {
  return (
    <section className="md:hidden min-h-[60vh] flex flex-col justify-center animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-in-right">
        Sushma Manthena
      </h1>
      <h2
        className="text-2xl md:text-3xl text-muted-foreground mb-6 animate-slide-in-right"
        style={{ animationDelay: "200ms" }}
      >
        Software Developer
      </h2>
      <p
        className="text-lg text-muted-foreground max-w-lg animate-slide-in-right"
        style={{ animationDelay: "400ms" }}
      >
        Building digital experiences with passion and precision.
      </p>
    </section>
  );
};

export default HomeMobile;
