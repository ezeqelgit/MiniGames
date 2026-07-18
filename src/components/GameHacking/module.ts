import { Module } from "vuex"
import { Hacking, MatrixData, Reward, SpecsData } from "./types/Hacking"
import { MatrixComplexity } from "./types/MatrixComplexity";
import { getGames } from "../../utils/ApiService";

const defaultState = {
  matrixData: {
    matrixSize: 0,
    matrixComplexity: MatrixComplexity.levelThree,
  },
  specsData: {
    time: 0,
    bufferSize: 0
  },
  listRewards: [] as Reward[],
};

const Hacking: Module<Hacking, unknown> = ({
  state: defaultState,
  getters: {
    getMatrixData: (state) => state.matrixData,
    getSpecsData: (state) => state.specsData,
    getListRewards: (state) => state.listRewards,
  },
  mutations: {
    setMatrixData(state, payload: MatrixData) {
      state.matrixData = payload
    },
    setSpecsData(state, payload: SpecsData) {
      state.specsData = payload
    },
    setListRewards(state, payload: Reward[]) {
      state.listRewards = payload
    },
    loadHackingDataFromApi(state) {
      getGames().then((response) => {
        if (response.success && response.data) {
          const games = Array.isArray(response.data.games) ? response.data.games : [];
          const hackingGame = games.find((game: any) => game.name === "Hacking");

          if (hackingGame?.config) {
            state.matrixData = {
              matrixSize: hackingGame.config.matrixSize,
              matrixComplexity: hackingGame.config.matrixComplexity,
            };
            state.specsData = {
              time: hackingGame.config.time,
              bufferSize: hackingGame.config.bufferSize,
            };
            state.listRewards = hackingGame.config.rewards || [];
          }
        }
      });
    },
  },
});

export default Hacking;