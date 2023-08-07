import { Disclosure } from "@headlessui/react";

export default function Iframes() {
  return (
    <>
      <Disclosure.Panel
        as="div"
        className="pb-6 prose prose-sm grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-2 xl:gap-x-8"
      >
        {
          <>
            <div className="md:col-span-2 mt-1 flex items-center justify-end">
              <a
                href="#"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Edit videos
              </a>
            </div>
            <div className="aspect-w-16 aspect-h-9 flex justify-center">
              <iframe
                src="https://www.youtube.com/embed/r9jwGansp1E"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="aspect-w-16 aspect-h-9 flex justify-center">
              <iframe
                src="https://www.youtube.com/embed/r9jwGansp1E"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="aspect-w-16 aspect-h-9 flex justify-center">
              <iframe
                src="https://www.youtube.com/embed/r9jwGansp1E"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </>
        }
      </Disclosure.Panel>
    </>
  );
}
