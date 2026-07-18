import store from "../../scripts/store"
import router from "../../scripts/router"
import { Timer, Wires } from "./types/Signaling"

const registerEvent = (eventName: string, callback: (...args: any[]) => void) => {
  if (window.mp?.events?.add) {
    window.mp.events.add(eventName, callback);
  }
};

registerEvent("CEF:SERVER:GameSignaling:Show", () => {
  if (router.currentRoute.value.name === 'Signaling') return; 
  router.push({ name: 'Signaling' });
});

registerEvent("CEF:SERVER:GetWires", (json: string) => {
  const payload: Wires = JSON.parse(json);
  store.commit('setWires', payload);
});

registerEvent("CEF:SERVER:GameSignaling:Timer", (json: string) => {
  const payload: Timer = JSON.parse(json);
  store.commit('setTimer', payload);
});