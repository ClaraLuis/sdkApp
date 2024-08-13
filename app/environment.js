var _Environments = {
  production: {
    // BASE_URL: "https://www.tabex.clinic/mobapi/patientapp",
    // API_KEY: "123",
    // INST_ID: "123469",
    // IMGS_URL: "https://www.tabex.clinic/",
  },
  // staging:     {BASE_URL: '', API_KEY: ''},
  // development: {BASE_URL: '', API_KEY: ''},
};

function getEnvironment() {
  // Insert logic here to get the current platform (e.g. staging, production, etc)
  // var platform = getPlatform()

  // ...now return the correct environment
  return _Environments["production"];
}

var Environment = getEnvironment();
module.exports = Environment;
