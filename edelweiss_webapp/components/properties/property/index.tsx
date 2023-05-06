import { Card } from "@/components/card"
import Image from "next/image"

export function Property({ data }: { data: any }) {
  return (
    <Card>
      <div>
        <Image
          src={data.property.image}
          alt={`Imagen de la propiedad de ${data.property.address}`}
          width="200"
          height="100"
        />
      </div>
      <div>
        <h2>{data.property.name}</h2>
        <h3>{data.property.address}</h3>
        <p>{data.property.description}</p>
      </div>
      <div>
        <p>{data.property.price} €</p>
      </div>
      <div>
        {data.type} - {data.status}
      </div>
    </Card>
  )
}
