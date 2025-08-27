import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { WeaponsDataCard } from './weaponsDataCard';
import type { ReducerDispatchActionType, WeaponStatsType } from '@/interfaces';

export const AttackingUnitDataCard = ({
    weaponStats,
    setWeaponStats,
}: {
    weaponStats: WeaponStatsType;
    setWeaponStats: (action: ReducerDispatchActionType) => void;
}) => {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Immortals</CardTitle>
                <CardAction>
                    <Button variant="link">Remove Unit</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <WeaponsDataCard
                    weaponStats={weaponStats}
                    setWeaponStats={setWeaponStats}
                />
            </CardContent>
        </Card>
    );
};
