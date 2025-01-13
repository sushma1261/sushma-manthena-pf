const HomeMobile = () => {
  return (
    <section className="md:hidden min-h-[60vh] flex flex-col justify-center animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-in-right">
        Sushma Manthena
      </h1>
      <h2
        className="text-2xl md:text-3xl text-accent mb-6 animate-slide-in-right"
        style={{ animationDelay: "200ms" }}
      >
        Software Developer
      </h2>
    </section>
  );
};

export default HomeMobile;
