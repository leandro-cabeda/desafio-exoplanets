const Planets = require("../database/Planets");

async function savePlanet (planet) {

   Planets.findOne({
    where: { name: planet.name }
  })
    .then(p=>{

      if( p==undefined)
      {
  
          Planets.create({
           name: planet.name,
           value: planet.value,
           unit: planet.unit,
           error_max: planet.error_max,
           error_min: planet.error_min,
           bibcode: planet.bibcode
         })
           .then(() => {
             console.log("Create!!");
           })
           .catch(err => {
             console.log(err);
             planet = null;
           });

      }
      else
      {

           Planets.update(
            {
              name: planet.name,
              value: planet.value,
              unit: planet.unit,
              error_max: planet.error_max,
              error_min: planet.error_min,
              bibcode: planet.bibcode
            },
            {
              where: { id : p.id }
            }
          )
          .then(() => {
            console.log("Update!!");
          })
          .catch(err => {
              console.log(err);
              planet = null;
          });

      }

    }).catch(err => {
      console.log(err);
      planet = null;
    });

    return planet;

}

module.exports = savePlanet;
