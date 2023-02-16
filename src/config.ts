import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,
  RECOMENDATIONS_LENGTH: +(process.env.RECOMENDATIONS_LENGTH || 50),
  LIKES_MULIPLICATION_INDEX: +(process.env.LIKES_MULIPLICATION_INDEX || 10),
  WEBSITE_URL: process.env.WEBSITE_URL || 'localhost:3000'