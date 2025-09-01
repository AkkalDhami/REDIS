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


        //? ZADD
        await client.zAdd('leaderboard', [
            { score: 100, value: 'Player1' },
            { score: 200, value: 'Player2' },
            { score: 150, value: 'Player3' },
            { score: 250, value: 'Player4' }
        ]);

        //? ZRANGE
        const topPlayers = await client.zRange('leaderboard', 0, 2);
        console.log('Top 3 Players:', topPlayers);

        //? ZRANGE with scores
        const topPlayersWithScores = await client.zRangeWithScores('leaderboard', 0, -1);
        console.log('Top 3 Players with Scores:', topPlayersWithScores);

        //? ZRANK
        const rank = await client.zRank('leaderboard', 'Player4');
        console.log('Rank of Player3:', rank);


        //? HSET
        await client.hSet('user:1', {
            name: 'Akkal Dhami',
            age: '20',
            country: 'Nepal'
        });

        //? HGET
        const userName = await client.hGet('user:1', 'name');
        console.log('User Name:', userName);

        //? HGETALL
        const user = await client.hGetAll('user:1');
        console.log('User:', user);

        //? HDEL
        await client.hDel('user:1', 'country');
        const updatedUser = await client.hGetAll('user:1');
        console.log('Updated User:', updatedUser);

    } catch (error) {
        console.error('Error connecting to Redis:', error);
    } finally {
        await client.quit();
    }
};

runRedis();