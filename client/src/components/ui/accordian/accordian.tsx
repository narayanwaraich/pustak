import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { Link } from '../link';

type accordianProps = {
  title: string;
  linkTo?: string;
  children: React.ReactNode;
};

export const Accordian = ({ title, linkTo, children }: accordianProps) => {
  return (
    <Disclosure as="div">
      <DisclosureButton className="group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50">
        <ChevronRightIcon className="h-5 w-5 shrink-0 fill-gray-400 transition duration-100 ease-out group-data-[open]:rotate-90 group-data-[hover]:fill-gray-600" />
        <span>{linkTo ? <Link to={linkTo}>{title}</Link> : title}</span>
      </DisclosureButton>
      <div className="overflow-hidden py-2">
        <DisclosurePanel
          transition
          className="mt-2 origin-top text-sm/5 text-white/50 transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
        >
          {children}
        </DisclosurePanel>
      </div>
    </Disclosure>
  );
};
