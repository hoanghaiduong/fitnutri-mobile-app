import { z } from 'zod';

export const settingsSchema = z.object({
  displayName: z.string().min(2, 'Please enter at least 2 characters.'),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;
