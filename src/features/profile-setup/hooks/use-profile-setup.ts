import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { ROUTES } from '@/constants/routes';
import {
  profileStep1Schema,
  profileStep2Schema,
  profileStep3Schema,
  profileStep4Schema,
  type ProfileStep1Values,
  type ProfileStep2Values,
  type ProfileStep3Values,
  type ProfileStep4Values,
} from '@/features/profile-setup/schema';
import { useAuthStore } from '@/store/auth-store';
import { useProfileSetupStore } from '@/store/profile-setup-store';

const nextStepRoute = {
  'step-1': ROUTES.profileSetup2,
  'step-2': ROUTES.profileSetup3,
  'step-3': ROUTES.profileSetup4,
} as const;

const previousStepRoute = {
  'step-2': ROUTES.profileSetup1,
  'step-3': ROUTES.profileSetup2,
  'step-4': ROUTES.profileSetup3,
} as const;

export const useProfileSetup = (step: 'step-1' | 'step-2' | 'step-3' | 'step-4') => {
  const hydrate = useProfileSetupStore((state) => state.hydrate);
  const hydrated = useProfileSetupStore((state) => state.hydrated);
  const draft = useProfileSetupStore((state) => state.draft);
  const patchDraft = useProfileSetupStore((state) => state.patchDraft);
  const resetDraft = useProfileSetupStore((state) => state.resetDraft);
  const completeProfile = useAuthStore((state) => state.completeProfile);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  const step1Form = useForm<ProfileStep1Values>({
    defaultValues: {
      fullName: draft.fullName,
      age: draft.age ?? 25,
      gender: draft.gender,
      heightCm: draft.heightCm ?? 170,
      weightKg: draft.weightKg ?? 65,
    },
    resolver: zodResolver(profileStep1Schema),
  });

  const step2Form = useForm<ProfileStep2Values>({
    defaultValues: {
      goal: draft.goal,
      activityLevel: draft.activityLevel,
      workoutsPerWeek: draft.workoutsPerWeek,
      workoutMinutes: draft.workoutMinutes,
      trainingTypes: draft.trainingTypes,
    },
    resolver: zodResolver(profileStep2Schema),
  });

  const step3Form = useForm<ProfileStep3Values>({
    defaultValues: {
      allergies: draft.allergies,
      dislikedFoods: draft.dislikedFoods,
      dietStyle: draft.dietStyle,
      favoriteMeals: draft.favoriteMeals,
      avoidMeals: draft.avoidMeals,
    },
    resolver: zodResolver(profileStep3Schema),
  });

  const step4Form = useForm<ProfileStep4Values>({
    defaultValues: {
      dailyCalories: draft.dailyCalories,
      proteinGrams: draft.proteinGrams,
      carbsGrams: draft.carbsGrams,
      fatGrams: draft.fatGrams,
    },
    resolver: zodResolver(profileStep4Schema),
  });

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    step1Form.reset({
      fullName: draft.fullName,
      age: draft.age ?? 25,
      gender: draft.gender,
      heightCm: draft.heightCm ?? 170,
      weightKg: draft.weightKg ?? 65,
    });
    step2Form.reset({
      goal: draft.goal,
      activityLevel: draft.activityLevel,
      workoutsPerWeek: draft.workoutsPerWeek,
      workoutMinutes: draft.workoutMinutes,
      trainingTypes: draft.trainingTypes,
    });
    step3Form.reset({
      allergies: draft.allergies,
      dislikedFoods: draft.dislikedFoods,
      dietStyle: draft.dietStyle,
      favoriteMeals: draft.favoriteMeals,
      avoidMeals: draft.avoidMeals,
    });
    step4Form.reset({
      dailyCalories: draft.dailyCalories,
      proteinGrams: draft.proteinGrams,
      carbsGrams: draft.carbsGrams,
      fatGrams: draft.fatGrams,
    });
  }, [draft, hydrated, step1Form, step2Form, step3Form, step4Form]);

  const handleNext = {
    'step-1': step1Form.handleSubmit(async (values) => {
      await patchDraft(values);
      router.push(nextStepRoute['step-1']);
    }),
    'step-2': step2Form.handleSubmit(async (values) => {
      await patchDraft(values);
      router.push(nextStepRoute['step-2']);
    }),
    'step-3': step3Form.handleSubmit(async (values) => {
      await patchDraft(values);
      router.push(nextStepRoute['step-3']);
    }),
    'step-4': step4Form.handleSubmit(async (values) => {
      await patchDraft(values);
      await completeProfile();
      await resetDraft();
      router.replace(ROUTES.dashboard);
    }),
  } as const;

  const handleBack = () => {
    if (step === 'step-1') {
      router.back();
      return;
    }

    router.push(previousStepRoute[step]);
  };

  return {
    hydrated,
    draft,
    forms: {
      step1Form,
      step2Form,
      step3Form,
      step4Form,
    },
    handleBack,
    handleNext: handleNext[step],
  };
};
