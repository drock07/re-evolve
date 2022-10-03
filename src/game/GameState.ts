import Stage, { type StageValues } from "./Types/Stages";
import { ResourceState } from "./Types/Resources";

interface GameState {
  stage: StageValues;
  resources: {
    [Stage.Protoplasm]?: {
      RNA: ResourceState;
      DNA: ResourceState;
    };
  };
}

export type { GameState };
