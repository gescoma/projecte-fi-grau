import {faker} from "@faker-js/faker"

export const source = ["Empresa", "Persona"]

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

export function generateUsers(num = 100) {
  const users = []
  const owners = ownersList
  for (let i = 0; i < num; i++) {
    users.push({
      id: faker.random.alphaNumeric(),
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      email: faker.internet.email(),
      company: faker.company.name(),
      source: source[Math.floor(Math.random() * source.length)],
      phone: faker.phone.number(),
      image: faker.image.avatar(),
      owner: owners[Math.floor(Math.random() * owners.length)],
    })
  }
  return users
}