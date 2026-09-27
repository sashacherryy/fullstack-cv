import { pgTable, serial, integer, varchar, timestamp, check, date, text, pgEnum} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const projectsType = pgEnum("type",[ "demo", "production", "training", "NDA"])

export const owner = pgTable('owner', {
  id: integer('id').primaryKey()
  , email: varchar('email', {
    length: 255
  }).notNull().unique()
  , passwordHash: text('password_hash').notNull()
  , createdAt: timestamp('created_at').notNull().defaultNow()
}
, (table) => ({
    ownerIdCheck: check('owner_id_check', sql`${table.id} = 1`)
}));

export const profiles = pgTable('profiles', {
  id: integer('id').primaryKey().notNull()
  , photoUrl: varchar('photo_url', {
    length: 255
  }).notNull()
  , firstNameUa: varchar('first_name_ua', {
    length: 255
  }).notNull()
  , firstNameEn: varchar('first_name_en', {
    length: 255
  }).notNull()
  , lastNameUa: varchar('last_name_ua', {
    length: 255
  }).notNull()
  , lastNameEn: varchar('last_name_en', {
    length: 255
  }).notNull()
  , bioUa: text('bio_ua').notNull()
  , bioEn: text('bio_en').notNull()
  , positions: varchar("positions").array()
  , locationUa: varchar('location_ua', {
    length: 255
  }).notNull()
  , locationEn: varchar('location_en',{
    length: 255
  }).notNull()
  , birthday: date('birthday', { 
    mode: 'date'
  }).notNull()
  , softSkillsUa: text('softskills_ua').array().notNull()
  , softSkillsEn: text('softskills_en').array().notNull()
  , hardSkills: varchar('hard_skills', {
    length: 255
  }).array()
  , workStatusUa: varchar('work_status_ua', {
    length: 255
  }).notNull()
  , workStatusEn: varchar('work_status_en', {
    length: 255
  }).notNull()
}, (table) => ({
    ownerIdCheck: check('owner_id_check', sql`${table.id} = 1`)
}));

export const contacts = pgTable('contacts', {
  id: integer('id').primaryKey()
  , name: varchar('name', {
    length: 255
  }).unique().notNull()
  , url: varchar('url', {
    length: 255 
  }).unique().notNull()
  , profileId: integer('profile_id').notNull().references(() => profiles.id,{
    onDelete: "cascade"
  })
})

export const projects = pgTable('projects',{
  id: serial('id').primaryKey()
  , nameUa: varchar('name_ua', {
    length: 255
  }).notNull()
  , nameEn: varchar('name_en', {
    length: 255
  }).notNull()
  , descUa: text('desc_ua').notNull()
  , descEn: text('desc_en').notNull()
  , featuresUa: text('features_ua').array().notNull()
  , featuresEn: text('features_en').array().notNull()
  , stack: text('stack').array().notNull()
  , type: projectsType().notNull()
  , live: varchar('live', {
    length: 255
  }).unique()
  , code: varchar('code', {
    length:255
  }).unique()
  , sortOrder: integer('sort_order').unique().notNull()
})

