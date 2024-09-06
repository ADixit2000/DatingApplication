import { Photo } from "./photo"

export interface Member {
    id: Number
    UserName: string
    age: string
    PhotoUrl: string
    KnownAs: string
    Created: Date
    LastActive: Date
    gender: string
    introduction: string
    interests: string
    lookingFor: string
    City: string
    Country: string
    Photos: Photo[]
  }
  
  