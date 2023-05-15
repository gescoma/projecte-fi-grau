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
import { useClientsContext } from "@/context/ClientsContext"
import { useSupabase } from "@/context/AuthContext"

type Inputs = {
  name: string
  surname: string
  secondSurname: string
  phone: string
  email: string
  image: string
  source: string
  owner: string
  business: string
  nacionalidad: string
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

  const { entidades, owners, createClient } = useClientsContext()
  const { supabase, user: authUser } = useSupabase()
  const [initialOwner, setInitialOwner] = useState<any>("")
  const [initialEntity, setInitialEntity] = useState<any>("")
  const [error, setError] = useState<string | undefined>(undefined)

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    try {
      setError(undefined)
      const formatedUser = {
        nombre: data.name,
        apellido1: data.surname || "",
        apellido2: data.secondSurname || "",
        telefono: data.phone,
        correo: data.email,
        imagen: data.image,
        id_entidad: data.source || initialEntity.codigo,
        id_propietario: data.owner || initialOwner.id,
        empresa: data.business,
        nacionalidad: data.nacionalidad,
      }
      const { error } = createClient(formatedUser)
      if (error) {
        setError(error.message)
        return
      }
      closeModal()
    } catch (e: any) {
      setError(e.message)
    }
  }

  function closeModal() {
    setIsOpen(false)
  }

  const entidadesLimpias = entidades.filter(
    (entidad: any) => entidad.codigo !== ""
  )

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

  useEffect(() => {
    setInitialEntity(
      entidadesLimpias.reduce((acc: any, val: any) => {
        if (acc === "" && val.nombre) acc = val
        return acc
      }, "")
    )
  }, [entidadesLimpias])

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
                  Añadir Cliente
                </Dialog.Title>
                <div className="mt-8">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-8">
                      <div className="flex flex-col gap-4">
                        <h6>Nombre y apellidos</h6>
                        <div className="flex">
                          <div className="flex flex-col w-full">
                            <Input
                              name="name"
                              placeholder="Nombre"
                              register={register}
                              size="full"
                              options={{ required: true }}
                            />
                            {errors.name && (
                              <div className="mt-2 ml-1 text-xs text-red-500">
                                El campo Nombre es obligatorio
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex columns-2 gap-4">
                          <div className="flex flex-col w-full">
                            <Input
                              name="surname"
                              placeholder="Primer Apellido"
                              register={register}
                              size="full"
                              options={{ required: true }}
                            />
                            {errors.surname && (
                              <div className="mt-2 ml-1 text-xs text-red-500">
                                El campo Apellido es obligatorio
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col w-full">
                            <Input
                              name="secondSurname"
                              placeholder="Segundo Apellido"
                              register={register}
                              size="full"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <h6>Información de contacto</h6>
                        <div className="flex columns-2 gap-4">
                          <Input
                            name="phone"
                            placeholder="Numero de teléfono"
                            register={register}
                            size="full"
                          />
                          <Input
                            name="email"
                            placeholder="Correo electrónico"
                            register={register}
                            size="full"
                          />
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
                      <div className="flex flex-col gap-4">
                        <h6>Tipo de usuario</h6>
                        <div className="flex columns-2 gap-4">
                          <ControledSelect
                            options={entidadesLimpias.map((entidad: any) => ({
                              label: entidad.nombre,
                              value: entidad.codigo,
                            }))}
                            name="source"
                            control={control}
                            defaultValue={initialEntity.nombre}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <h6>Información adicional</h6>
                        <div className="flex columns-2 gap-4">
                          <Input
                            name="business"
                            placeholder="Empresa"
                            register={register}
                            size="full"
                          />
                        </div>
                        <div className="flex columns-2 gap-4">
                          <Input
                            name="nacionalidad"
                            placeholder="Nacionalidad"
                            register={register}
                            size="full"
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
