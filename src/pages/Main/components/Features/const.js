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
      id: 'e1',
      title: 'Zap any event',
      description:
         'Zapper can zap any event, not just the one supported by your client.',
      background: FirstSpotImage,
      icon: <FirstIcon />,
   },
   {
      id: 'e2',
      title: 'Supports zap splits',
      description:
         'Pay a group of people, or a giant pool of hundreds of people.',
      background: SecondSpotImage,
      icon: <SecondIcon />,
   },
   {
      id: 'e3',
      title: 'Integrates with other apps',
      description:
         'Just redirect to zapper or embed within your app as an iframe.',
      background: ThirdSpotImage,
      icon: <ThirdIcon />,
   },
]
