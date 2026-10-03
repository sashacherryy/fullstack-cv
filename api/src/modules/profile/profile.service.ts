import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DbService } from '../../database/db.service'
import { ContactsService } from '../contacts/contacts.service'
import { profiles } from '../../database/schema'
import { eq } from 'drizzle-orm'

@Injectable()
export class ProfileService  {
    constructor(private readonly db: DbService, private readonly contactsService: ContactsService){}

    async getProfile(){
        const [profileRows, contactsRows] = await Promise.all(
            [this.db.db
            .select({
                photoUrl: profiles.photoUrl
                , firstNameUa: profiles.firstNameUa
                , firstNameEn: profiles.firstNameEn
                , lastNameUa: profiles.lastNameUa
                , lastNameEn: profiles.lastNameEn
                , bioUa: profiles.bioUa
                , bioEn: profiles.bioEn
                , positions: profiles.positions
                , locationUa: profiles.locationUa
                , locationEn: profiles.locationEn
                , birthday: profiles.birthday
                , softSkillsUa: profiles.softSkillsUa
                , softSkillsEn: profiles.softSkillsEn
                , hardSkills: profiles.hardSkills
                , workStatusUa: profiles.workStatusUa
                , workStatusEn: profiles.workStatusEn
            })
            .from(profiles)
            .where(eq(profiles.id, 1)), 
            
            this.contactsService.findByProfileId(1)
        ])
        
        if(profileRows.length === 0) throw new InternalServerErrorException('Профіль не знайдено')
        
        let result: Record<string, any> = {
            ua: {},
            en: {}
        }

        Object.keys(profileRows[0]).forEach((key) => {
            if(key.endsWith('Ua')) result["ua"][key.slice(0, -2)] = profileRows[0][key as keyof typeof profileRows[0]]
            else if(key.endsWith('En')) result["en"][key.slice(0, -2)] = profileRows[0][key  as keyof typeof profileRows[0]]
            else result[key] = profileRows[0][key as keyof typeof profileRows[0]]
        })

        result["socialmedia"] = contactsRows

        return result
    }

}
