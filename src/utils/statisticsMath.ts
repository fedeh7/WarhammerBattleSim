import type { RerollOptions } from '@/interfaces';
import {
    factorialMapCache,
    binomialCoefficientMapCache,
    binomialDistributionMapCache,
    multinomialDistributionMapCache,
    multinomialCoefficientMapCache,
    multinomialProbabilityPowerMapCache,
} from './statisticsMathCaches';

// Factorial
export const factorial = (n: number): number => {
    if (factorialMapCache.has(n)) {
        return factorialMapCache.get(n)!;
    }
    if (n === 0) return 1;
    const result = n * factorial(n - 1);
    factorialMapCache.set(n, result);
    return result;
};

// How many ways can we choose numberOfSuccesses out of numberOfTrials?  (n choose k)
export const binomialCoefficient = (
    numberOfTrials: number,
    numberOfSuccesses: number,
): number => {
    const cacheKey = `${numberOfTrials}-${numberOfSuccesses}`;
    if (binomialCoefficientMapCache.has(cacheKey)) {
        return binomialCoefficientMapCache.get(cacheKey)!;
    }
    const result =
        factorial(numberOfTrials) /
        (factorial(numberOfSuccesses) *
            factorial(numberOfTrials - numberOfSuccesses));
    binomialCoefficientMapCache.set(cacheKey, result);
    return result;
};

// How many ways can we get numberOfSuccesses out of numberOfTrials? with probability of success probabilityOfSuccess? (n choose k) * (p^k) * (1-p)^(n-k)
export const binomialDistribution = ({
    numberOfTrials,
    numberOfSuccesses,
    probabilityOfSuccess,
}: {
    numberOfTrials: number;
    numberOfSuccesses: number;
    probabilityOfSuccess: number;
}): number => {
    const cacheKey = `${numberOfTrials}-${numberOfSuccesses}-${probabilityOfSuccess}`;
    if (binomialDistributionMapCache.has(cacheKey)) {
        return binomialDistributionMapCache.get(cacheKey)!;
    }
    if (numberOfSuccesses > numberOfTrials) {
        return 0;
    }
    const probabilityOfFailure = 1 - probabilityOfSuccess;
    const coefficient = binomialCoefficient(numberOfTrials, numberOfSuccesses);
    const probability = Number(
        (
            coefficient *
            Math.pow(probabilityOfSuccess, numberOfSuccesses) *
            Math.pow(probabilityOfFailure, numberOfTrials - numberOfSuccesses) *
            100
        ).toFixed(1),
    );
    binomialDistributionMapCache.set(cacheKey, probability);
    return probability;
};

export const binomialDistributionCumulative = ({
    numberOfTrials,
    numberOfSuccesses,
    probabilityOfSuccess,
}: {
    numberOfTrials: number;
    numberOfSuccesses: number;
    probabilityOfSuccess: number;
}): number => {
    let cumulativeProbability = 0;
    for (let i = 0; i <= numberOfSuccesses; i++) {
        cumulativeProbability += binomialDistribution({
            numberOfTrials,
            numberOfSuccesses: i,
            probabilityOfSuccess,
        });
    }
    return cumulativeProbability;
};

export const multinomialCoefficient = ({
    numberOfTrials,
    numberOfSuccesses,
    numberOfCriticals,
    numberOfFailures,
}: {
    numberOfTrials: number;
    numberOfSuccesses: number;
    numberOfCriticals: number;
    numberOfFailures: number;
}) => {
    const cacheKey = `${numberOfTrials}-${numberOfSuccesses}-${numberOfCriticals}`;
    const cacheKey2 = `${numberOfTrials}-${numberOfCriticals}-${numberOfSuccesses}`;

    if (multinomialCoefficientMapCache.has(cacheKey)) {
        return multinomialCoefficientMapCache.get(cacheKey)!;
    }
    if (multinomialCoefficientMapCache.has(cacheKey2)) {
        return multinomialCoefficientMapCache.get(cacheKey2)!;
    }
    const result =
        factorial(numberOfTrials) /
        (factorial(numberOfSuccesses) *
            factorial(numberOfCriticals) *
            factorial(numberOfFailures));
    multinomialCoefficientMapCache.set(cacheKey, result);
    multinomialCoefficientMapCache.set(cacheKey2, result);
    return result;
};

export const multinomialProbabilityPower = (
    probability: number,
    numberOfSuccesses: number,
) => {
    const cacheKey = `${probability}-${numberOfSuccesses}`;
    if (multinomialProbabilityPowerMapCache.has(cacheKey)) {
        return multinomialProbabilityPowerMapCache.get(cacheKey)!;
    }
    const result = Math.pow(probability, numberOfSuccesses);
    multinomialProbabilityPowerMapCache.set(cacheKey, result);
    return result;
};

export const multinomialDistribution = ({
    numberOfTrials,
    numberOfSuccesses,
    numberOfCriticals,
    probabilityOfSuccess,
    probabilityOfCritical,
}: {
    numberOfTrials: number;
    numberOfSuccesses: number;
    numberOfCriticals: number;
    probabilityOfSuccess: number;
    probabilityOfCritical: number;
}) => {
    const cacheKey = `${numberOfTrials}-${numberOfSuccesses}-${numberOfCriticals}-${probabilityOfSuccess}-${probabilityOfCritical}`;
    const numberOfFailures =
        numberOfTrials - numberOfSuccesses - numberOfCriticals;
    const probabilityOfFailure =
        1 - probabilityOfSuccess - probabilityOfCritical;

    if (multinomialDistributionMapCache.has(cacheKey)) {
        return multinomialDistributionMapCache.get(cacheKey)!;
    }
    if (numberOfSuccesses + numberOfCriticals > numberOfTrials) {
        return 0;
    }
    const coefficient = multinomialCoefficient({
        numberOfTrials,
        numberOfSuccesses,
        numberOfCriticals,
        numberOfFailures,
    });
    const result =
        coefficient *
        multinomialProbabilityPower(probabilityOfSuccess, numberOfSuccesses) *
        multinomialProbabilityPower(probabilityOfCritical, numberOfCriticals) *
        multinomialProbabilityPower(probabilityOfFailure, numberOfFailures);
    multinomialDistributionMapCache.set(cacheKey, result);

    return result;
};

export const getProbabilityWithRerolls = ({
    baseProbabilityOfSuccess,
    baseProbabilityOfCritical,
    rerollOption,
}: {
    baseProbabilityOfSuccess: number;
    baseProbabilityOfCritical: number;
    rerollOption: RerollOptions;
}) => {
    let finalProbabilityOfSuccess = baseProbabilityOfSuccess;
    let finalProbabilityOfCritical = baseProbabilityOfCritical;

    const probabilityOfSuccessRerollingOnes =
        baseProbabilityOfSuccess + (1 / 6) * baseProbabilityOfSuccess;
    const probabilityOfSuccessRerollingMisses =
        baseProbabilityOfSuccess +
        (1 - baseProbabilityOfSuccess) * baseProbabilityOfSuccess;
    const probabilityOfSuccessesRerollingNonCriticals =
        baseProbabilityOfCritical +
        (1 - baseProbabilityOfCritical) * baseProbabilityOfSuccess;

    const probabilityOfCriticalsRerollingOnes =
        baseProbabilityOfCritical + (1 / 6) * baseProbabilityOfCritical;
    const probabilityOfCriticalsRerollingMisses =
        baseProbabilityOfCritical +
        (1 - baseProbabilityOfSuccess) * baseProbabilityOfCritical;
    const probabilityOfCriticalsRerollingNonCriticals =
        baseProbabilityOfCritical +
        (1 - baseProbabilityOfCritical) * baseProbabilityOfCritical;

    if (rerollOption === 'Ones') {
        finalProbabilityOfSuccess = probabilityOfSuccessRerollingOnes;
        finalProbabilityOfCritical = probabilityOfCriticalsRerollingOnes;
    } else if (rerollOption === 'Misses') {
        finalProbabilityOfSuccess = probabilityOfSuccessRerollingMisses;
        finalProbabilityOfCritical = probabilityOfCriticalsRerollingMisses;
    } else if (rerollOption === 'NonCriticals') {
        finalProbabilityOfSuccess = probabilityOfSuccessesRerollingNonCriticals;
        finalProbabilityOfCritical =
            probabilityOfCriticalsRerollingNonCriticals;
    }
    const percentageOfCriticalsInsideSuccesses =
        finalProbabilityOfCritical / finalProbabilityOfSuccess;

    finalProbabilityOfSuccess -= finalProbabilityOfCritical;
    finalProbabilityOfSuccess =
        finalProbabilityOfSuccess <= 0 ? 0 : finalProbabilityOfSuccess;

    return {
        finalProbabilityOfSuccess,
        finalProbabilityOfCritical,
        percentageOfCriticalsInsideSuccesses,
    };
};
