// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//Creates a 'P. aequor' simulated object:
const pAequorFactory = (specimenNum) => {
  return {
    specimenNum,
    dna: mockUpStrand(),

    //Mutate method changes one base in orginal DNA
    mutate() {
      const randNum = Math.floor(Math.random() * 15);
      this.dna.splice(randNum, 1, returnRandBase());
      return this.dna;
    },

    //Compare method compares this DNA strand to another returns the % result
    compareDNA(pAequor) {
      let counter = 0
      for (let i=0; i<this.dna.length; i++) {
        if (pAequor.dna.indexOf(this.dna[i]) === 1) {
          counter++;
        };
      };
      let percentSim = Math.round((counter/15) * 100)
      return `Specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${percentSim}% DNA in common`;     
    },

    //Survive method checks to see if object meets the likely survival condition of 60% or more 'C' & 'G' DNA bases
    willlikelySurvive() {
      let counter = 0
      for (let base of this.dna) {
        if (base === 'G' || base === 'C') {
          counter++
        };
      };
      return (counter/15) >= 0.6 
    },
  };
};

//Creates an array of 30 specimen that meet the survival prerequisite
const populateSurvivalArray = () => {
  const survivalArray = []
  let specimenCount = 1
  while (survivalArray.length < 30) {
    if (pAequorFactory(specimenCount).willlikelySurvive()) {
      survivalArray.push(pAequorFactory(specimenCount))
    };
    specimenCount++;
  }
  return survivalArray;
};


//TESTS:
console.log(populateSurvivalArray().length);
console.log(populateSurvivalArray());



/* MORE CHALLENGES
Create a .complementStrand() method to the factory function’s object that returns the complementary DNA strand. The rules are that 'A's match with 'T's and vice versa. Also, 'C's match with 'G's and vice versa.

Use the .compareDNA() to find the two most related instances of pAequor.
*/





