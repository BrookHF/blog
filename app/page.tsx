import { Suspense } from 'react';
import VisualFeedView from '@/components/VisualFeedView';

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6 py-4">
          <div className="h-8 w-64 rounded bg-[#E7E2D6]" />
          <div className="aspect-[16/9] w-full rounded-[10px] bg-[#E7E2D6]" />
        </div>
      }
    >
      <VisualFeedView />
    </Suspense>
  );
}
