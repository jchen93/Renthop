const fs = require('fs');
const text = fs.readFileSync('candidate.txt', 'utf-8');
const textByLine = text.split('\nRentHop_');

const columnNames = textByLine[0].split('|');

const newArray = textByLine.map(row => {
    const temp = row.split('|');
    const obj = {};
    for (let i = 0; i < columnNames.length; i++) {
        obj[columnNames[i]] = temp[i];
    }
    return obj;
})
newArray.splice(0, 1);

function findTwoHighestPrices(arr) {
    let indexOfHighest = 0
    let indexOfSecondHighest = 0
    let highest = -Infinity
    let secondHighest = -Infinity
    for (let i = 0; i < arr.length; i++) {
        const price = arr[i]['PRICE']
        if (price > highest) {
            indexOfSecondHighest = indexOfHighest;
            secondHighest = highest;
            indexOfHighest = i
            highest = price;
        } else if (price > secondHighest) {
            indexOfSecondHighest = i;
            secondHighest = price;
        }
    }
    return [arr[indexOfHighest], arr[indexOfSecondHighest]];
}

let maxPrice = findTwoHighestPrices(newArray);
let highest = maxPrice[0];
let secondHighest = maxPrice[1];


function mostFrequentZipCode(arr) {
    const freq = {};
    let maxFreq = 0;
    for (const listing of arr) {
        const zip = listing['ZIP'];
        if(zip === '') continue;
        if (!freq[zip]) freq[zip] = 0;
        freq[zip]++;
        maxFreq = Math.max(freq[zip], maxFreq);
    }
    let maxZip = '';
    const zipCodes = Object.keys(freq);
    for (const zipCode of zipCodes) {
        if (freq[zipCode] === maxFreq) {
            maxZip = zipCode;
        }
    }
    return maxZip;
}


function findAveragePriceByZip(arr){
    const mapPrice = {};
    const mapFreq = {};
    for (const listing of arr) {
        const zip = listing['ZIP'];
        const price = listing['PRICE'];
        // console.log(price);
        if(zip === '') continue;
        if (!mapFreq[zip] && !mapPrice[zip]) {
            mapFreq[zip] = 0;
            mapPrice[zip] = 0;
        }
        mapFreq[zip]++;
        mapPrice[zip] += Number(price);
    }
    const zipCodes = Object.keys(mapPrice);
    const output = [];
    for (const zipCode of zipCodes) {
        const average = Math.round(mapPrice[zipCode] / mapFreq[zipCode]);
        output.push([zipCode, average]);
    }
    return output;
}


function findMaxPriceByZip(arr){
    const map = {};
    for (const listing of arr) {
        const zip = listing['ZIP'];
        const price = listing['PRICE'];
        if(zip === '') continue;
        if (!map[zip]) {
            map[zip] = price;
        }
        map[zip] = Math.max(map[zip], price);
    }
    return Object.entries(map);
}

function sortPriceByDescending(arr){
    let data = findAveragePriceByZip(arr)
    let sortData = data.sort((a, b) => b[1] - a[1])
    return sortData
}


console.log('================================ HIGHEST PRICE ================================\n\n\n');
console.log(highest);
console.log('\n\n\n')
console.log('================================ SECOND HIGHEST PRICE ================================\n\n\n');
console.log(secondHighest);
console.log('\n\n\n')

console.log('================================ Most frequent zipcode ================================\n\n\n');
console.log(mostFrequentZipCode(newArray))
console.log('\n\n\n')

console.log('================================ FIND AVERAGE PRICE BY ZIP================================\n\n\n');
console.log(findAveragePriceByZip(newArray));
console.log('\n\n\n')

console.log('================================ FIND PRICE BY DESCENDING ORDER================================\n\n\n');
console.log(sortPriceByDescending(newArray))
console.log('\n\n\n')

/*
8.)  How did you choose your data structure and what is the time efficiency of the resulting algorithms?
        I have used hash tables to store the data in key value pair, so that I could access them in O(1) time, and when I do calculation
        it would be O(n) time and space would be O(n) too.
    

9.) Imagine the listings came to you in a continuous stream throughout the day,
    and at any given point you may need to quickly recompute the answers to Part Two. 
    For example, you may receive 10,000 listings, but you will be asked to output the answers to Part Two every 100 listings.
    What is the time efficiency of your data structure and algorithm?

        As data comes in, the hash table keeps track of the cumulative frequency and price by zipcode,
        and we do a check if the counter is equal to 100, then we do the calculation in part 2 and reset the count.

        Upon looking at the input data, I realized that it is best to use a key value pair in a hash table to store the data. 
        So searching for a particular element in the hash table has a linear time complexity,
        hash table lookup has a constant time complexity. I have chosen hash table because of this reason.

10.)  Are there ways to alter your data structure or optimize the design for frequently reporting the results from Part Two?
        To make it more time efficient I would use max HEAP with a limited size, in this case it would be 2, 
        because of the highest and second highest price. Getting the top two values in a HEAP would run in logarithmic time (getting
        the highest value would take constant time and getting the second highest value would take logarithmic time because we
        need to pop from the heap and rebalance it). To maintain the max heap, we re-insert the popped value which would take
        logarithmic time.
*/