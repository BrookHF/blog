'use client';

import { useState, useSyncExternalStore, type FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { siteConfig } from '@/content/site';

interface NewsletterCardProps {
  variant: 'teaser' | 'capture';
}

const STORAGE_KEY = 'scale_substance_subscribed_email';
const SUB_EVENT = 'scale_substance_sub_updated';

function subscribeEmailStore(callback: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback();
  };
  window.addEventListener('storage', onStorage);
  window.addEventListener(SUB_EVENT, callback);
  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(SUB_EVENT, callback);
  };
}

function getEmailSnapshot(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? '';
  } catch {
    return '';
  }
}

function getServerEmailSnapshot(): string {
  return '';
}

export default function NewsletterCard({ variant }: NewsletterCardProps) {
  const storedEmail = useSyncExternalStore(
    subscribeEmailStore,
    getEmailSnapshot,
    getServerEmailSnapshot
  );

  const [expanded, setExpanded] = useState(variant === 'capture');
  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const isSubscribed = Boolean(storedEmail) && !editing;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!isValid) {
      setErrorMsg('Enter a valid email address (for example, you@domain.com).');
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, trimmed);
      window.dispatchEvent(new Event(SUB_EVENT));
    } catch {
      // Ignore storage restriction
    }

    setEditing(false);
    setErrorMsg('');
    setEmail('');
  };

  if (variant === 'teaser') {
    return (
      <section
        id="newsletter"
        aria-label="Newsletter briefing"
        className="rounded-[14px] bg-[#131E29] p-5 text-white sm:p-7"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-lg">
            <p className="font-mono text-[10px] tracking-[0.12em] text-[#8FB3C0]">
              TUESDAY VISUAL BRIEFING
            </p>
            <h2 className="mt-2 font-serif text-[20px] font-bold leading-snug tracking-[-0.01em] text-white sm:text-[24px]">
              One chart, three photos, zero fluff.
            </h2>
            <p className="mt-1 font-sans text-[13px] text-[#B5C2CC]">
              Join {siteConfig.subscriberCount} independent builders.
            </p>
          </div>

          {!expanded && !isSubscribed && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 self-start rounded-full bg-[#F3EFE6] px-5 font-sans text-[12px] font-bold text-[#131E29] whitespace-nowrap transition-transform duration-150 hover:bg-white active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FB3C0] sm:self-end"
            >
              <span>Subscribe</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          )}
        </div>

        {isSubscribed ? (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#283A4B] pt-4">
            <div className="flex items-center gap-2 font-sans text-[13px] text-[#D9E2E8]">
              <Check className="h-4 w-4 shrink-0 text-[#8FB3C0]" aria-hidden="true" />
              <span>
                You&apos;re on the Tuesday Briefing list
                {storedEmail ? ` (${storedEmail})` : ''}.
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditing(true);
                setExpanded(true);
              }}
              className="font-mono text-[11px] text-[#8FB3C0] underline underline-offset-4 hover:text-white"
            >
              Change email
            </button>
          </div>
        ) : (
          expanded && (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-4 border-t border-[#283A4B] pt-4"
            >
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <label htmlFor="teaser-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="teaser-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="you@domain.com"
                  className="h-11 flex-1 rounded-[8px] bg-white px-3.5 font-sans text-[13px] text-[#141414] placeholder:text-[#7C7A74] focus:outline-2 focus:outline-offset-2 focus:outline-[#8FB3C0]"
                />
                <button
                  type="submit"
                  className="h-11 shrink-0 rounded-[8px] bg-[#4A7C8C] px-6 font-sans text-[13px] font-bold text-white whitespace-nowrap transition-colors duration-150 hover:bg-[#598F9F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Join Briefing
                </button>
              </div>
              {errorMsg && (
                <p role="alert" className="mt-2 font-sans text-[12px] text-[#F1B793]">
                  {errorMsg}
                </p>
              )}
            </form>
          )
        )}
      </section>
    );
  }

  return (
    <section
      aria-label="Subscribe to next issue"
      className="rounded-[14px] bg-[#131E29] p-5 text-white sm:p-7"
    >
      <p className="font-mono text-[10px] tracking-[0.12em] text-[#8FB3C0]">
        {siteConfig.nextIssueLabel}
      </p>
      <h2 className="mt-2 font-serif text-[21px] font-bold leading-snug tracking-[-0.01em] text-white sm:text-[25px]">
        Get visual essays in your inbox.
      </h2>
      <p className="mt-1 font-sans text-[13px] text-[#B5C2CC]">
        More charts &amp; photos, fewer walls of text.
      </p>

      {isSubscribed ? (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-[8px] border border-[#2D4152] bg-[#1A2836] px-4 py-3">
          <div className="flex items-center gap-2 font-sans text-[13px] text-[#F3EFE6]">
            <Check className="h-4 w-4 shrink-0 text-[#8FB3C0]" aria-hidden="true" />
            <span>
              Confirmed — Issue 05 will arrive at{' '}
              <span className="font-mono text-[#8FB3C0]">{storedEmail}</span>.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="font-mono text-[11px] text-[#8FB3C0] underline underline-offset-4 hover:text-white"
          >
            Update
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-5">
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <label htmlFor="post-read-email" className="sr-only">
              Email address
            </label>
            <input
              id="post-read-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="you@domain.com"
              className="h-11 flex-1 rounded-[8px] bg-white px-3.5 font-sans text-[13px] text-[#141414] placeholder:text-[#7C7A74] focus:outline-2 focus:outline-offset-2 focus:outline-[#8FB3C0]"
            />
            <button
              type="submit"
              className="h-11 shrink-0 rounded-[8px] bg-[#4A7C8C] px-7 font-sans text-[13px] font-bold text-white whitespace-nowrap transition-colors duration-150 hover:bg-[#5A8E9E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Join
            </button>
          </div>
          {errorMsg && (
            <p role="alert" className="mt-2 font-sans text-[12px] text-[#F1B793]">
              {errorMsg}
            </p>
          )}
        </form>
      )}
    </section>
  );
}
