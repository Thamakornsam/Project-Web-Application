const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const uri = 'mongodb://localhost:27017';
const dbName = 'movie_booking';
const jwt = require('jsonwebtoken');


//Create new user
exports.createUser =  async (req, res) => {

  //Get data from the request body
  const {email,password,firstName,lastName} = req.body;
  try {

    //Connect database
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    
    //Check for duplicate email
    const same_email = await db.collection('users').findOne({email:email});
    if (same_email){
      return res.status(409).json({message:"Email is used!!"});
    }

    //Encrypt the password
    const hashedPassword = bcrypt.hashSync(password, 10)

    //Get the current size of the collection to determine the latest ID
    const current_user = await db.collection('users').findOne({},{ sort: { _id: -1 }});
    const new_id = current_user ?  current_user.user_id +1 : 1

    //The user data to be stored.
    const info = {
      user_id : new_id,
      user_firstName : firstName,
      user_lastName : lastName,
      email : email,
      password : hashedPassword,
      
    }

    //Add the user data (info) in collection users 
    await db.collection('users').insertOne(info)
    return res.status(200).json({message:"Register Success!!!"})

  } catch (err) {
    return res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
}

//Find user in collection users for log in
exports.findUserByEmailAndPassword = async (req, res) => {

  //Get data from the request body
  const {email, password } = req.body;
  try {

    //Connect database
    const client = new MongoClient(uri);
    await client.connect();

    //Check user by email
    const user = await client.db(dbName).collection('users').findOne({ email: email });

    //If the user does not exist or the password is incorrect
    if(!user || !(await bcrypt.compare(password, user.password))){
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    //If find user and corrected password, generate a JWT token using the user's data 
    //and sign it with the secret key (jwtSecret) and send it back .
    const token = jwt.sign({
      user_id: user.user_id,
      user_firstName: user.user_firstName,
      user_lastName: user.user_lastName,
      email: user.email
    }, "jwtSecret")

    return res.status(200).json({auth: true, token : token})

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }finally {
    await client.close();
  }
};
