import { Dialog, Transition } from "@headlessui/react"
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import { ControledAutocomplete } from "../input/autocomplete/controlledAutocomplete"
import { Input } from "@/components/input"
import { useComprasContext } from "@/context/ComprasContext"
import { useSupabase } from "@/context/AuthContext"

type Inputs = {
  id_user: {
    label: string
    value: string
  }
  id_cliente: {
    label: string
    value: string
  }
  id_vivienda: {
    label: string
    value: string
  }
  nombre: string
  descripcion: string
}

const defaultCurrentUser = {
  label: "Propietario",
  value: "id",
}

export function AddCompra({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>()

  const [error, setError] = useState<string | undefined>(undefined)
  const [currentUser, setCurrentUser] = useState(defaultCurrentUser)
  const { owners, viviendas, clientes, createCompra } = useComprasContext()
  const { profile, user: supabaseUser } = useSupabase()

  useEffect(() => {
    let user = {
      ...defaultCurrentUser,
    }
    if (profile && supabaseUser) {
      user = {
        label: profile.name,
        value: supabaseUser.id,
      }
    }
    setCurrentUser(user)
  }, [profile, supabaseUser])

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    try {
      setError(undefined)
      createCompra({
        id_user: data.id_user?.value || currentUser.value,
        id_cliente: data.id_cliente?.value || clientes[0].value,
        id_vivienda: data.id_vivienda?.value || viviendas[0].value,
        nombre: data.nombre,
        descripcion: data.descripcion,
      })
      closeModal()
    } catch (e: any) {
      setError(e.message)
    }
  }

  function closeModal() {
    setIsOpen(false)
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
              <Dialog.Panel className="w-full max-w-md transform rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl leading-6 text-gray-900"
                >
                  Añadir Compra
                </Dialog.Title>
                <div className="mt-8">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-8">
                      <div className="flex flex-col gap-4">
                        <h6>Información de la compra</h6>
                        <div className="flex">
                          <div className="flex flex-col w-full">
                            <Input
                              name="nombre"
                              placeholder="Nombre de la venta"
                              register={register}
                              size="full"
                              options={{ required: true }}
                            />
                            {errors.nombre && (
                              <div className="mt-2 ml-1 text-xs text-red-500">
                                El campo nombre de la compra es obligatorio
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex flex-col w-full">
                            <Input
                              name="descripcion"
                              placeholder="Descripción de la venta"
                              register={register}
                              size="full"
                              options={{ required: true }}
                            />
                            {errors.descripcion && (
                              <div className="mt-2 ml-1 text-xs text-red-500">
                                El campo descripcion de la compra es obligatorio
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <h6>Vivienda</h6>
                        <div className="flex flex-col gap-4">
                          <ControledAutocomplete
                            options={viviendas}
                            name="id_vivienda"
                            control={control}
                            defaultValue={viviendas[0]}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <h6>Cliente de la compra</h6>
                        <div className="flex flex-col gap-4">
                          <ControledAutocomplete
                            options={clientes}
                            name="id_cliente"
                            control={control}
                            defaultValue={clientes[1]}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <h6>Responsable de la compra</h6>
                        <div className="flex flex-col gap-4">
                          <ControledAutocomplete
                            options={owners
                              .filter((val: any) => {
                                if (val.name === "Todos") return false
                                return true
                              })
                              .map((val: any) => ({
                                label: val.name,
                                value: val.id,
                              }))}
                            name="id_user"
                            control={control}
                            defaultValue={currentUser}
                          />
                        </div>
                      </div>
                    </div>
                    {error && <span>{error}</span>}

                    <div className="mt-8 flex justify-between">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Crear compra
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
