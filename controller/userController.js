import User from "../model/user-schema.js";

export const userSignup = async(req, res)=>{

try {

const exist = await User.findOne({username: req.body.username});
if(exist){
    return res.status(401).json({message: 'Username already exist'})
}

  const user = req.body;
  const newUser = new User(user);
  await newUser.save();

  res.status(200).json({message: user})
    
} catch (error) {
    res.status(500).json({message: error.message})
}

}



export const userLogIn = async (request, response) => {
  try {
      let user = await User.findOne({ username: request.body.username, password: request.body.password });
      if(user) {
          return response.status(200).json({data: user});
      } else {
          return response.status(401).json('Invalid Login');
      }

  } catch (error) {
      response.json('Error: ', error.message);   
           
  }
}