import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {sepolia} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'DecentralizedGit',
  projectId: '32110548f0474ada3eb5fd01ca44720a',
  chains: [
    sepolia,
   // ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
});