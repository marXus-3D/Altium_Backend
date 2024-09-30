function shuffleArray(array) {
    // Create a copy of the array to avoid modifying the original
    const shuffled = array.slice();
    
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Get a random index from 0 to i
        // Swap elements at indices i and j
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
}

export  {shuffleArray};

function createArrayWithLimit(array1, array2, array3) {
    // Get the first 3 elements from each array
    const firstThree1 = array1.slice(0, 3);
    const firstThree2 = array2.slice(0, 3);
    const firstThree3 = array3.slice(0, 3);
    
    // Combine them into a single array
    let combined = [...firstThree1, ...firstThree2, ...firstThree3];

    // If the combined length is less than 10, fill it up
    while (combined.length < 10) {
        if (firstThree1.length < 3) {
            const nextElement = array1[firstThree1.length]; // Take next from array1
            if (nextElement !== undefined) {
                combined.push(nextElement);
                firstThree1.push(nextElement);
            }
        }
        
        if (firstThree2.length < 3) {
            const nextElement = array2[firstThree2.length]; // Take next from array2
            if (nextElement !== undefined) {
                combined.push(nextElement);
                firstThree2.push(nextElement);
            }
        }
        
        if (firstThree3.length < 3) {
            const nextElement = array3[firstThree3.length]; // Take next from array3
            if (nextElement !== undefined) {
                combined.push(nextElement);
                firstThree3.push(nextElement);
            }
        }
    }

    // Trim the combined array if it exceeds 10 elements
    return combined.slice(0, 10);
}

export  {createArrayWithLimit};