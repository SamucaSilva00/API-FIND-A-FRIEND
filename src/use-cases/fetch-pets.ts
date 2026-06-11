import { PetsRepository } from "@/repositories/pets-repository"
import { Pet, PetLevel, Size } from "generated/prisma/client"
import { CityAndStateAreRequiredError } from "./errors/city-and-state-are-required"

interface FetchPetsUseCaseRequest {
  city: string
  state: string
  age?: number | null
  size?: Size | null
  energyLevel?: PetLevel | null
  independenceLevel?: PetLevel | null
  type?: string | null
}

interface FetchPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ city, state, age = null, size = null, energyLevel = null, independenceLevel = null, type = null }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    
    if (!city || !state) {
      throw new CityAndStateAreRequiredError()
    }
    
    const pets = await this.petsRepository.findMany({ 
      city, 
      state, 
      age, 
      size, 
      energy_level: energyLevel, 
      independence_level: independenceLevel, 
      type 
    })

    return { pets }
  }
}
