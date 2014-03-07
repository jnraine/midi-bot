var Field = function(options) {
    var name = options.name;
    var toMidiProgramNumber = options.toMidiProgramNumber;
    var fromMidiProgramNumber = options.fromMidiProgramNumber;
    var $inputEl = $("form").first().find("#" + options.id);
    var midiBot = options.midiBot;

    this.updateInputEl = function(midiProgramNumber) {
        var newValue = fromMidiProgramNumber(midiProgramNumber);
        $inputEl.val(newValue);
    };

    // 
    // Attach events to input element
    // 
    $inputEl.change(function() {
        var $inputEl = $(this);
        var midiProgramNumber = toMidiProgramNumber($inputEl.val());
        midiBot.updateMidiProgramNumber(midiProgramNumber);
    })
};

var MidiBot = function() {
    var self = this;
    var fields = [];

    this.addField = function(options) {
        $.extend(options, {midiBot: self});

        var field = new Field(options);
        fields.push(field);

        return self;
    };

    var midiProgramNumber = 0;

    var updateMidiProgramNumber = function(newMidiProgramNumber) {
        midiProgramNumber = parseInt(newMidiProgramNumber);
        updateFields();
    }
    this.updateMidiProgramNumber = updateMidiProgramNumber;

    var updateFields = function() {
        $.each(fields, function(i, field) {
            field.updateInputEl(midiProgramNumber);
        });
    }
};

var midiBot = new MidiBot();

midiBot
    .addField({
        id: "midi-program-number",
        fromMidiProgramNumber: function(value) { return value; },
        toMidiProgramNumber:   function(value) { return value; }
    })
    .addField({
        id: "logic-program-number",
        fromMidiProgramNumber: function(value) { return value; },
        toMidiProgramNumber:   function(value) { return value; }
    })
    .addField({
        id: "ableton-program-number",
        toMidiProgramNumber: function(value) {
            return parseInt(value) - 1;
        },
        fromMidiProgramNumber: function(midiProgramNumber) {
            return midiProgramNumber + 1;
        }
    })
    .addField({
        id: "note-name",
        toMidiProgramNumber: function(value) {
            return noteNameToMidiProgramNumber(value);
        },
        fromMidiProgramNumber: function(midiProgramNumber) {
            return noteNameFromMidiProgramNumber(midiProgramNumber);
        }
    })
    .addField({
        id: "moog-preset",
        toMidiProgramNumber: function(value) {
            return parseInt(value) - 1;
        },
        fromMidiProgramNumber: function(midiProgramNumber) {
            return midiProgramNumber + 1;
        }
    })
    .addField({
        id: "prophet-preset",
        toMidiProgramNumber: function(value) {
            return parseInt(value) - 1;
        },
        fromMidiProgramNumber: function(midiProgramNumber) {
            return midiProgramNumber + 1;
        }
    })
    .addField({
        id: "space-preset",
        toMidiProgramNumber: function(value) {
            return parseInt(value) - 1;
        },
        fromMidiProgramNumber: function(midiProgramNumber) {
            return midiProgramNumber + 1;
        }
    })
    .addField({
        id: "h9-preset",
        toMidiProgramNumber: function(value) {
            return parseInt(value) - 1;
        },
        fromMidiProgramNumber: function(midiProgramNumber) {
            return midiProgramNumber + 1;
        }
    })
    .addField({
        id: "timeline-bank",
        toMidiProgramNumber: function(value) {
            return timelineBankToMidiProgramNumber(value);
        },
        fromMidiProgramNumber: function(midiProgramNumber) {
            return timelineBankFromMidiProgramNumber(midiProgramNumber);
        }
    })
    .addField({
        id: "big-sky-bank",
        toMidiProgramNumber: function(value) {
            return bigSkyBankToMidiProgramNumber(value);
        },
        fromMidiProgramNumber: function(midiProgramNumber) {
            return bigSkyBankFromMidiProgramNumber(midiProgramNumber);
        }
    })
    .addField({
        id: "pitch-factor-bank",
        toMidiProgramNumber: function(value) {
            return pitchFactorBankToMidiProgramNumber(value);
        },
        fromMidiProgramNumber: function(midiProgramNumber) {
            return pitchFactorBankFromMidiProgramNumber(midiProgramNumber);
        }
    })
    .addField({
        id: "voice-live-preset",
        toMidiProgramNumber: function(value) {
            return parseInt(value) - 1;
        },
        fromMidiProgramNumber: function(midiProgramNumber) {
            return midiProgramNumber + 1;
        }
    });

$("#midi-program-number").val("0").change();