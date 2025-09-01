import { createClient } from 'redis';

const client = createClient({
    url: 'redis://127.0.0.1:6379'
});

client.on('error', (err) => console.log('Redis Client Error:', err));

const runRedis = async () => {
    try {
        await client.connect();
        console.log('Connected to Redis');

        //? SET and GET example
        await client.set('name', 'John Doe');
        const value = await client.get('name');
        console.log('Value for "name":', value);

        //? DELETE example
        const deleteCount = client.del("name");
        console.log('Deleted keys count:', await deleteCount);

    } catch (error) {
        console.error('Error connecting to Redis:', error);
    } finally {
        await client.quit();
    }
};

runRedis();
