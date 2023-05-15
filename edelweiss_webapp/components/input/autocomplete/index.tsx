import { Combobox, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"

import { FiCheck } from "react-icons/fi"
import { HiChevronUpDown } from "react-icons/hi2"

export function Autocomplete({
  options,
  action,
  defaultValue,
}: {
  options: { label: string; value: string }[]
  action: (arg0: any) => void
  defaultValue: { label: string; value: string }
}) {
  const [selected, setSelected] = useState(defaultValue)
  const [query, setQuery] = useState("")

  const filteredPeople =
    query === ""
      ? options
      : options.filter((person: any) =>
          person.label
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        )

  const handleSelect = (newValue: any) => {
    setSelected(newValue)
    action(newValue)
  }

  return (
    <Combobox value={selected} onChange={handleSelect}>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden border border-gray-100 border-solid rounded-md bg-white text-left focus-within:border-gray-400">
          <Combobox.Input
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 focus:outline-none"
            displayValue={(person: any) => person.label}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2 border-0 bg-transparent">
            <HiChevronUpDown
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute z-50 border-1 border-solid border-gray-100 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredPeople.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none py-2 px-2 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredPeople.map((person: any) => (
                <Combobox.Option
                  key={person.value}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-gray-100 text-black" : "text-gray-900"
                    }`
                  }
                  value={person}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {person.label}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-gray-900" : "text-gray-600"
                          }`}
                        >
                          <FiCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  )
}
