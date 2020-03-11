const { ApolloServer, gql } = require("apollo-server");

const dataGet= require("./functions/data");

const planetSave = require("./planetsdao/PlanetsDAO");

dataGet()
.then(data=>{

 const typeDefs = gql`

   scalar ANY
   scalar Double

   type Exoplanet {
     count: Int
     next: String
     previous: String
     results: [ANY]
   }

   type Planet{
      name: String
      value: Double
      unit: String
      error_max: Double
      error_min: Double
      bibcode: String
   }

   type Query {
     suitablePlanets: Exoplanet
   }

   type Mutation {

     installStation(name: String!): Planet

   }

 `;

 const resolvers = {

   Query: {

     suitablePlanets() {

       return data;

     }

   },

   Mutation: {

     async installStation(name,args){
      
      let plane={};

      if(data!=null){

        let plan = data.results.find(res=> res.name === args.name);

        if (plan == undefined) return null;

          let planet = {
          name:plan.name,
          value:plan.mass.value,
          unit:plan.mass.unit,
          error_max:plan.mass.error_max,
          error_min:plan.mass.error_min,
          bibcode:plan.mass.bibcode
        }

         await planetSave(planet)
          .then(p=>{
            plane = p;

          });
          
      }

      return plane;

     }

   }

 };

 const server = new ApolloServer({
   typeDefs,
   resolvers
 });
  

 server.listen().then(({ url }) => {
   console.log(`Executando em ${url}`);
 });


});






