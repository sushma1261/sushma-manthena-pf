import { contactData } from "@/lib/data";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { forwardRef } from "react";

import { MagneticButton } from "../ui/MagneticButton";

const Footer = forwardRef<HTMLElement>((props, ref) => {
  return (
    <footer
      ref={ref}
      id="contact"
      className="bg-muted/30 border-t border-border/40 py-20"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <MagneticButton className="inline-block">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-primary cursor-default">
            Let's work together
            </h2>
        </MagneticButton>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fadeIn [animation-fill-mode:forwards] opacity-0 [animation-delay:300ms]">
          I'm currently looking for opportunities. Let's connect!
        </p>

        <div className="flex justify-center items-center gap-6 pt-6 animate-fadeIn [animation-fill-mode:forwards] opacity-0 [animation-delay:500ms]">
          <a
            href={contactData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all hover:scale-110"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-7 w-7 text-teal-600" />
          </a>
          <a
            href={contactData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all hover:scale-110"
            aria-label="GitHub"
          >
            <Github className="h-7 w-7 text-teal-600" />
          </a>
          <a
            href={`mailto:${contactData.email}`}
            className="p-4 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all hover:scale-110"
            aria-label="Email"
          >
            <Mail className="h-7 w-7 text-teal-600" />
          </a>
        </div>

        <div className="flex justify-center items-center gap-2 text-base text-muted-foreground pt-6 animate-fadeIn [animation-fill-mode:forwards] opacity-0 [animation-delay:700ms]">
          <MapPin className="h-5 w-5" />
          <span>{contactData.location}</span>
        </div>

        <div className="pt-12 text-sm text-muted-foreground border-t border-gray-200 dark:border-gray-700 animate-fadeIn [animation-fill-mode:forwards] opacity-0 [animation-delay:900ms]">
          <p>
            © {new Date().getFullYear()} Sushma Manthena. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
export default Footer;
