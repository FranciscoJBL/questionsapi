import UserEvent from "./UserEvent";

/**
 * The position in the resolution tree.
 */
export interface TreePosition {
    completedPositions: number,
    userEvents: Array<UserEvent>
};

export default TreePosition;