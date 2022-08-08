const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kcxjzr5.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() { 
      try {
        await client.connect();
        // console.log('database connected');
        const blogCollection = client.db('personal_blog').collection('blogs');
        const categoryCollection = client.db('personal_blog').collection('categories');

        // data load
        app.get('/blog', async (req, res) => {
            const query = {};
            const cursor = blogCollection.find(query);
            const blogs = await cursor.toArray();
            res.send(blogs);
        })

        app.get('/category', async (req, res) => {
          const query = {};
          const cursor = categoryCollection.find(query);
          const categories = await cursor.toArray();
          res.send(categories);
        })


      }

    finally {
        //   client.close();
    }
}

run().catch(console.dir);





































app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Personal blog listening on port ${port}`)
})