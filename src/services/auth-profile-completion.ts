type ApiProfile = Record<string, unknown> | null | undefined;

const explicitCompletionFields = [
  'isProfileCompleted',
  'profileCompleted',
  'hasCompletedProfile',
  'nutritionProfileCompleted',
] as const;

const profileResultSignalFields = [
  'targetGoal',
  'goalNormalizedInternal',
  'goalRawSemantic',
  'planningStrategy',
] as const;

const requiredProfileFields = [
  'age',
  'gender',
  'activityLevel',
] as const;

const hasValue = (value: unknown): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return value !== null && value !== undefined;
};

const hasAnyValue = (profile: ApiProfile, fields: readonly string[]): boolean => {
  if (!profile) {
    return false;
  }

  return fields.some((field) => hasValue(profile[field]));
};

const hasBodyMetrics = (profile: ApiProfile): boolean => {
  if (!profile) {
    return false;
  }

  const hasHeight = hasValue(profile.height) || hasValue(profile.heightCm);
  const hasWeight = hasValue(profile.weight) || hasValue(profile.weightKg);
  return hasHeight && hasWeight;
};

const hasRequiredProfileFields = (profile: ApiProfile): boolean => {
  if (!profile) {
    return false;
  }

  return requiredProfileFields.every((field) => hasValue(profile[field])) && hasBodyMetrics(profile);
};

export const isProfileCompletedFromApi = (...profiles: ApiProfile[]): boolean => {
  for (const profile of profiles) {
    if (!profile) {
      continue;
    }

    for (const field of explicitCompletionFields) {
      if (typeof profile[field] === 'boolean') {
        return profile[field] === true;
      }
    }
  }

  return profiles.some(
    (profile) => hasAnyValue(profile, profileResultSignalFields) || hasRequiredProfileFields(profile)
  );
};
