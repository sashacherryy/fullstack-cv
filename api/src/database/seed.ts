import 'dotenv/config'
import * as pg from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema'
import hashPassword from '../common/func/hashPassword'
 
const db_url = process.env.DATABASE_URL
const PASSWORD_ADMIN = process.env.PASSWORD_ADMIN
const EMAIL_ADMIN= process.env.EMAIL_ADMIN

if(!db_url) throw new Error('DATABASE_URL is not defined')

    
const pool: pg.Pool = new pg.Pool({
    connectionString: db_url        
})

const db = drizzle(pool, {
    schema
})

async function seedData() {

    // ========================
    // 1 SEED PROFILE DATA
    // ========================

    // await db
    //     .insert(schema.profiles)
    //     .values({
    //         id: 1
    //         , photoUrl: "https://example.com/image"
    //         , firstNameUa: "Олександр"
    //         , firstNameEn: "Olexandr"
    //         , lastNameUa : "Вишневський"
    //         , lastNameEn: "Vyshnevsckiy"
    //         , bioUa: "Some Bio UA"
    //         , bioEn: "Some Bio EN"
    //         , positions: [ "Full Stack Developer" ]
    //         , locationUa: "Україна, м. Київ"
    //         , locationEn: "Ukraine, city Kyiv"
    //         , birthday: new Date('2004-09-05')
    //         , softSkillsUa: [ 'Пунктуальний']
    //         , softSkillsEn: [ 'Punctual' ]
    //         , hardSkills: [ 'Html' ]
    //         , workStatusUa: "В пошуку роботи"
    //         , workStatusEn: "Looking for a job"
    //     })
    //     .onConflictDoNothing()

    // ========================
    // 2 SEED PROJECTS DATA
    // ========================

    // await db
    //     .insert(schema.projects)
    //     .values([
    //     {
    //         id: 2
    //         , nameUa: 'test ua2'
    //         , nameEn: 'test en2'
    //         , descUa: 'test desc ua22'
    //         , descEn: 'test desc en22'
    //         , featuresUa: ['Швидий', 'Маштабований']
    //         , featuresEn: ['fast', 'scalable']
    //         , stack: [ "python", 'css']
    //         , type: 'demo'
    //         , sortOrder: 1
    //     },
    //     {
    //         id: 3
    //         , nameUa: 'test ua3'
    //         , nameEn: 'test en3'
    //         , descUa: 'test desc ua33'
    //         , descEn: 'test desc en33'
    //         , featuresUa: ['Швидий', 'Маштабований']
    //         , featuresEn: ['fast', 'scalable']
    //         , stack: [ "python", 'css']
    //         , type: 'demo'
    //         , sortOrder: 3
    //     },
    //     {
    //         nameUa: 'test ua34'
    //         , nameEn: 'test en34'
    //         , descUa: 'test desc ua334'
    //         , descEn: 'test desc en334'
    //         , featuresUa: ['Швидий', 'Маштабований']
    //         , featuresEn: ['fast', 'scalable']
    //         , stack: [ "python", 'css']
    //         , type: 'demo'
    //         , sortOrder: 7
    //     }
    // ]).onConflictDoNothing()    

    // ========================
    // 3 SEED OWNER DATA
    // ========================
    
    // if(!EMAIL_ADMIN) throw new Error('EMAIL_ADMIN is not defined')
    // if(!PASSWORD_ADMIN) throw new Error('PASSWORD_ADMIN is not defined')

    // const hashedPassword = await hashPassword(PASSWORD_ADMIN)
    
    // await db
    //     .insert(schema.owner)
    //     .values({
    //         id: 1
    //         , email: EMAIL_ADMIN
    //         , passwordHash: hashedPassword
    //     }).onConflictDoNothing()

}

async function main() {
    try{
        await seedData()
    } catch (error) {
        console.error(error)
        throw error
    } finally {
        await pool.end()
    }
}

main()