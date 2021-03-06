import axios from "axios";

export default class LiveCardService {
  constructor() {
    this.baseURL = "https://localhost:5001/api";
  }

  useFilter(cards, colors) {
    if (colors.length <= 0) {
      return cards;
    }
    let cardsToReturn = [];
    cards.map((card) => {
      for (let c1 = 0; c1 < card.colorIdentity.length; c1++) {
        for (let c2 = 0; c2 < colors.length; c2++) {
          if (card.colorIdentity[c1] === colors[c2]) {
            cardsToReturn.push(card);
            return;
          }
        }
      }
    });
    return cardsToReturn;
  }

  async getOtherPrints(oracleId) {
    const prints = [];
    await axios
      .get(`https://localhost:5001/api/Card/${oracleId}/prints`)
      .then((cards) => {
        cards.data.map((card) => prints.push(card));
      });
    return prints;
  }

  search(title, colors) {
    const escapedTitle = encodeURIComponent(title);
    return axios
      .get(
        `https://localhost:5001/api/Search/card?q=${escapedTitle}&colors=${colors.join(
          ","
        )}`
      )
      .then((response) => {
        if (response.status === 400) {
          return null;
        }
        return response.data;
      });
  }

  async getSymbols() {
    return await axios
      .get("https://localhost:5001/api/symbology/symbols")
      .then((symbols) => {
        return symbols.data;
      });
  }

  async getAll(callback) {
    await axios.get("https://localhost:5001/api/Cards").then((cards) => {
      callback(cards.data);
    });
  }

  getCatalog() {
    const unwrap = (response) => {
      return response.data.data;
    };

    const getRequest = async (endpoint) => {
      const response = await axios.get(
        "https://api.scryfall.com/catalog" + endpoint
      );
      return unwrap(response);
    };

    return {
      forArtifacts: () => {
        return getRequest("/artifact-types");
      },
      forEnchantments: () => {
        return getRequest("/enchantment-types");
      },
      forLands: () => {
        return getRequest("/land-types");
      },
      forSpells: () => {
        return getRequest("/spell-types");
      },
      forPlaneswalkers: () => {
        return getRequest("/planeswalker-types");
      },
      forCreatures: () => {
        return getRequest("/creature-types");
      },
      forArtistNames: () => {
        return getRequest("/artist-names");
      },
    };
  }

  advancedSearch(name, colors, types, price, artists) {
    return axios
      .post(`${this.baseURL}/search/advanced`, {
        cardName: name,
        colors: colors,
        types: types,
        minPrice: parseFloat(price.min),
        maxPrice: parseFloat(price.max),
        artistName: artists[0] === undefined ? "" : artists[0],
      })
      .then((response) => {
        return response.data;
      });
  }

  getCardBy(id) {
    return axios
      .get(`https://localhost:5001/api/Card/byid/${id}`)
      .then((response) => response.data);
  }
}
