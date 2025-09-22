import { Card, CardHeader } from "@/components/ui/card";
import { experienceData } from "@/lib/data";
import { BriefcaseBusiness, CalendarRange } from "lucide-react";
import { forwardRef, useEffect, useRef, useState } from "react";

// Animated Modal Component
const Modal = ({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  const [show, setShow] = useState(open);

  useEffect(() => {
    if (open) setShow(true);
  }, [open]);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300);
  };

  if (!open && !show) return null;

  const handleOverlayClick = () => handleClose();
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 transition-opacity duration-300 mt-0 ${
        show ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleOverlayClick}
      style={{ marginTop: 0 }}
    >
      <div
        className={`bg-background rounded-xl shadow-xl w-full max-w-4xl p-6 relative flex flex-col transition-transform duration-300 ${
          show ? "translate-y-0" : "-translate-y-4"
        }`}
        onClick={stopPropagation}
        style={{ maxHeight: "-webkit-fill-available" }}
      >
        <button
          className="absolute top-4 right-4 text-muted-foreground hover:text-red-500 text-xl font-bold"
          onClick={handleClose}
        >
          ✕
        </button>
        <div className="overflow-y-auto pr-2">{children}</div>
      </div>
    </div>
  );
};

const Experience = forwardRef<HTMLElement>((props, ref) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section ref={ref} id="experience" className="section-scroll">
        <div className="opacity-0" ref={contentRef}>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BriefcaseBusiness className="h-6 w-6" />
            Experience
          </h2>

          {/* 3 cards side by side */}
          <div className="grid gap-6 md:grid-cols-3">
            {experienceData.map((exp, index) => (
              <Card
                key={index}
                className="cursor-pointer transition-transform duration-300 ease-in-out animate-fade-in hover:scale-105 relative"
                style={{ animationDelay: `${index * 200}ms` }}
                onClick={() => setModalIndex(index)}
              >
                <CardHeader className="pb-2 flex flex-col gap-1">
                  <h3 className="font-bold text-lg">{exp.role}</h3>
                  <p className="text-muted-foreground">{exp.company}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarRange className="h-4 w-4" />
                    <span>{exp.dates}</span>
                  </div>
                  <p className="text-sm font-medium mt-2">{exp.project}</p>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-5">
                    {exp.summary}
                  </p>
                </CardHeader>

                {/* View More visual cue */}
                <div className="absolute bottom-3 right-3 text-xs text-muted-foreground flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
                  <span>More</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Full-page modal */}
      {modalIndex !== null && (
        <Modal open={modalIndex !== null} onClose={() => setModalIndex(null)}>
          <h3 className="font-bold text-xl mb-2">
            {experienceData[modalIndex].role} @{" "}
            {experienceData[modalIndex].company}
          </h3>
          <div className="flex items-center gap-2 mb-3 text-muted-foreground">
            <CalendarRange className="h-4 w-4" />
            <span>{experienceData[modalIndex].dates}</span>
          </div>
          <p className="text-sm font-medium mb-4">
            {experienceData[modalIndex].project}
          </p>

          {/* Responsibilities */}
          {experienceData[modalIndex].responsibilities && (
            <div className="mb-4">
              <p className="font-semibold mb-1">Responsibilities:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground">
                {experienceData[modalIndex].responsibilities.map((resp, i) => (
                  <li key={i}>{resp}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Projects */}
          {experienceData[modalIndex].projects &&
            Object.keys(experienceData[modalIndex].projects).map(
              (project, i) => (
                <div key={i} className="mb-3">
                  <p className="font-semibold mb-1">{project}:</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground ml-4">
                    {experienceData[modalIndex].projects![project].map(
                      (item, idx) => (
                        <li key={idx}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
              )
            )}
        </Modal>
      )}
    </>
  );
});

Experience.displayName = "Experience";
export default Experience;
