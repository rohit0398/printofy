import { Waveform } from '@uiball/loaders'

export function Loader({ page }: { page?: boolean }) {
  return (
    <div
      className={`${
        page ? "fixed" : "absolute"
      } inset-0 z-50 flex items-center justify-center bg-black/70`}
    >
      <Waveform  size={112} color='#FFFFFF' lineWeight={10}/>
    </div>
  );
}
