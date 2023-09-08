import { Middleware } from "redux";

type TEpicFunction = <TStore>(state: TStore, payload: any) => void;

export function createEpicMiddleware<TStore>(
  epics: Record<string, TEpicFunction>
): Middleware {
  const runEpic = (state: TStore, action: { type: string; payload: any }) => {
    for (const [epicActionType, epicFunction] of Object.entries(epics)) {
      if (action.type === epicActionType) {
        epicFunction(state, action.payload);
      }
    }
  };

  return (store) => (next) => (action) => {
    next(action);
    runEpic(store.getState(), action);
  };
}
