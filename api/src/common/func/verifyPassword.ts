import { InternalServerErrorException } from '@nestjs/common'
import { verify } from 'argon2'

export default async function verifyPassword(hashedPassword: string, plainPassword: string ): Promise<boolean>{
    try {
        return await verify(hashedPassword, plainPassword)
    } catch (error) {
        console.error('Error verifying password: ', error)
        throw new InternalServerErrorException('Error verifying password')
    }
}