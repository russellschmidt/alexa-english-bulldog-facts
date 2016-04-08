/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Bulldog Facts for a Bulldog fact"
 *  Alexa: "Here's your Bulldog fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing facts about Bulldogs.
 */
var BULLDOG_FACTS = [
  "English Bulldogs are the sixth most popular breed in America.",
  "In Los Angeles, bulldogs are the most popular dog breed, and are owned by many celebrities, according to the American Kennel Club",
  "Warren G. Harding and Calvin Coolidge were the only U.S. Presidents to own an English bulldog while in office. Harding's pet bulldog was named Oh Boy, and Coolidge owned a dog named Boston Beans, perhaps due to the flatulent nature of the bulldog.",
  "English Bulldogs are one of the most popular mascots for universities and sports teams. Uga, the mascot of the University of Georgia team, is one of the most famous. There have been eight Ugas since nineteen fifty six.",
  "English Bulldogs were originally bred in England as far back as the thirteenth century, and are believed to be a mix of bull mastiffs and asiatic mastiffs.",
  "English bulldogs were bred with pugs in the Victorian era to shrink their size and create friendlier personalities within the breed.",
  "English Bulldogs have suffered the most airline deaths of any breed due to their respiratory issues. They often suffer from hip dysplasia and other medical concerns. Many airlines will refuse to allow them in the cargo holds.",
  "Over eighty percent of bulldogs are delivered by Caesarean section. Having been bred with such large heads precludes most bulldog pups from being delivered naturally.",
  "English Bulldogs, like many brachycephalic (large-skulled) dogs are not well-suited for water and are in danger of drowning when swimming.",
  "English Bulldogs get their name from their original purpose - fighting bulls! Bull-baiting was a popular blood sport in England from twelve hundred and six until eighteen thirty five.",
  "During Bullbaiting, Bulldogs would creep low to the ground and attempt to bite the bull's nose and throat in an effort to kill it. Spectators would place bets on the outcome.",
  "English Bulldogs tend to live an average of eight to ten years",
  "English bulldogs get their distinctive look from their bloody history. Their low, stocky bodies helped them avoid being launched by the bull's horns.",
  "The Bulldog's face wrinkles originally served as channels for the bull's blood in a bull baiting fight, keeping blood out of the eyes and nose of the dog while it was clamped onto a bull's neck or nose.",
  "The Bulldog's distinctive underbite gave them a better grip on the bull's throat, and their short snout allowed them to breathe while their incredibly strong jaw clamped onto the bull's snout or neck while the bull writhed and tried to get loose from the dog's grip.",
  "The smaller back legs of the bulldog allow the dog to be shaken violently without snapping their spine while fighting bulls and bears in medieval and renaissance bull and bear baiting contests.",
  "The banning of bull-baiting in Victorian England almost saw the extinction of English bulldogs. They were considered a violent and aggressive breed unfit for the home.",
  "During the Victorian era, Bulldogs were bred with pugs to become smaller and gain a kinder demeanor, so as to become suitable for companionship.",
  "Some bulldogs were used as herding dogs in Germany and the US in the eighteen hundreds. Bulldogs from two hundred years ago were capable of going great distances and were generally much taller than today's bulldog.",
  "English bulldogs are quite naturally considered the national breed of England. England is typically portrayed as a bulldog in wartime propaganda and political cartoons.",
  "Despite his nickname as 'the British Bulldog' for his demeanor and perhaps his facial appearance, Winston Churchill owned two poodles.",
  "Bud the English Bulldog accompanied his master Sewall Crocker and Dr Horatio Jackson in nineteen oh three on the first car trip across the continental United States.",
  "The Bulldog is the mascot for both the United States Marine Corps and the U.S. Army's Third Infantry Division.",
  "In two thousand and fifteen, Otto the skateboarding bulldog broke the record in Lima, Peru for longest human tunnel travelled through by a skateboarding dog. The tunnel was 30 people long.",
  "The oldest single breed specialty dog club is England's The Bulldog Club, which formed in eighteen seventy eight.",
  "English Bulldogs tend to slobber, snort, snore and get quite gassy at times. Light sleepers may not love being an English Bulldog owner",
  "Male English bulldogs tend to weigh about fifty pounds or twenty two kilograms and female English bulldogs weight about forty pounds or eighteen kilograms.",
  "Despite a deserved reputation for being lazy and low energy as adults, many bulldogs are very high energy as puppies.",
  "English Bulldogs are classified by the American Kennel Club as non-sporting, and by the United Kennel Club as companion dogs.",
  "The English bulldog generally has a sweet, gentle disposition that actively seeks human attention",
  "English Bulldogs tend to both overheat in warm climates and get chilled in cold temperatures. They thrive in temperate climates.",
  "The first written reference to bull baiting is from twelve oh nine in the English town of Stamford. The Earl of Stamford is thought to have inaugurated bull baiting as a sport after being amused by the sight of a pack of dogs chase a bull through the streets.",
  "The wrinkles on the English bulldog's face should be wiped regularly to prevent skin infections.",
  "The various color patterns of the English bulldog are brindle, piebald, black, and solid white, red, fawn or fallow.",
  "English bulldogs make fine apartment pets and do not require a yard. Typically low-endurance dogs, they need just a moderate amount (between 20 and 40 minutes) of exercise per day.",
  "Forty three Universities in the U.S. have the Bulldog as their mascot, making it one of the most popular mascots in the country",
  "English bulldogs are expensive to breed and susceptible to a number of health problems, making them additionally one of the most expensive breeds to own.",
  "English bulldogs are notorious for their food possessiveness, and should not be fed around very small children or other dogs",
  "English bulldogs are known for being extremely stubborn difficult to train, though responsive to food rewards.",
  "An English bulldog can run at speeds of up to fifteen miles per hour or twenty four kilometers per hour, though for undoubtedly short periods of time.",
  "English bulldog health problems include respiratory ailments, cherry eye, mast cell tumors, hip and knee problems, skin problems such as mange, and heart problems.",
  "Despite their laziness, bulldogs still ought to be walked daily to avoid boredom and behavioral issues. Most consider the maximum range to be about one mile or a bit short of two kilometers.",
  "A typical English bulldog litter consists of four to five puppies.",
  "Bulldogs are rarely mistaken for other breeds of dogs. They are a medium-size dog with a thick-set, low-slung body. Their short-muzzled head is massive and square. They have broad shoulders and chests, with thick, sturdy limbs.",
  "The Bulldog's muscular body leads him to have a distinctive gait. Because the stocky legs are set at each corner of his body, he moves with more of a waddle than a walk",
  "Breeders started showing Bulldogs in conformation shows in England in eighteen fifty nine",
  "The first dog show that allowed Bulldogs to be shown was at Birmingham, England in eighteen sixty.",
  "In eighteen sixty one, a Bulldog named King Dick won at the Birmingham show, the second year that bulldogs as a breed were entered into competition.",
  "In eighteen sixty four, the first Bulldog breed club was formed by a man named R.S. Rockstro. The club had about thirty members and its motto was 'Hold Fast.' A member of the club, Samuel Wickens, wrote the first breed standard.",
  "The Bulldog's breed standard reportedly was the first one written in the world in eighteen sixty four. The Bulldog club responsible for this standard unfortunately disbanded after only three years.",
  "In eighteen ninety, H.D. Kendall of Lowell, Massachusetts founded The Bulldog Club of America. It was one of the first breed clubs to become a member of the new American Kennel Club",
  "In the eighteen hundreds, cities such as Rome passed laws that Bulldogs couldn't be walked on the streets even on leash due to their ferociousness",
  "Bulldogs are thought to be excellent companions for children, due to their affable nature and independence.",
  "Most English bulldogs ought to be fed about 2 cups of high quality dry food daily, divided into two meals.",
  "Bulldogs have a propensity to overeat and become obese, which can stress the heart and joints. Care must be taken to avoid overfeeding this food-loving breed.",
  "Bulldogs are considered an average shedder, with a smooth, fine, short coat of hair.",
  "Bulldog noses can become dry and can be treated with Vaseline or specialty nose-wetting products.",
  "Some vets recommend wiping the bulldog's wrinkles with baby wipes to prevent bacteria build up and infection.",
  "Bulldogs should have their teeth brushed once or twice a week.",
  "Bulldogs were used in bear baiting as well as bull baiting.",
  "There are generally considered to be four breeds of bulldog - English, French, American and Olde English. The A.K.C. and U.K.C. both also define a Bulldog breed that is separate but very similar to the English Bulldog. Olde English is spelled like the Malt Liquor, and often owners spell bulldog with an extra letter G and E at the end as a way of distinguishing the breed and harkening back to the line's medieval British roots. However, the olde english bulldog is a late twentieth century, American-developed breed.",
  "English Bulldogs typically stand about half a meter tall or about 20 inches.",
  "The French Bulldog is known for its distinctive bat-like ears and smaller build than its English cousin.",
  "French bulldogs are about half as tall and heavy as English bulldogs, standing about a quarter meter tall or a foot and about twenty two pounds or 10 kilograms",
  "American bulldogs were bred to be larger than their English ancestors, standing about 65 centimeters or two feet and weighing about one hundred pounds or 45 kilograms.",
  "Bulldogs are known to sass their owner, which includes growling, grumbling when asked to do something, stealing objects, pestering owners for food, and urinating when annoyed with their owner.",
  "A champion french bulldog named Gamin de Pycombe was the only bulldog aboard the Titanic, and was lost at sea. It had been insured for seven hundred and fifty dollars, a huge sum of money at the time. Several survivors reported seeing a French bulldog swimming in the ocean after the ship sank. The owner, Robert Daniel, survived.",
  "American Bulldogs tend to live about eleven years and bear litters of between six and eight puppies.",
  "Olde English Bulldogs are quite athletic and can jump nearly seven feet (two point one meters) in the air.",
  "Olde English Bulldogs were bred in the nineteen seventies in an attempt to solve some of the breeding and breathing problems of English bulldogs. They include pit bull, american bulldog and bull mastiff genes.",
  "Olde English Bulldogs are actually classified differently from other bulldog breeds as working dogs by the A.K.C. due to their sturdier nature.",
  "The phrase 'bulldog' first appeared in literature in the fifteen hundreds, as bondogge or bonddogge.",
  "The modern spelling of bulldog appeared in english writings around sixteen thirty one.",
  "Early bulldogs were also called 'butcher's dogs' as they were also used to subdue bulls and cows about to be slaughtered.",
  "In the mid seventeen hundreds, packs of bulldogs were used in New York City to clear the streets of wild bulls. Bulldogs were trained to grab the snout of the bull while handlers tied a rope around the neck of the bull.",
  "Nearly three quarters of bulldogs were found to suffer from hip dysplasia in a two thousand and nine survey performed by the orthopedic foundation for animals, the highest percentage of any breed.",
  "Venus was the bulldog mascot of the destroyer HMS Vansittart in World War two and accompanied her crew into battle.",
  "The bulldog mascot of Yale University is known as Handsome Dan",
  "Wrestler Davey Boy Smith was known as the British Bulldog, and brought a bulldog named Matilda into the ring with him.",
  "Two of the most famous skateboarding bulldogs were known as Tyson and Tillman. Tillman was the spokes-dog for Natural Balance dog foods.",
  "Actors Brad Pitt and Angelina Jolie own a bulldog named Jacques.",
  "Athlete David Beckham and Victoria Posh Spice Beckham own a bulldog named Coco.",
  "Rapper-Actor Ice-T with his wife Coco own several bulldogs who have made the rounds on various talk shows.",
  "Olympian Michael Phelps owns a bulldog named Herman.",
  "Actors Emma Stone and Ryan Gosling have a bulldog named Maggie.",
  "Singer Fred Durst of the band Limp Bizkit has a bulldog named Bizkit that accompanies the band on tour.",
  "Adam Sandler has had three bulldogs, named Meatball, Matzo Ball, and Babu. Meatball was the ring bearer in his wedding and starred in the movie Little Nicky.",
  "Author Truman Capote owned a bulldog named Maggie.",
  "The bulldog mascot of Butler university is known as Blue.",
  "The bulldog mascot of Mississippi State is known as Bully.",
  "Georgetown University's bulldog mascot is known as Jack.",
  "Howard Stern owned a bulldog named Bianca with his wife Beth Ostrowsky. When Bianca, a frequent topic of discussion on the show, passed away, millions of Stern fans mourned her passing.",
  "Bulldog puppies go through a teething phase that lasts about three months, from four to six months of age.",
  "Famous bulldogs in cartoons include Butch the Bulldog, introduced in a Pluto cartoon, Francis the bulldog, an outstanding character in the Disney production Oliver and Company, Hector the muscle bound Bulldog, an animated character in the Warner Brothers Looney Tunes and Merrie Melodies series, and Spike, often referred to as Butch or Killer, is an animated character from the Tom and Jerry series.",
  "The bulldog is not considered an outdoor pet, generally, though they are well suited for apartments without back yards",
  "The bulldog ranks seventy eighth out of eighty breeds in Stanley Coren's book The Intelligence of Dogs. They obey new commands no better than twenty five percent of the time on the first try, and can take 80 or more repetitions to learn new commands. Many find this obstinancy charming, however.",
  "Leading causes of death for bulldogs are cardiac related, cancer and old age. Bullies that died of old age lived an average of ten to eleven years.",
  "French bulldogs actually have roots in England. It is said that lace workers in England would keep the dogs on their laps to stay warm while working. When the lace industry decamped to France. the dogs went with them.",
  "French bulldogs are thought to have been derived from Victorian breeding of bulldogs with terriers.",
  "French bulldogs are known to be a bit tough to housebreak, though they seem to prefer crates and are fine in small or confined spaces.",
  "French bulldogs, like their English cousins, are awful swimmers and susceptible to drowning.",
  "French bulldogs are known to be sensitive to scolding, and owners often report them seeming to mope around the house after being yelled at. Trainers recommend positive reinforcement and encouragement for Frenchies.",
  "The French bulldog's distinctive bat ears was actually an American preference bred into the line. English-bred French bulldogs often retain a traditional rounded ear similar to other bulldogs.",
  "French bulldogs are often born via artificial insemination, due to their unusual proportions.",
  "French bulldogs were once the preferred dog of nineteenth and early twentieth century Parisian prostitutes. The breed gained in popularity with bohemians, writers and artists, including the painter Toulouse Latrec and the author Colette.",
  "The French bulldog was wildly popular in the eighteen nineties and early nineteen hundreds. European royalty loved the breed, including Edward Seven of England and the doomed Romanovs of Russia. The Romanovs took their Frenchie named Ortino with them to the dacha where they were all executed by the Bolsheviks.",
  "French Bulldogs have been called a clown in the cloak of a philosopher, with a serious appearance but a playful, silly nature. They tend to be quite alert, affectionate and fun dogs without being too boisterous or quick to bark.",
  "Bulldogs in general can be sensitive to anaesthesia, and care should be taken when putting them under during medical procedures.",
  "In the original presses of the novel The Wizard of Oz, Toto was depicted as a French bulldog.",
  "French bulldogs are sometimes called Frog Dogs for the way they splay out their back legs as if performing a yoga pose.",
  "French bulldogs were first recognized as a distinct breed by the A.K.C. in eighteen ninety eight."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * BulldogFactoid is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var BulldogFactoid = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
BulldogFactoid.prototype = Object.create(AlexaSkill.prototype);
BulldogFactoid.prototype.constructor = BulldogFactoid;

BulldogFactoid.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("BulldogFactoid onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

BulldogFactoid.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("BulldogFactoid onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
BulldogFactoid.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("BulldogFactoid onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

BulldogFactoid.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Bulldog Facts tell me a bulldog fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random Bulldog fact from the BULLDOG_FACTS array
    var factIndex = Math.floor(Math.random() * BULLDOG_FACTS.length);
    var fact = BULLDOG_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your Bulldog fact: " + fact;

    response.tellWithCard(speechOutput, "BulldogFactoid", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the BulldogFactoid skill.
    var bulldogFactoidInstance = new BulldogFactoid();
    bulldogFactoidInstance.execute(event, context);
};

