var keyByValue = function(object, value) {
    for(var prop in object) {
        if(object.hasOwnProperty(prop)) {
             if(object[prop] === value) {
                 return prop;
             }
        }
    }
};

var Field = function(options) {
    var name = options.name;
    var toMidiProgramNumber = options.toMidiProgramNumber;
    var fromMidiProgramNumber = options.fromMidiProgramNumber;
    var $inputEl = $("form").first().find("#" + options.id);
    var midiBot = options.midiBot;

    this.update = function(midiProgramNumber) {
        var newValue = fromMidiProgramNumber(midiProgramNumber);
        $inputEl.val(newValue);
    };

    // 
    // Attach events to input element
    // 
    $inputEl.keyup(function() {
        var $inputEl = $(this);
        var midiProgramNumber = toMidiProgramNumber($inputEl.val());
        midiBot.updateMidiProgramNumber(midiProgramNumber);
        // then MIDI bot tells rest of fields about it
    })
};

var MidiBot = function() {
    // // 
    // // Public API
    // //
    // this.update = function(fieldName, value) {
    //     var newMidiProgramNumber = value;

    //     for(var name in names) {
    //         field
    //     }

    //     switch(fieldName) {
    //         case names.noteName:
    //             var newMidiProgramNumber = convertNoteName(value);
    //             updateMidiProgramNumber(newMidiProgramNumber);
    //             break;
    //         case names.midiProgramNumber:
    //             // no op
    //             break;
    //     }

    //     updateMidiProgramNumber(newMidiProgramNumber);
    // };


    // var names = {
    //     noteName: "note-name",
    //     midiProgramNumber: "midi-program-number",
    //     logicProgramNumber: "logic-program-number",
    //     abletonProgramNumber: "ableton-program-number"
    // };

    var self = this;

    var fields = [];

    this.addField = function(options) {
        $.extend(options, {midiBot: self});

        var field = new Field(options);
        fields.push(field);

        return self;
    };

    // Store canonical MIDI program number
    var midiProgramNumber = 0;
    this.midiProgramNumber = function () { 
        return midiProgramNumber;
    }

    var updateMidiProgramNumber = function(midiProgramNumber) {
        midiProgramNumber = parseInt(midiProgramNumber);
        updateFields();
    }
    this.updateMidiProgramNumber = updateMidiProgramNumber;

    var updateFields = function() {
        $.each(fields, function(i, field) {
            field.update(midiProgramNumber);  
        });
    }

    // var $midiProgramNumberField = field(names.midiProgramNumber);
    // var $noteNameField = field(names.noteName);
    // var $logicProgramNumberField = field(names.logicProgramNumber);
    // var $abletonProgramNumberField = field(names.abletonProgramNumber);

    // // 
    // // Public API
    // // 
    // this.update = function(fieldName, value) {
    //     var newMidiProgramNumber = value;

    //     for(var name in names) {
    //         field
    //     }

    //     switch(fieldName) {
    //         case names.noteName:
    //             var newMidiProgramNumber = convertNoteName(value);
    //             updateMidiProgramNumber(newMidiProgramNumber);
    //             break;
    //         case names.midiProgramNumber:
    //             // no op
    //             break;
    //     }

    //     updateMidiProgramNumber(newMidiProgramNumber);
    // };

    //
    // Important internals
    //

    // // 
    // // Note Name
    // // 
    // var updateNoteName = function() {
    //     var noteName = programNumberNoteMap()[midiProgramNumber()];
    //     $noteNameField.val(noteName);
    // }

    // var convertNoteName = function(noteName) {
    //     return keyByValue(programNumberNoteMap(), noteName);
    // };

    // var programNumberNoteMap = function() {
    //     var noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    //     var octave = -2;

    //     var map = {}
    //     for(var programNumber = 0; programNumber < 128; programNumber++) {
    //         map[programNumber] = noteNames[programNumber % noteNames.length] + octave

    //         if(programNumber !== 0 && (programNumber % (noteNames.length - 1)) === 0) {
    //             octave++;
    //         }
    //     }

    //     return map;
    // };

    // // 
    // // Logic Program Number
    // // 
    // var updateLogicProgramNumber = function() {
    //     $logicProgramNumberField.val(midiProgramNumber());
    // };

    // var convertLogicProgramNumber = function() {
    //     return $logicProgramNumberField.val();
    // };

    // // 
    // // Ableton Program Number
    // // 
    // var updateAbletonProgramNumber = function() {
    //     $abletonProgramNumberField.val(midiProgramNumber() + 1);
    // };

    // var convertAbletonProgramNumber = function() {
    //     return parseInt($abletonProgramNumberField.val()) - 1;
    // };
};

var midiBot = new MidiBot();

midiBot
    .addField({
        id: "midi-program-number",
        fromMidiProgramNumber: function(value) { return value; },
        toMidiProgramNumber:   function(value) { return value; }
    })
    .addField({
        id: "ableton-program-number",
        toMidiProgramNumber: function(value) {
            return parseInt(value) + 1;
        },
        fromMidiProgramNumber: function(midiProgramNumber) {
            return midiProgramNumber - 1;
        }
    });

// Convert MIDI program number to/from:
// - Logic program number (no change)
// - Ableton program number (plus 1)
// - Timeline bank number (/2 then A if no remainder, B if remainder)
// - BigSky bank number (/3 then A if no remainder, B if remainder 1, C if remainder 2)
// - Moog preset number (plus 1)
// - Prophet prset number (plus 1)
// - SPACE preset number (plus 1)
// - H9 preset number (plus 1)
// - Pitchfacter bank number (minus 1 if even add "A", minus 2 if odd, add "B")
// - Voicelive preset number (plus 1)
// - Note Name (complex mapping)

// 1A = 0, 1B = 1, 2A = 2, 2B = 3, 3A = 4, 3B = 5