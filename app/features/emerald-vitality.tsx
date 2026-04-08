import { Screen } from '@/ui/screen';
import { Card } from '@/ui/card';
import { Text } from '@/ui/text';

const EmeraldVitalityScreen = () => (
  <Screen>
    <Card className="gap-3">
      <Text variant="heading-md">Emerald Vitality</Text>
      <Text tone="muted">
        Route được map từ folder `emerald_vitality`.
      </Text>
    </Card>
  </Screen>
);

export default EmeraldVitalityScreen;
