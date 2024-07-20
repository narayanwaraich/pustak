import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

type accordian = { title: string; children: React.ReactNode };

const Accordian = ({ title, children }: accordian) => {
  return (
    <Disclosure as="div" className="w-full max-w-md">
      <DisclosureButton className="group flex w-full items-center gap-2 border-b pb-2 text-left">
        <ChevronDownIcon className="w-5 group-data-[open]:rotate-180" />
        {title}
      </DisclosureButton>
      <div className="overflow-hidden py-2">
        <DisclosurePanel
          transition
          className="origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
        >
          {children}
        </DisclosurePanel>
      </div>
    </Disclosure>
  );
};

export default Accordian;
