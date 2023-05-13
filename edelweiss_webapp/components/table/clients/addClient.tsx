import { Dialog, Transition } from "@headlessui/react"
import { Dispatch, Fragment, SetStateAction } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import { ControledSelect } from "@/components/input/selector/controlledSelect"
import { Input } from "@/components/input"
import { useClientsContext } from "@/context/ClientsContext"

type Inputs = {
  name: string
  surname: string
  secondSurname: string
  phone: string
  email: string
  image: string
  source: string
  owner: string
}

export function AddClient({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>()

  const { supabase, save } = useClientsContext()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    closeModal()
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Añadir Cliente
                </Dialog.Title>
                <div className="mt-2">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <Input
                        name="name"
                        placeholder="Nombre"
                        register={register}
                        size="half"
                      />
                      <Input
                        name="surname"
                        placeholder="Primer Apellido"
                        register={register}
                        size="half"
                      />
                      <Input
                        name="secondSurname"
                        placeholder="Segundo Apellido"
                        register={register}
                        size="half"
                      />
                    </div>
                    <div>
                      <Input
                        name="phone"
                        placeholder="Numero de teléfono"
                        register={register}
                        size="small"
                      />
                      <Input
                        name="email"
                        placeholder="Correo electrónico"
                        register={register}
                        size="small"
                      />
                    </div>

                    <div>
                      <ControledSelect
                        options={[
                          {
                            label: "Facebook",
                            value: "FACEBOOK",
                          },
                          {
                            label: "Instagram",
                            value: "INSTAGRAM",
                          },
                        ]}
                        name="source"
                        control={control}
                        defaultValue="Hola"
                      />
                      <ControledSelect
                        options={[
                          {
                            label: "Facebook",
                            value: "FACEBOOK",
                          },
                          {
                            label: "Instagram",
                            value: "INSTAGRAM",
                          },
                        ]}
                        name="owner"
                        control={control}
                        defaultValue="Hola"
                      />
                    </div>

                    <div className="mt-4 flex justify-between">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Guardar cliente
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
