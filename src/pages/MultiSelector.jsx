import { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/solid';

const mailingLists = [
  { id: 1, title: 'Newsletter', description: 'Last message sent an hour ago', users: '621 users' },
  { id: 2, title: 'Existing Customers', description: 'Last message sent 2 weeks ago', users: '1200 users' },
  { id: 3, title: 'Trial Users', description: 'Last message sent 4 days ago', users: '2740 users' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {

    const [selectedMailingLists, setSelectedMailingLists] = useState([]);

    const handleMailingListToggle = (mailingList) => {
      setSelectedMailingLists((prevSelected) => {
        if (prevSelected.includes(mailingList)) {
          return prevSelected.filter((list) => list !== mailingList);
        } else {
          return [...prevSelected, mailingList];
        }
      });
    };

    return (
        <>
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
         <div>
      <h1 className="text-base font-medium text-gray-900">Select mailing lists</h1>

      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
        {mailingLists.map((mailingList) => (
          <div
            key={mailingList.id}
            onClick={() => handleMailingListToggle(mailingList)}
            className={classNames(
              'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none',
              selectedMailingLists.includes(mailingList) ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-gray-300'
            )}
          >
            <div className="flex-1 flex">
              <div className="flex flex-col">
                <span className="block text-sm font-medium text-gray-900">{mailingList.title}</span>
                <span className="mt-1 flex items-center text-sm text-gray-500">{mailingList.description}</span>
                <span className="mt-6 text-sm font-medium text-gray-900">{mailingList.users}</span>
              </div>
            </div>
            {selectedMailingLists.includes(mailingList) && (
              <CheckCircleIcon className="h-5 w-5 text-indigo-600" aria-hidden="true" />
            )}
            <div
              className={classNames(
                'border-2',
                selectedMailingLists.includes(mailingList) ? 'border-indigo-500' : 'border-transparent',
                'absolute -inset-px rounded-lg pointer-events-none'
              )}
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </div>


         </div>
        </>
    )
  }
  