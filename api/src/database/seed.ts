import 'dotenv/config'
import * as pg from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema'

const db_url = process.env.DATABASE_URL

if(!db_url) throw new Error('DATABASE_URL is not defined')

    
const pool: pg.Pool = new pg.Pool({
    connectionString: db_url        
})

const db = drizzle(pool, {
    schema
})

async function seedData() {
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