const keywords = {
    boost: 'BOOST',
    shield: 'SHIELD'
}

const limits = {
    MAX_X: 16000,
    MAX_Y: 9000,
    MAX_THRUST: 100,
    MAX_DISTANCE: 18358
}

const state = {
    player: {
        position: {
            x: 0,
            y: 0
        },
        distanceToCheckpoint: {
            initial: 0,
            current: 0,
            previous: 0
        },
        angleToCheckpoint: {
            current: 0,
            previous: 0
        },
        boostCount: 1
    },
    opponent: {
        position: {
            x: 0,
            y: 0
        },
        distanceToPlayer: {
            current: 0,
            previous: 0
        }
    },
    nextCheckpointPosition: {
        x: 0,
        y: 0
    }
}

while (true) {
    let inputs = readline().split(' ').concat(readline().split(' '));
    updateState(inputs);

    let thrust = getThrust();
    if (shouldBoost(thrust)) {
        thrust = keywords.boost;
        state.player.boostCount -= 1;
    }
    console.log(state.nextCheckpointPosition.x + ' ' + state.nextCheckpointPosition.y + ' ' + thrust);
}

function updatePlayerPosition(x, y) {
    state.player.position.x = x;
    state.player.position.y = y;
}

function updateNextCheckpointPosition(x, y) {
    state.nextCheckpointPosition.x = x;
    state.nextCheckpointPosition.y = y;
}

function updateOpponentPosition(x, y) {
    state.opponent.position.x = x;
    state.opponent.position.y = y;
    state.opponent.distanceToPlayer.previous = state.opponent.distanceToPlayer.current;
    state.opponent.distanceToPlayer.current = getDistanceBetweenPositions(state.player.position, state.opponent.position)
}

function updateDistanceToCheckpoint(currentDistance) {
    state.player.distanceToCheckpoint.previous = state.player.distanceToCheckpoint.current;
    state.player.distanceToCheckpoint.current = currentDistance;
    if (currentDistance > state.player.distanceToCheckpoint.previous) {
        state.player.distanceToCheckpoint.initial = currentDistance;
    }
}

function updateAngleToCheckpoint(currentAngle) {
    state.player.angleToCheckpoint.previous = state.player.angleToCheckpoint.current;
    state.player.angleToCheckpoint.current = currentAngle;
}

function updateState(inputs) {
    updatePlayerPosition(parseInt(inputs[0]), parseInt(inputs[1]));
    updateNextCheckpointPosition(parseInt(inputs[2]), parseInt(inputs[3]));
    updateDistanceToCheckpoint(parseInt(inputs[4]));
    updateAngleToCheckpoint(parseInt(inputs[5]));
    updateOpponentPosition(parseInt(inputs[6]), parseInt(inputs[7]));
}

function isAtFullThrust(thrust) {
    return thrust === limits.MAX_THRUST;
}

function isFarFromCheckpoint() {
    return state.player.distanceToCheckpoint.current > limits.MAX_DISTANCE * 0.25;
}

function isBoostAvailable() {
    return state.player.boostCount > 0;
}

function shouldBoost(thrust) {
    return isAtFullThrust(thrust) && isFarFromCheckpoint(state.player.distanceToCheckpoint.current) && isBoostAvailable();
}

function shouldShield() {
    if (state.opponent.distanceToPlayer.previous > state.opponent.distanceToPlayer.current) {
        return state.opponent.distanceToPlayer.current <= 925;
    }
    return false;
}

function getDistanceBetweenPositions(position1, position2) {
    return Math.sqrt(Math.pow(position1.x - position2.x, 2) + Math.pow(position1.y - position2.y, 2))
}

function getThrust() {
    let finalThrust = limits.MAX_THRUST;
    const absoluteAngle = Math.abs(state.player.angleToCheckpoint.current);
    if (absoluteAngle > limits.MAX_THRUST) {
        finalThrust = 0;
    } else {
        finalThrust -= absoluteAngle;
    }

    if (state.player.distanceToCheckpoint.current < 0.33 * state.player.distanceToCheckpoint.initial) {
        finalThrust -= state.player.distanceToCheckpoint.current / 50;
    }

    return finalThrust > 0 ? Math.round(finalThrust) : 0;
}

function debug(output) {
    console.error(output);
}
