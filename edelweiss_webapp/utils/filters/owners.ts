import { ownersList } from "../faker/users"

export const OWNERS: OwnersType[] = [
  {
    name: "",
    label: "Todos",
  },
  ...ownersList.map(owner => ({
    label: `${owner.name} ${owner.surname}`,
    name: owner.name,
  }))
]

export type OwnersType = {
    name: string
    label: string
  }

  