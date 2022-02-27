const KEY = "state";

export function loadState() {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return undefined;
    // console.log("loading done");
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

export async function saveState(state: any) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);
    // console.log("saving done");
  } catch (e) {
    // Ignore
  }
}
