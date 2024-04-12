import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

// require('dotenv').config({ path: '.env' });
console.log(process.cwd());

const isTest = process.env.NODE_ENV === 'test';
export const env = {
    DATABASE: {
        CONNECT: process.env.DATABASE_CONNECT as any,
        HOST: process.env.DATABASE_HOST,
        PORT: Number(process.env.DATABASE_PORT),
        USER: process.env.DATABASE_USER,
        PASSWORD: process.env.DATABASE_PASSWORD,
        NAME: process.env.DATABASE_NAME
    },
    ROOT_PATH: process.cwd() + (isTest ? '/src' : ''),
    JWT: {
        SECRET: process.env.JWT_SECRET,
        EXPIRE: process.env.JWT_EXPIRE || '7d'
    },
    APP_PORT: process.env.APP_PORT,
    REDIS: {
        HOST: process.env.REDIS_HOST,
        PORT: process.env.REDIS_PORT
    },
    KAFKA: {
        TOPIC_PREFIX: process.env.KAFKA_PREFIX,
        CLIENT_ID: process.env.KAFKA_CLIENT_ID,
        URL: process.env.KAFKA_URL
    },
    GRAPHQL: {
        PLAYGROUND: process.env.GRAPHQL_PLAYGROUND || 1
    }
};
