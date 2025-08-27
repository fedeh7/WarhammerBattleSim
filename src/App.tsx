import { useReducer, useState } from 'react';
import './App.css';
import { weaponStatsReducer, defenderStatsReducer } from './reducers';

import { AttackingUnitDataCard } from './customComponents/attackingUnitDataCard';
import { rerollOptionNone } from './constants';
import { DefendingUnitDataCard } from './customComponents/defendingUnitDataCard';
import { Results } from './customComponents/results';
import type { WeaponStatsType, DefenderStatsType } from './interfaces';

const weaponStatsInitialState: WeaponStatsType = {
    models: '',
    attacks: '',
    bsws: '',
    strength: '',
    ap: '',
    damage: '',
    sustainedHits: '',
    hasLethalHits: false,
    hasDevastatingWounds: false,
    hitCriticalTreshold: '6',
    woundCriticalTreshold: '6',
    hitReroll: rerollOptionNone,
    woundReroll: rerollOptionNone,
    woundModifier: '',
};

const defenderStatsInitialState: DefenderStatsType = {
    toughness: '',
    savingThrow: '',
    invulnerable: '',
    wounds: '',
    feelNoPain: '',
    hasCover: false,
    savingThrowReroll: rerollOptionNone,
};

function App() {
    const [weaponStats, setWeaponStats] = useReducer(
        weaponStatsReducer,
        weaponStatsInitialState,
    );
    const [defenderStats, setDefenderStats] = useReducer(
        defenderStatsReducer,
        defenderStatsInitialState,
    );

    // const [hitPhaseCompleteData, setHitPhaseCompleteData] =
    //     useState<HitPhaseCompleteData>({
    //         hitPhaseOnes: 0,
    //         hitPhaseMisses: 0,
    //         hitPhaseSuccesses: 0,
    //         hitPhaseCriticals: 0,
    //         hitPhaseAbsoluteSuccesses: 0,
    //         hitPhaseLethalHitsLanded: 0,
    //         hitPhaseSustainedHitsAdded: 0,
    //         hitPhaseTotalWoundsToRoll: 0,
    //         hitPhasePercentageMax: 0,
    //         hitPhaseRawGraphData: {
    //             hitAbsoluteSuccesses: {},
    //             lethalHitsLanded: {},
    //             sustainedHitsAdded: {},
    //         },
    //     });
    // const [woundPhaseCompleteData, setWoundPhaseCompleteData] =
    //     useState<WoundPhaseCompleteData>({
    //         woundPhaseOnes: 0,
    //         woundPhaseMisses: 0,
    //         woundPhaseSuccesses: 0,
    //         woundPhaseCriticals: 0,
    //         woundPhaseSavesToRoll: 0,
    //         woundPhaseDevastatingWoundsLanded: 0,
    //         woundPhaseRawGraphData: {
    //             woundsAbsoluteSuccesses: {},
    //             devastatingWoundsLanded: {},
    //         },
    //     });
    // const [savePhaseCompleteData, setSavePhaseCompleteData] =
    //     useState<SavePhaseCompleteData>({
    //         savePhaseOnes: 0,
    //         savePhaseMisses: 0,
    //         savePhaseSuccesses: 0,
    //         savePhaseCriticals: 0,
    //         savePhaseWoundsNotSaved: 0,
    //         savePhaseRawGraphData: {
    //             savesAbsoluteSuccesses: {},
    //             woundsNotSaved: {},
    //         },
    //     });
    // const [damagePhaseCompleteData, setDamagePhaseCompleteData] =
    //     useState<DamagePhaseCompleteData>({
    //         damageDealt: 0,
    //         amountKilled: 0,
    //         damagePhaseRawGraphData: {
    //             totalDamageDealt: {},
    //             totalAmountKilled: {},
    //         },
    //     });
    // const [iterations, setIterations] = useState(1000000);

    // const testAttaks = 6;
    // const testModels = 10;
    // const testBS = 3;

    // console.log(
    //     'distribucion',
    //     binomialDistribution(testAttaks * testModels, 40, 4 / 6),
    // );

    return (
        <div className="flex min-h-svh flex-col items-center justify-center">
            <p>Attacker</p>
            <AttackingUnitDataCard
                weaponStats={weaponStats}
                setWeaponStats={setWeaponStats}
            />

            <p>Defender</p>
            <DefendingUnitDataCard
                defenderStats={defenderStats}
                setDefenderStats={setDefenderStats}
            />

            <Results weaponStats={weaponStats} defenderStats={defenderStats} />
        </div>
    );
}

export default App;
