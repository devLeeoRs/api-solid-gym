import { CheckIn, Prisma } from '@prisma/client'
import { CheckInRepository } from '../prisma/prisma-checkin-repository'

export class InMemoryCheckInRepository implements CheckInRepository {
  public items: CheckIn[] = []


  async create(data: Prisma.CheckInUncheckedCreateInput) {
    
    const checkIn = {
      id: 'checkIn-1',
      userId: data.userId,
      gymId: data.gymId,
      created_at: new Date(),
      validated_at:null
    }

    this.items.push(checkIn)

    return checkIn
  }
}