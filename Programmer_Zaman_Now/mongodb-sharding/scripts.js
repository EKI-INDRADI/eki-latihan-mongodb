// docker compose -f docker-compose.yaml up -d

// docker container exec -it mongo-config-server1 /bin/sh
// mongo --host localhost --port 27019

rs.initiate(
    {
        _id: "rnd-config-replica-set",
        configsvr: true,
        members: [
            {
                _id: 0,
                host: "mongo-config-server1:27019"
            },
            {
                _id: 1,
                host: "mongo-config-server2:27019"
            },
            {
                _id: 2,
                host: "mongo-config-server3:27019"
            }
        ]
    }
)

// docker container exec -it mongo-first-shard1 /bin/sh
// mongo --host localhost --port 27018

rs.initiate(
    {
        _id: "rnd-first-shard-replica-set",
        members: [
            {_id: 0, host: "mongo-first-shard1:27018"},
            {_id: 1, host: "mongo-first-shard2:27018"},
            {_id: 2, host: "mongo-first-shard3:27018"}
        ]
    }
)

// docker container exec -it mongo-second-shard1 /bin/sh
// mongo --host localhost --port 27018

rs.initiate(
    {
        _id: "rnd-second-shard-replica-set",
        members: [
            {_id: 0, host: "mongo-second-shard1:27018"},
            {_id: 1, host: "mongo-second-shard2:27018"},
            {_id: 2, host: "mongo-second-shard3:27018"}
        ]
    }
)

// docker container exec -it mongo-third-shard1 /bin/sh
// mongo --host localhost --port 27018

rs.initiate(
    {
        _id: "rnd-third-shard-replica-set",
        members: [
            {_id: 0, host: "mongo-third-shard1:27018"},
            {_id: 1, host: "mongo-third-shard2:27018"},
            {_id: 2, host: "mongo-third-shard3:27018"}
        ]
    }
)

// docker container exec -it mongo-client /bin/sh
// mongo --host localhost --port 27017

sh.addShard("rnd-first-shard-replica-set/mongo-first-shard1:27018,mongo-first-shard2:27018,mongo-first-shard3:27018")
sh.addShard("rnd-second-shard-replica-set/mongo-second-shard1:27018,mongo-second-shard2:27018,mongo-second-shard3:27018")
sh.addShard("rnd-third-shard-replica-set/mongo-third-shard1:27018,mongo-third-shard2:27018,mongo-third-shard3:27018")

sh.enableSharding("belajar")
sh.shardCollection("belajar.orders", {"userId": "hashed"})

// docker container exec -it mongo-first-shard1 /bin/sh
// mongo --host localhost --port 27018

// docker container exec -it mongo-second-shard1 /bin/sh
// mongo --host localhost --port 27018

// docker container exec -it mongo-third-shard1 /bin/sh
// mongo --host localhost --port 27018

// docker container stop mongo-third-shard1
// docker container stop mongo-third-shard2
// docker container stop mongo-third-shard3
// docker container start mongo-third-shard1 mongo-third-shard2 mongo-third-shard3

// docker compose -f docker-compose.yaml down

