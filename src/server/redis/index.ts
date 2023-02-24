import { createClient } from 'redis';
import { env } from '~/env.mjs';


const REDISHOST = env.REDIS_HOST;
const REDISPORT = env.REDIS_PORT;

const client = createClient({ url: `redis://${REDISHOST}:${REDISPORT}` });
client.connect();



export const getRedisString = async (key: string) => {
    try {
        const value = await client.get(key);
        if (value === null) {
            return undefined;
        }
        return value;
    } catch (error) {
        return undefined
    }
}




export const setRedis = async (key: string, value: string) => {

        await client.set(key, value, {

        });
   

}
