export function sortByScore(a, b) {
    return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
}

function scoreForField(voiture, intervals, field) {
    return intervals.findIndex(
        (interval) =>
            voiture[field] >= interval[0] && voiture[field] < interval[1]
    ) ?? 0;
}

export function scorePositif(vehicle, config) {
    const coffreScore = scoreForField(vehicle, trunkIntervals, "trunk");
    const autonomieScore = scoreForField(
        vehicle,
        rangeIntervals,
        "range"
    );
    const consommationScore = scoreForField(
        vehicle,
        consommationIntervals,
        "consumption"
    );
    const superchargeScore = scoreForField(
        vehicle,
        superchargeIntervals,
        "supercharge"
    );

    return (
        coffreScore * config.trunk +
        autonomieScore * config.range +
        consommationScore * config.consumption +
        superchargeScore * config.supercharge +
        vehicle.quality * config.quality +
        vehicle.look * config.look +
        vehicle.practicality * config.practicality
    );
}

export function scoreNegatif(voiture, config) {
    const prixScore = scoreForField(voiture, prixIntervals, "price");
    const volumeScore = scoreForField(voiture, volumeIntervals, "volume");

    return -(prixScore * config.price + volumeScore * config.volume)
}

const trunkIntervals = [
    [0, 420],
    [421, 474],
    [475, 499],
    [601, 10000],
    [500, 529],
    [530, 600],
];
const rangeIntervals = [
    [360, 399],
    [400, 439],
    [440, 469],
    [470, 509],
    [510, 539],
    [540, 10000],
];
const superchargeIntervals = [
    [32, 40],
    [29, 31],
    [26, 28],
    [23, 25],
    [20, 22],
    [0, 19],
];
const consommationIntervals = [
    [23, 25],
    [21.9, 22.9],
    [20.6, 21.8],
    [19.3, 20.5],
    [18.1, 19.2],
    [0, 18],
];


const volumeIntervals = [
    [0, 12.59],
    [12.6, 13.09],
    [13.1, 13.59],
    [13.6, 14.09],
    [14.1, 14.69],
    [14.7, 10000],
];
const prixIntervals = [
    [0, 47999],
    [48000, 51999],
    [52000, 55999],
    [56000, 62999],
    [63000, 69999],
    [70000, 1000000],
];
