import { Middleware } from "redux";

type TEpicFunction = <TStore>(payload: any, state: TStore) => void;

export function createEpicMiddleware<TStore>(
  epics: Record<string, Record<string, TEpicFunction>>
): Middleware {
  function runEpicFunction(
    epicFunction: TEpicFunction,
    action: { type: string; payload: any },
    state: TStore
  ) {
    epicFunction(action.payload, state);
  }

  const runEpic = (action: { type: string; payload: any }, state: TStore) => {
    for (const localEpics of Object.values(epics)) {
      for (const [epicActionType, epicFunction] of Object.entries(localEpics)) {
        if (action.type === epicActionType) {
          runEpicFunction(epicFunction, action, state);
        }
      }
    }
  };

  return (store) => (next) => (action) => {
    next(action);
    runEpic(action, store.getState());
  };
}
