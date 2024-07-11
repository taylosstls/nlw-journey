import { useLottie } from "lottie-react";

import animationData from '../../assets/not-found.json';

export function NotFoundAnimation() {

  const options = {
    animationData: animationData,
    loop: true
  };

  const { View } = useLottie(options);

  return <>{View}</>;
};