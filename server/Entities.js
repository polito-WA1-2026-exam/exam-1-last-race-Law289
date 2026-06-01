function Station ({
    id,
    name
}) {
    this.id = id;
    this.name = name;
}

function Line ({
    id,
    name,
    stations = [],
    color = undefined
}) {
    this.id = id;
    this.name = name;
    this.stations = stations;
    this.color = color;

    this.addStation = function(station, position = this.stations.length) {
        if (this.stations.some(s => s.name === station.name)) {
            return false;
        }
        if (position < 0 || position > this.stations.length) {
            position = this.stations.length;
        }

        this.stations.splice(position, 0, station);
        return true;
    }
}

function Connection ({
    stationA,
    stationB,
    line
}) {
    this.stationA = stationA;
    this.stationB = stationB;
    this.line = line;
}

export {Station, Line, Connection};