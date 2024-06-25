const people = [
    {
      name: 'Bank Withdrawal',
      email: 'leslie.alexander@example.com',
      role: '23,000',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: null,
    },
    {
      name: 'Crypto Deposit',
      email: 'michael.foster@example.com',
      role: '400,000',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: null
    },
    {
      name: 'Airtime',
      email: 'dries.vincent@example.com',
      role: '3,000',
      imageUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Bank Withdrawal',
      email: 'lindsay.walton@example.com',
      role: '1,045,000',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Crypto Deposit',
      email: 'courtney.henry@example.com',
      role: '174,000',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Crypto Deposit',
      email: 'tom.cook@example.com',
      role: '98,250',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
  ]
const Transactions = () => {
  return (
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <div className='py-8 mx-auto px-8 w-4/5 mb-6 relative bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm sm:items-center sm:space-y-0 sm:space-x-6'>
        <h3 className='text-left text-2xl font-bold leading-9 tracking-tight text-gray-900'>Transactions</h3>
        <ul role="list" className="divide-y divide-gray-100">
        {people.map((person) => (
            <li key={person.email} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">N{person.role}</p>
                {person.lastSeen ? (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                    Time: <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                </p>
                ) : (
                <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-xs leading-5 text-gray-500">Now</p>
                </div>
                )}
            </div>
            </li>
        ))}
        </ul>
    </div>
    </div>
  )
}

export default Transactions
