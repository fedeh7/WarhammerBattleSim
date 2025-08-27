import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    rerollOptionMisses,
    rerollOptionNonCriticals,
    rerollOptionNone,
    rerollOptionOnes,
} from '../constants';
import type {
    WeaponStatsType,
    RerollOptions,
    ReducerDispatchActionType,
} from '@/interfaces';

export const WeaponsDataCard = ({
    weaponStats,
    setWeaponStats,
}: {
    weaponStats: WeaponStatsType;
    setWeaponStats: (action: ReducerDispatchActionType) => void;
}) => {
    return (
        <Card className="w-full h-full">
            <CardHeader>
                <CardTitle>Gauss Reaper</CardTitle>

                <CardAction>
                    <Button variant="link">Remove Weapon</Button>
                </CardAction>
            </CardHeader>
            <CardContent className="flex flex-row gap-2 flex-wrap items-center justify-center">
                <div className="flex flex-col gap-2 min-w-20 flex-shrink flex-grow basis-1">
                    <Label htmlFor="models">Models</Label>
                    <Input
                        id="models"
                        type="number"
                        value={weaponStats.models}
                        onChange={(e) => {
                            setWeaponStats({
                                type: 'SET_WEAPON_STATS',
                                payload: { models: e.target.value },
                            });
                        }}
                    />
                </div>
                <div className="flex flex-col gap-2 min-w-20 flex-shrink flex-grow basis-1">
                    <Label htmlFor="attacks">Attacks</Label>
                    <Input
                        id="attacks"
                        type="number"
                        value={weaponStats.attacks}
                        onChange={(e) => {
                            setWeaponStats({
                                type: 'SET_WEAPON_STATS',
                                payload: { attacks: e.target.value },
                            });
                        }}
                    />
                </div>
                <div className="flex flex-col gap-2 min-w-20 flex-shrink flex-grow basis-1">
                    <Label htmlFor="bsws">BSWS</Label>
                    <Select
                        value={weaponStats.bsws}
                        onValueChange={(value) => {
                            setWeaponStats({
                                type: 'SET_WEAPON_STATS',
                                payload: {
                                    bsws: value as RerollOptions,
                                },
                            });
                        }}>
                        <SelectTrigger className="w-full" id="bsws">
                            <SelectValue placeholder="Select BSWS" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>BSWS</SelectLabel>
                                <SelectItem value={'6'}>6+</SelectItem>
                                <SelectItem value={'5'}>5+</SelectItem>
                                <SelectItem value={'4'}>4+</SelectItem>
                                <SelectItem value={'3'}>3+</SelectItem>
                                <SelectItem value={'2'}>2+</SelectItem>
                                <SelectItem value={'1'}>Auto hit</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-2 min-w-20 flex-shrink flex-grow basis-1">
                    <Label htmlFor="strength">Strength</Label>
                    <Input
                        id="strength"
                        type="number"
                        value={weaponStats.strength}
                        onChange={(e) => {
                            setWeaponStats({
                                type: 'SET_WEAPON_STATS',
                                payload: { strength: e.target.value },
                            });
                        }}
                    />
                </div>
                <div className="flex flex-col gap-2 min-w-20 flex-shrink flex-grow basis-1">
                    <Label htmlFor="ap">AP</Label>
                    <Input
                        id="ap"
                        type="number"
                        value={weaponStats.ap}
                        onChange={(e) => {
                            setWeaponStats({
                                type: 'SET_WEAPON_STATS',
                                payload: { ap: e.target.value },
                            });
                        }}
                    />
                </div>
                <div className="flex flex-col gap-2 min-w-20 flex-shrink flex-grow basis-1">
                    <Label htmlFor="damage">Damage</Label>
                    <Input
                        id="damage"
                        type="number"
                        value={weaponStats.damage}
                        onChange={(e) => {
                            setWeaponStats({
                                type: 'SET_WEAPON_STATS',
                                payload: { damage: e.target.value },
                            });
                        }}
                    />
                </div>
            </CardContent>
            <CardFooter className="flex flex-row gap-2 flex-wrap items-center justify-center h-fit">
                <div className="flex flex-col gap-2 items-start border border-gray-200 p-4 h-full min-w-50 flex-shrink flex-grow basis-1">
                    <p className="text-sm text-gray-500">Hit modifiers</p>
                    <div className="flex flex-row gap-2">
                        <Label htmlFor="lethalHits">Lethal Hits</Label>
                        <Checkbox
                            id="lethalHits"
                            checked={weaponStats.hasLethalHits}
                            onCheckedChange={(checked) => {
                                setWeaponStats({
                                    type: 'SET_WEAPON_STATS',
                                    payload: {
                                        hasLethalHits: checked as boolean,
                                    },
                                });
                            }}
                        />
                    </div>

                    <div className="flex gap-2">
                        <Label htmlFor="sustainedHits">Sustained Hits</Label>
                        <Select
                            value={weaponStats.sustainedHits}
                            onValueChange={(value) => {
                                setWeaponStats({
                                    type: 'SET_WEAPON_STATS',
                                    payload: {
                                        sustainedHits: value as RerollOptions,
                                    },
                                });
                            }}>
                            <SelectTrigger
                                className="w-full"
                                id="sustainedHits">
                                <SelectValue placeholder="Sustained Hits" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Sustained Hits</SelectLabel>
                                    <SelectItem value={'2'}>2</SelectItem>
                                    <SelectItem value={'1'}>1</SelectItem>
                                    <SelectItem value={'0'}>0</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex gap-2">
                        <Label htmlFor="hitCriticalTreshold">
                            Critical Hit
                        </Label>

                        <Select
                            value={weaponStats.hitCriticalTreshold}
                            onValueChange={(value) => {
                                setWeaponStats({
                                    type: 'SET_WEAPON_STATS',
                                    payload: {
                                        hitCriticalTreshold:
                                            value as RerollOptions,
                                    },
                                });
                            }}>
                            <SelectTrigger
                                className="w-full"
                                id="hitCriticalTreshold">
                                <SelectValue placeholder="Select Critical" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Critical</SelectLabel>
                                    <SelectItem value={'6'}>6+ </SelectItem>
                                    <SelectItem value={'5'}>5+ </SelectItem>
                                    <SelectItem value={'4'}>4+ </SelectItem>
                                    <SelectItem value={'3'}>3+ </SelectItem>
                                    <SelectItem value={'2'}>2+ </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-row gap-2">
                        <Label htmlFor="hitReroll">Reroll</Label>
                        <Select
                            value={weaponStats.hitReroll}
                            onValueChange={(value) => {
                                setWeaponStats({
                                    type: 'SET_WEAPON_STATS',
                                    payload: {
                                        hitReroll: value as RerollOptions,
                                    },
                                });
                            }}>
                            <SelectTrigger className="w-full" id="hitReroll">
                                <SelectValue placeholder="Select Reroll" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Reroll</SelectLabel>
                                    <SelectItem value={rerollOptionNone}>
                                        {rerollOptionNone}
                                    </SelectItem>
                                    <SelectItem value={rerollOptionOnes}>
                                        {rerollOptionOnes}
                                    </SelectItem>
                                    <SelectItem value={rerollOptionMisses}>
                                        {rerollOptionMisses}
                                    </SelectItem>
                                    <SelectItem
                                        value={rerollOptionNonCriticals}>
                                        {rerollOptionNonCriticals}
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex flex-col gap-2 items-start border border-gray-200 p-4 h-full min-w-50 flex-shrink flex-grow basis-1">
                    <p className="text-sm text-gray-500">Wound modifiers</p>
                    <div className="flex flex-row gap-2">
                        <Label htmlFor="devastatingWounds">
                            Devastating Wounds
                        </Label>
                        <Checkbox
                            id="devastatingWounds"
                            checked={weaponStats.hasDevastatingWounds}
                            onCheckedChange={(checked) => {
                                setWeaponStats({
                                    type: 'SET_WEAPON_STATS',
                                    payload: {
                                        hasDevastatingWounds:
                                            checked as boolean,
                                    },
                                });
                            }}
                        />
                    </div>

                    <div className="flex gap-2">
                        <Label htmlFor="woundModifier">Wound Modifier</Label>
                        <Input
                            id="woundModifier"
                            type="number"
                            className="w-20"
                            value={weaponStats.woundModifier}
                            onChange={(e) => {
                                setWeaponStats({
                                    type: 'SET_WEAPON_STATS',
                                    payload: {
                                        woundModifier: e.target.value,
                                    },
                                });
                            }}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Label htmlFor="woundCriticalTreshold">
                            Critical Wound
                        </Label>
                        <Select
                            value={weaponStats.woundCriticalTreshold}
                            onValueChange={(value) => {
                                setWeaponStats({
                                    type: 'SET_WEAPON_STATS',
                                    payload: {
                                        woundCriticalTreshold:
                                            value as RerollOptions,
                                    },
                                });
                            }}>
                            <SelectTrigger
                                className="w-full"
                                id="woundCriticalTreshold">
                                <SelectValue placeholder="Select Critical" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Critical</SelectLabel>
                                    <SelectItem value={'6'}>6+ </SelectItem>
                                    <SelectItem value={'5'}>5+ </SelectItem>
                                    <SelectItem value={'4'}>4+ </SelectItem>
                                    <SelectItem value={'3'}>3+ </SelectItem>
                                    <SelectItem value={'2'}>2+ </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-row gap-2">
                        <Label htmlFor="woundReroll">Reroll</Label>
                        <Select
                            value={weaponStats.woundReroll}
                            onValueChange={(value) => {
                                setWeaponStats({
                                    type: 'SET_WEAPON_STATS',
                                    payload: {
                                        woundReroll: value as RerollOptions,
                                    },
                                });
                            }}>
                            <SelectTrigger className="w-full" id="woundReroll">
                                <SelectValue placeholder="Select Reroll" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Reroll</SelectLabel>
                                    <SelectItem value={rerollOptionNone}>
                                        {rerollOptionNone}
                                    </SelectItem>
                                    <SelectItem value={rerollOptionOnes}>
                                        {rerollOptionOnes}
                                    </SelectItem>
                                    <SelectItem value={rerollOptionMisses}>
                                        {rerollOptionMisses}
                                    </SelectItem>
                                    <SelectItem
                                        value={rerollOptionNonCriticals}>
                                        {rerollOptionNonCriticals}
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
};
