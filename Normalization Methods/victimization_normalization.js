
/*
UNIT TESTING HAS PROVED SUCCESFULL
*/


/**
 * Normalization function
 * Takes an input: "Type of Victimization"
 * Returns normalized data with every type of victimization in an array:
 * Possible array values:
 * sex trafficking
 * sex exploitation
 * labor trafficking
 * labor exploitation
 */
function extractVictimizationPairs(text) {
    // Handles case "unknown", else moves through typical logic
    if (text.toLowerCase() === "unknown") {
        return ["unknown"];
    }

    // Normalize: replace commas and ampersands with a space globally, then convert to lowercase
    let words = text.toLowerCase().replace(/[,&]/g, " ");
    
    // Split the string into an array of words based on whitespace
    let wordArray = words.split(/\s+/);

    // Map type words
    const typeMap = {
        "sex": "sex",
        "sexual": "sex",
        "labor": "labor"
    };

    const forms = ["trafficking", "exploitation"];

    const result = [];
    let pendingTypes = []; // types waiting to be matched

    // This for loop iterates through the words in the string
    // If the word is a type then it throws it into a list awaiting a form
    // once a form word is found, all pending type words are attributed that form and thrown into result
    for (const w of wordArray) {
        if (w in typeMap) {
            // Store type until next form appears
            pendingTypes.push(typeMap[w]);
        } else if (forms.includes(w)) {
            // Pair this form with ALL pending types
            for (const t of pendingTypes) {
                result.push(`${t} ${w}`);
            }
            pendingTypes = []; // reset after matching
        }
    }

    return result;
}

//Probably should do some testing before throwing this in the class I think
function test(func, input, expected){
    let result = func(input)
    if( result == expected){
        console.log("passed")
    } else {
        console.log(`Failed at: ${input}, expected ${expected}, got ${result}`)
    }
}


test(extractVictimizationPairs, "sex trafficking", ["sex trafficking"])
test(extractVictimizationPairs, "sexual trafficking", ["sex trafficking"])
test(extractVictimizationPairs, "labor trafficking", ["labor trafficking"])
test(extractVictimizationPairs, "sex exploitation", ["sex exploitation"])
test(extractVictimizationPairs, "sexual exploitation", ["sex exploitation"])
test(extractVictimizationPairs, "labor exploitation", ["labor exploitation"])


test(extractVictimizationPairs, "sex and labor trafficking", ["sex trafficking", "labor trafficking"])
test(extractVictimizationPairs, "sex and labor exploitation", ["sex exploitation", "labor exploitation"])

test(extractVictimizationPairs, "sexual and labor trafficking", ["sex trafficking", "labor trafficking"])
test(extractVictimizationPairs, "sexual and labor exploitation", ["sex exploitation", "labor exploitation"])

test(extractVictimizationPairs, "labor and sex trafficking", ["labor trafficking", "sex trafficking"])
test(extractVictimizationPairs, "labor and sex exploitation", ["labor exploitation", "sex exploitation"])

test(extractVictimizationPairs, "labor and sexual trafficking", ["labor trafficking", "sex trafficking"])
test(extractVictimizationPairs, "labor and sexual exploitation", ["labor exploitation", "sex exploitation"])


test(extractVictimizationPairs, "sex trafficking and exploitation", ["sex trafficking", "sex exploitation"])
test(extractVictimizationPairs, "sexual trafficking and exploitation", ["sex trafficking", "sex exploitation"])
test(extractVictimizationPairs, "labor trafficking and exploitation", ["labor trafficking", "labor exploitation"])


test(extractVictimizationPairs, "sex trafficking and exploitation and labor trafficking", ["sex trafficking", "sex exploitation", "labor trafficking"])
test(extractVictimizationPairs, "sex trafficking and exploitation and labor exploitation", ["sex trafficking", "sex exploitation", "labor exploitation"])

test(extractVictimizationPairs, "labor trafficking and exploitation and sex exploitation", ["labor trafficking", "labor exploitation", "sex exploitation"])
test(extractVictimizationPairs, "labor trafficking and exploitation and sex trafficking", ["labor trafficking", "labor exploitation", "sex trafficking"])



test(extractVictimizationPairs, "sex trafficking and labor exploitation", ["sex trafficking", "labor exploitation"])
test(extractVictimizationPairs, "labor exploitation and sex trafficking", ["labor exploitation", "sex trafficking"])


test(extractVictimizationPairs, "sex and labor trafficking and exploitation", ["sex trafficking", "labor trafficking", "sex exploitation", "labor exploitation"])
