import {
   FirstIcon,
   FirstSpotImage,
   SecondIcon,
   SecondSpotImage,
   ThirdIcon,
   ThirdSpotImage,
} from '../../../../assets/icons/features'

export const FEATURES = [
   {
      id: 'zap',
      title: 'Zap any event',
      description:
         'Zapper can zap any event, not just the one supported by your client.',
      background: FirstSpotImage,
      icon: <FirstIcon />,
   },
   {
      id: 'support',
      title: 'Supports zap splits',
      description:
         'Pay a group of people, or a giant pool of hundreds of people.',
      background: SecondSpotImage,
      icon: <SecondIcon />,
   },
   {
      id: 'about',
      title: 'Integrates with other apps',
      description:
         'Just redirect to zapper or embed within your app as an iframe.',
      background: ThirdSpotImage,
      icon: <ThirdIcon />,
   },
]
