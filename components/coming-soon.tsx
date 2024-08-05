import { Rocket } from 'lucide-react';

export default function ComingSoon() {
  return (
    <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2 py-40">
      <Rocket size={72} />
      <h1 className="text-4xl font-bold leading-tight">Coming Soon</h1>
      <div className="text-center text-muted-foreground">
        Trang này vẫn chưa được tạo.
      </div>
    </div>
  );
}
