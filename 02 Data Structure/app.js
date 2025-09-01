import { createClient } from 'redis';

const client = createClient({
    url: 'redis://127.0.0.1:6379'
});

client.on('error', (err) => console.log('Redis Client Error:', err));

const runRedis = async () => {
    try {
        await client.connect();
        console.log('Connected to Redis');

        //? SET 
        await client.set('user:name', 'Akkal Dhami');

        //? GET 
        const name = await client.get('user:name');
        console.log("name: ", name);

        //? MSET
        await client.mSet({
            'user:age': '20',
            'user:country': 'Nepal'
        });

        //? MGET
        const [username, age, country] = await client.mGet(['user:name', 'user:age', 'user:country']);
        console.log(`Name: ${username}, Age: ${age}, Country: ${country}`);


        //? LPUSH
        await client.lPush('tasks', 'Task 1');
        // await client.lPush('tasks', ['Task 2', 'Task 3']);

        //? RPUSH
        await client.rPush('tasks', 'Task 4');

        //? LPOP
        await client.lPop('tasks');

        //? RPOP
        await client.rPop('tasks');

        //? LRANGE
        const tasks = await client.lRange('tasks', 0, -1);
        console.log('Tasks:', tasks);


        //? SADD
        await client.sAdd('fruits', 'Apple');
        await client.sAdd('fruits', ['Banana', 'Orange', 'Mango']);

        //? SMEMBERS
        const fruits = await client.sMembers("fruits");
        console.log('Fruits:', fruits);

        //? SISMEMBER
        const isMember = await client.sIsMember('fruits', 'Banana');
        console.log('Is Banana a member of fruits set?', isMember);

        //? SREM
        await client.sRem('fruits', 'Orange');
        const updatedFruits = await client.sMembers('fruits');
        console.log('Updated Fruits:', updatedFruits);

    } catch (error) {
        console.error('Error connecting to Redis:', error);
    } finally {
        await client.quit();
    }
};

runRedis();
