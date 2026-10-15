import { InternalServerErrorException } from '@nestjs/common'
import {hash} from 'argon2'

export default async function hashPassword( plainPassword : string) {
    try{
        let hashedPassword = await hash(plainPassword)
        return hashedPassword
    } catch(error){
        console.error('Hashing is failed: ' + error)
        throw new InternalServerErrorException("Hashing is failed")
    }
}