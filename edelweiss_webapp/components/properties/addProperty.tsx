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

import { ControledSelect } from "@/components/input/selector/controlledSelect"
import { Input } from "@/components/input"
import { usePropertiesContext } from "@/context/PropertiesContext"
import { useSupabase } from "@/context/AuthContext"

type Inputs = {
  address: string
  price: string
  owner: string
}

export function AddProperty({
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

  const { owners, createProperty } = usePropertiesContext()
  const { supabase, user: authUser } = useSupabase()
  const [initialOwner, setInitialOwner] = useState<any>("")
  const [error, setError] = useState<string | undefined>(undefined)

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
    try {
      setError(undefined)
      const formatedUser = {
        direccion: data.address,
        precio: data.price,
        id_usuario: data.owner || initialOwner.id,
      }
      const { error } = createProperty(formatedUser)
      if (error) {
        setError(error.message)
        return
      }
      closeModal()
    } catch (e: any) {
      console.log("here")
      setError(e.message)
    }
  }

  function closeModal() {
    setIsOpen(false)
  }

  const responsablesLimpios = owners.filter((owner: any) => owner.id !== "")

  const getCurrentUserName = useCallback(async () => {
    const authData = authUser
    const { data: userData, error } = await supabase
      .from("users")
      .select()
      .eq("id", authData?.id)
      .single()
    return {
      nombre: `${userData?.nombre || ""}${
        (userData?.nombre && userData.apellidos && " ") || ""
      }${userData?.apellidos || ""}`,
      id: authData?.id,
    }
  }, [supabase, authUser])

  useEffect(() => {
    getCurrentUserName().then((name) => setInitialOwner(name))
  }, [getCurrentUserName])

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
                  className="text-xl leading-6 text-gray-900"
                >
                  Añadir Propiedad
                </Dialog.Title>
                <div className="mt-8">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-8">
                      <div className="flex flex-col gap-4">
                        <h6>Información de la propriedad</h6>
                        <div className="flex">
                          <div className="flex flex-col w-full">
                            <Input
                              name="address"
                              placeholder="Dirección"
                              register={register}
                              size="full"
                              options={{ required: true }}
                            />
                            {errors.address && (
                              <div className="mt-2 ml-1 text-xs text-red-500">
                                El campo Direccion es obligatorio
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex flex-col w-full">
                            <Input
                              name="precio"
                              placeholder="Precio de la propiedad"
                              register={register}
                              size="full"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <h6>Responsable</h6>
                        <div className="flex columns-2 gap-4">
                          <ControledSelect
                            options={responsablesLimpios.map((owner: any) => ({
                              label: owner.name,
                              value: owner.id,
                            }))}
                            name="owner"
                            control={control}
                            defaultValue={initialOwner.nombre}
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
                        Crear propiedad
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
