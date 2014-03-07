var timelineBankToMidiProgramNumber = function(preset) {
	var bankNumber = preset.match(/(\d+)/)[1];
	var bankLetter = preset.match(/(A|B)$/)[1];
	var midiProgramNumber = parseInt(bankNumber) * 2;
	if(bankLetter == "B") {
		midiProgramNumber++;
	}

	return midiProgramNumber;
}

var timelineBankFromMidiProgramNumber = function(midiProgramNumber) {
	var bankNumber = Math.round(midiProgramNumber / 2 - 0.1);
	var bankLetter = (midiProgramNumber % 2 == 0) ? "A" : "B";
	return bankNumber + bankLetter;
}

var bigSkyBankToMidiProgramNumber = function(preset) {
	var bankNumber = preset.match(/(\d+)/)[1];
	var bankLetter = preset.match(/(A|B|C)$/)[1];
	var midiProgramNumber = parseInt(bankNumber) * 3;
	if(bankLetter == "B") {
		midiProgramNumber += 1;
	} else if(bankLetter == "C") {
		midiProgramNumber += 2;
	}

	return midiProgramNumber;
}

var bigSkyBankFromMidiProgramNumber = function(midiProgramNumber) {
	var bankNumber = Math.round(midiProgramNumber / 3 - 0.1);
	var bankLetter = "A";

	if(midiProgramNumber % 3 == 1) {
		bankLetter = "B";
	} else if(midiProgramNumber % 3 == 2) {
		bankLetter = "C";
	}

	return bankNumber + bankLetter;
}

// Pitchfactor snuck in here too
var pitchFactorBankToMidiProgramNumber = function(preset) {
	var bankNumber = preset.match(/(\d+)/)[1];
	var bankLetter = preset.match(/(A|B)$/)[1];
	var midiProgramNumber = parseInt(bankNumber) * 2;
	if(bankLetter == "B") {
		midiProgramNumber++;
	}

	return midiProgramNumber - 2;
}

var pitchFactorBankFromMidiProgramNumber = function(midiProgramNumber) {
	var bankNumber = Math.round((midiProgramNumber+2) / 2 - 0.1);
	var bankLetter = (midiProgramNumber % 2 == 0) ? "A" : "B";
	return bankNumber + bankLetter;
}