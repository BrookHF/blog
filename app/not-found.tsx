import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl rounded-[12px] border border-[#CFC9BC] bg-[#E7E2D6] p-8 text-center">
      <p className="font-mono text-[11px] tracking-[0.09em] text-[#5A5750]">
        ISSUE NOT FOUND
      </p>
      <h1 className="mt-2 font-serif text-[28px] font-bold text-[#141414]">
        This visual brief does not exist yet.
      </h1>
      <p className="mt-2 font-sans text-[14px] text-[#5A5750]">
        Return to the Visual Feed to browse all published essays and charts.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex h-10 items-center gap-2 rounded-full bg-[#131E29] px-5 font-sans text-[12.5px] font-bold text-[#F3EFE6] hover:bg-[#1E2E3E]"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Back to Visual Feed</span>
      </Link>
    </section>
  );
}
