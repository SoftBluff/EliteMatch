import { createClient } from 'redis';

const client = createClient({
    password: '76T2llxNuKjl1SxIolcc05lcn9lcTgw1',
    socket: {
        host: 'redis-19240.c23738.us-east-1-mz.ec2.cloud.rlrcp.com',
        port: 19240
    }
});

client.on('connect', () => {
    console.log('Redis client connected');
}
);

client.on('error', (err) => {
    console.log(`Something went wrong ${err}`);
}
);
await client.connect();
export default client;