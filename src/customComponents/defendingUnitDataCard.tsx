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
    DefenderStatsType,
    RerollOptions,
    ReducerDispatchActionType,
} from '@/interfaces';

export const DefendingUnitDataCard = ({
    defenderStats,
    setDefenderStats,
}: {
    defenderStats: DefenderStatsType;
    setDefenderStats: (action: ReducerDispatchActionType) => void;
}) => {
    return (
        <Card className="w-full h-full">
            <CardHeader>
                <CardTitle>Defending Unit</CardTitle>

                <CardAction>
                    <Button variant="link">Remove Unit</Button>
                </CardAction>
            </CardHeader>
            <CardContent className="flex flex-row gap-2 flex-wrap items-center justify-center">
                <div className="flex flex-col gap-2 min-w-20 flex-shrink flex-grow basis-1">
                    <Label htmlFor="toughness">Toughness</Label>
                    <Input
                        id="toughness"
                        type="number"
                        value={defenderStats.toughness}
                        onChange={(e) => {
                            setDefenderStats({
                                type: 'SET_DEFENDER_STATS',
                                payload: { toughness: e.target.value },
                            });
                        }}
                    />
                </div>
                <div className="flex flex-col gap-2 min-w-20 flex-shrink flex-grow basis-1">
                    <Label htmlFor="savingThrow">Saving Throw</Label>
                    <Select
                        value={defenderStats.savingThrow}
                        onValueChange={(value) => {
                            setDefenderStats({
                                type: 'SET_DEFENDER_STATS',
                                payload: {
                                    savingThrow: value as RerollOptions,
                                },
                            });
                        }}>
                        <SelectTrigger className="w-full" id="savingThrow">
                            <SelectValue placeholder="Select Saving Throw" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Saving Throw</SelectLabel>
                                <SelectItem value={'6'}>6+ </SelectItem>
                                <SelectItem value={'5'}>5+ </SelectItem>
                                <SelectItem value={'4'}>4+ </SelectItem>
                                <SelectItem value={'3'}>3+ </SelectItem>
                                <SelectItem value={'2'}>2+ </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-2 min-w-20 flex-shrink flex-grow basis-1">
                    <Label htmlFor="invulnerable">Invulnerable</Label>
                    <Select
                        value={defenderStats.invulnerable}
                        onValueChange={(value) => {
                            setDefenderStats({
                                type: 'SET_DEFENDER_STATS',
                                payload: {
                                    invulnerable: value as RerollOptions,
                                },
                            });
                        }}>
                        <SelectTrigger className="w-full" id="invulnerable">
                            <SelectValue placeholder="Select Invulnerable" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Invulnerable</SelectLabel>
                                <SelectItem value={'6'}>6++ </SelectItem>
                                <SelectItem value={'5'}>5++ </SelectItem>
                                <SelectItem value={'4'}>4++ </SelectItem>
                                <SelectItem value={'3'}>3++ </SelectItem>
                                <SelectItem value={'2'}>2++ </SelectItem>
                                <SelectItem value={'0'}>None </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-2 min-w-20 flex-shrink flex-grow basis-1">
                    <Label htmlFor="wounds">Wounds</Label>
                    <Input
                        id="wounds"
                        type="number"
                        value={defenderStats.wounds}
                        onChange={(e) => {
                            setDefenderStats({
                                type: 'SET_DEFENDER_STATS',
                                payload: { wounds: e.target.value },
                            });
                        }}
                    />
                </div>
                <div className="flex flex-col gap-2 min-w-20 flex-shrink flex-grow basis-1">
                    <Label htmlFor="feelNoPain">Feel No Pain</Label>
                    <Select
                        value={defenderStats.feelNoPain}
                        onValueChange={(value) => {
                            setDefenderStats({
                                type: 'SET_DEFENDER_STATS',
                                payload: {
                                    feelNoPain: value as RerollOptions,
                                },
                            });
                        }}>
                        <SelectTrigger className="w-full" id="feelNoPain">
                            <SelectValue placeholder="Select Feel No Pain" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Feel No Pain</SelectLabel>
                                <SelectItem value={'6'}>6+++ </SelectItem>
                                <SelectItem value={'5'}>5+++ </SelectItem>
                                <SelectItem value={'4'}>4+++ </SelectItem>
                                <SelectItem value={'3'}>3+++ </SelectItem>
                                <SelectItem value={'2'}>2+++ </SelectItem>
                                <SelectItem value={'1'}>1+++ </SelectItem>
                                <SelectItem value={'0'}>None </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
            <CardFooter className="flex flex-row gap-2 flex-wrap items-center justify-center h-fit">
                <div className="flex flex-col gap-2 items-start border border-gray-200 p-4 h-full min-w-50 flex-shrink flex-grow basis-1">
                    <p className="text-sm text-gray-500">Defender modifiers</p>
                    <div className="flex flex-row gap-2">
                        <Label htmlFor="hasCover">Has Cover</Label>
                        <Checkbox
                            id="hasCover"
                            checked={defenderStats.hasCover}
                            onCheckedChange={(checked) => {
                                setDefenderStats({
                                    type: 'SET_DEFENDER_STATS',
                                    payload: {
                                        hasCover: checked as boolean,
                                    },
                                });
                            }}
                        />
                    </div>

                    <div className="flex flex-row gap-2">
                        <Label htmlFor="savingThrowReroll">Reroll</Label>
                        <Select
                            value={defenderStats.savingThrowReroll}
                            onValueChange={(value) => {
                                setDefenderStats({
                                    type: 'SET_DEFENDER_STATS',
                                    payload: {
                                        savingThrowReroll:
                                            value as RerollOptions,
                                    },
                                });
                            }}>
                            <SelectTrigger
                                className="w-full"
                                id="savingThrowReroll">
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
