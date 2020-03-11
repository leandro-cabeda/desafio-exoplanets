const axios = require("axios").default;

const dataGet = async () => {
  let dataObj = null;
  let results = [];

  for (i = 1; i <= 10; i++) {

    await axios
      .get("https://api.arcsecond.io/exoplanets/?page=" + i)
      .then(result => {

        if (i == 1) {

          dataObj = result.data;

        } else {

          result.data.results.forEach(res => {
            dataObj.results.push(res);

          });

        }

      })
      .catch(err => {
        console.log(err);
      });

  }


  if (dataObj != null) {

    dataObj.results.forEach(e => {

      if (e.mass != null) {

        if (e.mass.value > 25) {
          results.push(e);
        }
      }

    });

    dataObj.results = results;
  }

  return dataObj;
  
};

module.exports = dataGet;
