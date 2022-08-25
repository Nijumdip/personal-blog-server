const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kcxjzr5.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() { 
      try {
        await client.connect();
        // console.log('database connected');
        const blogCollection = client.db('personal_blog').collection('blogs');
        const categoryCollection = client.db('personal_blog').collection('categories');
        const adminsCollection = client.db('personal_blog').collection('admins');

        // data load get method ----------------

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

        app.get('/admin/:email', async (req, res) => {
          const email = req.params.email;
          // adminEmail:abc@bcb.com
          // console.log(email);
          const query = { adminEmail:email };
          // console.log(query);
          const cursor = await adminsCollection.findOne(query);
          // console.log(cursor);
          res.send(cursor)
        })

        app.get('/blogDetail/:id', async (req, res) => {
          const id = req.params.id;
          // console.log(id);
          const query = { _id: ObjectId(id) }; 
          // console.log(query);
          const cursor = await blogCollection.findOne(query);
          // console.log(cursor);
          res.send(cursor);
        })

        // get method ----------------


        // post method ----------------

        app.post('/category', async (req, res) => {
          const category = req.body;
          // console.log(category);
          const cursor = await categoryCollection.insertOne(category);
          res.send(cursor);
        })

        app.post('/admin', async (req, res) => {
          const admin = req.body;
          // console.log(admin);
          const cursor = await adminsCollection.insertOne(admin);
          res.send(cursor);
        })

        app.post('/api/blog', async (req, res) => {
          const content = req.body;
          // console.log(content);
          const cursor = await blogCollection.insertOne(content);
          res.send(cursor);
          console.log(cursor);
        })
        
        // post method ----------------




      }

    finally {
        //   client.close();
    }
}

run().catch(console.dir);















app.get('/', (req, res) => {
  res.send('Personal Blog!')
})

app.listen(port, () => {
  console.log(`Personal blog listening on port ${port}`)
})