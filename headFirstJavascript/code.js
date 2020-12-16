function makePhrases() {
 var words1 = ["24/7", "multi-tier", "30,000 foot", "B-to-B", "win-win"];
 var words2 = ["empowered", "value-added", "oriented", "focused", "aligned"];
 var words3 = ["process", "solution", "tipping-point", "strategy", "vision"];
 var rand1 = Math.floor(Math.random() * words1.length);
 console.log(rand1);
 var rand2 = Math.floor(Math.random() * words2.length);
 console.log(rand2);
 var rand3 = Math.floor(Math.random() * words3.length);
 console.log(rand3);
 var phrase = words1[rand1] + " " + words2[rand2] + " " + words3[rand3];
 alert(phrase);
 }
 makePhrases();
 makePhrases();
