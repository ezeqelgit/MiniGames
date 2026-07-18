import store from "../../scripts/store"
import router from "../../scripts/router"
import { MatrixData, Reward, SpecsData } from "./types/Hacking";

const registerEvent = (eventName: string, callback: (...args: any[]) => void) => {
  if (window.mp?.events?.add) {
    window.mp.events.add(eventName, callback);
  }
};

registerEvent("CEF:SERVER:GameHacking:Show", () => {
  if (router.currentRoute.value.name === 'Signaling') return; 
  router.push({ name: 'Signaling' });
});

store.commit('loadHackingDataFromApi');

registerEvent("CEF:SERVER:GameHacking:MatrixData", (json: string) => {
  const payload: MatrixData = JSON.parse(json);
  store.commit('setMatrixData', payload);
});

registerEvent("CEF:SERVER:GameHacking:SpecsData", (json: string) => {
  const payload: SpecsData = JSON.parse(json);
  store.commit('setSpecsData', payload);
});

registerEvent("CEF:SERVER:GameHacking:ListRewards", (json: string) => {
  const payload: Reward[] = JSON.parse(json);
  store.commit('setListRewards', payload);
});