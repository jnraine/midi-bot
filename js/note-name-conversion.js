var keyByValue = function(object, value) {
    for(var prop in object) {
        if(object.hasOwnProperty(prop)) {
             if(object[prop] === value) {
                 return prop;
             }
        }
    }
};

var noteNameToMidiProgramNumber = function(noteName) {
    return keyByValue(programNumberNoteMap(), noteName);
};

var noteNameFromMidiProgramNumber = function(midiProgramNumber) {
    return programNumberNoteMap()[midiProgramNumber];
}

var programNumberNoteMap = function() {
    var noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    var octave = -2;

    var map = {}
    for(var programNumber = 0; programNumber < 128; programNumber++) {
        map[programNumber] = noteNames[programNumber % noteNames.length] + octave

        if(programNumber !== 0 && (programNumber % (noteNames.length - 1)) === 0) {
            octave++;
        }
    }

    return map;
};