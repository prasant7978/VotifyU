const COLORS = {
    primary: '#158EC2',
    secondary: '#17B1A4',
    tertiary: '#2B768F',

    darkGray: "#808080",
    lightGray: "#CCD3CA",

    boneWhite: "#f9f6ee",
    snowWhite: "#fffafa",
    antifleshWhite: "#fafafa",
    ivoryWhite: "#fffff0",
    coffeeWhite: "#e9e3d5",
    coolWhite: "#EEF7FF",

    slateShadow: "#101415",
    earthlyMocha: "#110904",
    velvetAubergine: "#190b14",
    chocolateNoir: "#262020",
    midnightSapphire: "#0b1623",
    forestShadow: "#0e1514",

    lime: "#c8f560",

    red: "#FE0000",

    darkBeach: "#4FACFE",
    lightBeach: "#00f2fe",

    darkLove: "#ff0844",
    lightLove: "#ffb199",

    darkEarth: "#94716b",
    lightEarth: "#b79891",

    darkSkyLine: "#2b32b2",
    lightSkyLine: "#1488cc",

    darkMojito: "#1d976c",
    lightMojito: "#93f9b9",

    darkMango: "#ffa751",
    lightMango: "#ffe259",

    darkYellow: "#FFC100",

    lightGold: "#FFEC9E"
};

const SIZES = {
    xSmall: 10,
    small: 12,
    medium: 16,
    large: 20,
    xLarge: 24,
    xxLarge: 30,
    xxxLarge: 44,
};

const SHADOWS = {
    small: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 5.84,
      elevation: 5,
    },
  };

  // const imageUri = 'https://votifyu.onrender.com/api/uploads'
  const imageUri = 'http://192.168.93.221:3001/api/uploads'

  export {COLORS, SIZES, SHADOWS, imageUri};