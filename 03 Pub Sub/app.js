


import { createClient } from 'redis';

const client = createClient({
    url: 'redis://127.0.0.1:6379'
});

client.on('error', (err) => console.log('Redis Client Error:', err));

const runRedis = async () => {
    try {
        await client.connect();
        console.log('Connected to Redis');

        const subscriber = client.duplicate(); // Create a duplicate client for subscribing
        await subscriber.connect(); // Connect the subscriber client

        await subscriber.subscribe('news', (message, channel) => {
            console.log('Received message on channel:', channel, message);
        });

        // Publisher example
        await client.publish('news', 'Hello, this is a news update!');
        await client.publish('news', 'Another news update!');


        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds to receive messages

        await subscriber.unsubscribe('news');
        await subscriber.quit(); // Disconnect the subscriber client
        console.log('Subscriber disconnected');



    } catch (error) {
        console.error('Error connecting to Redis:', error);
    } finally {
        await client.quit();
    }
};

runRedis();
