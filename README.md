## A fullstack Pokemon finder app. Must require active connection to MongoDB in order for the site to function. Without this connection, the API routes will not be populated, the server side code will not execute, and the Pokemon information will not appear on the client side.
### Users must install dependencies and create a .env file with a unique MongoDB access key (MONGO_URI). Even then, full functionality may not work, as this project is still ongoing.

- Features:
  - A robust backend API, currently holding 252 Pokemon, populated through MongoDB. Available routes are:
    - /api/v1/pokemon/<pokemonName> OR <pokemonID> eg http://localhost:3000/api/v1/pokemon/bulbasaur OR http://localhost:3000/api/v1/pokemon/1
    - /api/v1/pokemon/<pokemonName>/flavor-text eg http://localhost:3000/api/v1/pokemon/bulbasaur/flavor-text
  - Basic client side functionality displaying Pokemon number, name, picture, type, description and stats.

### WORK IN PROGRESS!

![image](https://github.com/AdrianRegister/node-dex/assets/92818149/f01eff1a-5757-4894-8b9d-c31a72960f41)
![image](https://github.com/AdrianRegister/node-dex/assets/92818149/9480e1a1-ca38-42ff-b552-e5955c07d31a)
![image](https://github.com/AdrianRegister/node-dex/assets/92818149/85a9400f-542a-4967-8163-abf7b0e4ca90)

      
