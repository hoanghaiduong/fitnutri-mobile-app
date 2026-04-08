import { Modal as RNModal, Pressable, View } from 'react-native';

import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Text } from '@/ui/text';

type ModalProps = {
  visible: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  confirmLabel?: string;
  onConfirm?: () => void;
};

export const Modal = ({
  confirmLabel,
  description,
  onClose,
  onConfirm,
  title,
  visible,
}: ModalProps) => (
  <RNModal animationType="fade" transparent visible={visible}>
    <Pressable className="flex-1 items-center justify-center bg-black/40 px-4" onPress={onClose}>
      <Pressable>
        <Card className="w-full max-w-md gap-5 p-5">
          <View className="gap-2">
            <Text variant="heading-md">{title}</Text>
            {description ? <Text tone="muted">{description}</Text> : null}
          </View>
          <View className="flex-row gap-3">
            <Button className="flex-1" onPress={onClose} title="Close" variant="outline" />
            {confirmLabel && onConfirm ? (
              <Button className="flex-1" onPress={onConfirm} title={confirmLabel} />
            ) : null}
          </View>
        </Card>
      </Pressable>
    </Pressable>
  </RNModal>
);
