import {faker} from "@faker-js/faker"

export const type = ["En venta", "En alquiler"]
export const estado = ["Oferta", "Pendientes de respuesta", "Rechazada", "Aceptada"]

const generateOwners = () => {
  const owners = []
  for (let i = 0; i < 5; i++) {
    owners.push({
      id: i,
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      email: faker.internet.email(),
      image: faker.image.avatar(),
    })
  }
  return owners
}

export const ownersList = generateOwners()

export function generateProperties(num = 103) {
  const properties = []
  for (let i = 0; i < num; i++) {
    properties.push({
      status: estado[Math.floor(Math.random() * estado.length)],
      date: faker.date.past(),
      id: faker.random.alphaNumeric(10),
      property: {
        id: faker.random.alphaNumeric(10),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode(),
        price: faker.finance.account(3),
        image: faker.image.unsplash.buildings(),
      },
      type: type[Math.floor(Math.random() * type.length)],
      owner: ownersList[Math.floor(Math.random() * ownersList.length)],
      customer: {
        id: faker.random.alphaNumeric(10),
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        email: faker.internet.email(),
        image: faker.image.avatar(),
      },
    })
  }
  return properties
}