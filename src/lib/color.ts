const splitChannels = (color: string) => color.trim().split(/\s+/);

export const toRgb = (color: string) => {
  const channels = splitChannels(color);

  if (channels.length !== 3) {
    return color;
  }

  return `rgb(${channels[0]}, ${channels[1]}, ${channels[2]})`;
};

export const toRgba = (color: string, alpha: number) => {
  const channels = splitChannels(color);

  if (channels.length !== 3) {
    return color;
  }

  return `rgba(${channels[0]}, ${channels[1]}, ${channels[2]}, ${alpha})`;
};
