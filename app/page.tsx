import AvatarCreator from '@/app/_components/AvatarCreator';

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ background: '#5a6075' }}
    >
      <AvatarCreator />
    </main>
  );
}
