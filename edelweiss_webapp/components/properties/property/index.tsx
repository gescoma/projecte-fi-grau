import { Avatar } from "@/components/user/avatar"
import { Card } from "@/components/card"
import Image from "next/image"
import { Pill } from "@/components/pill"

export function Property({ data }: { data: any }) {
  return (
    <Card clickable>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2>{data.address}</h2>
          {data.price && <span>{data.price} €</span>}
        </div>
        <div className="flex flex-col gap-2">
          <h5>Estado de la operación</h5>
          <Pill color="#1abc9c" size="small">
            Falta documentación
          </Pill>
        </div>
        <div className="flex flex-col gap-2">
          <h5>Cliente </h5>
          <Avatar
            user={{
              name: "Alejandro Nanez",
              username: "alejandronanez",
              image: "https://unavatar.io/alejandronanez",
            }}
            size="compressed"
          />
        </div>
      </div>
    </Card>
  )
}
