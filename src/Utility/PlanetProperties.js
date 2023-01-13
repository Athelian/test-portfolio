import VARIABLES from "../_variables.module.sass";

// Not so elegant way of processing exported nested maps from sass
const mapPlanets = (map) => {
  return Object.keys(map).reduce((memo, key) => {
    if (!key.startsWith("planet")) return memo;
    const value = map[key];
    const values = key.split("-");
    const planet = values[1];
    const type = values[2];
    const name = values[3];
    const property = values[4];
    if (!memo[planet]) memo[planet] = {};
    if (!memo[planet][type]) memo[planet][type] = {};
    if (!memo[planet][type][name]) memo[planet][type][name] = {};
    memo[planet][type][name][property] = value;
    return memo;
  }, {});
};

export default mapPlanets(VARIABLES);
