import React from "react";

const Intro: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-bold text-center mb-10">
          Hi, I'm Sushma. Nice to meet you.
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground text-center leading-relaxed">
          Since beginning my journey as a software developer, I've worked at
          Flipkart for over 4 years building scalable web and mobile
          applications. I've led the development of conversational design tools,
          AI-powered platforms, and live commerce experiences that serve
          millions of users. Currently pursuing my Master's in Computer Science
          at the University of Washington, I'm quietly confident, naturally
          curious, and perpetually working on improving my skills in AI, cloud
          technologies, and full-stack development.
        </p>
      </div>
    </section>
  );
};

export default Intro;
