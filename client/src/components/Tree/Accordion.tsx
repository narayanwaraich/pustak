import { useState } from "react";

type accordian = { title: string; children: React.ReactNode };

const Accordion = ({ title, children }: accordian) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-100 p-4">
      <div
        className="accordion-header flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className={`h-5 w-5 shrink-0 ${isOpen ? "rotate-90" : ""}`}
        >
          <path
            fill-rule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clip-rule="evenodd"
          ></path>
        </svg>

        <h2 className="accordion-title text-lg font-bold">{title}</h2>
      </div>
      <div
        className={`accordion-content transition-max-height overflow-hidden duration-700 ${isOpen ? "max-h-96" : "max-h-0"}`}
      >
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};
/* 
const App = () => {
  return (
    <div className="mx-auto mt-10 max-w-md">
      <Accordion title="Section 1">
        <p>This is the content for section 1.</p>
      </Accordion>
      <Accordion title="Section 2">
        <p>This is the content for section 2.</p>
      </Accordion>
    </div>
  );
};
 */
export default Accordion;
