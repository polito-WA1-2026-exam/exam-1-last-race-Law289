function Station ({
    id,
    name
}) {
    this.id = id;
    this.name = name;

    this.print = function() {
        console.log(`(S${this.id}) Station "${this.name}"`);
    }
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

    this.print = function() {
        console.log(`(L${this.id}) ${this.color} line "${this.name}" crosses the following stations:`)
        this.stations.forEach(station => station.print())
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

    this.print = function() {
        console.log(`Connection between station ${this.stationA.name} and station ${this.stationB.name} on line ${this.line.name}`);
    }
}

export {Station, Line, Connection};