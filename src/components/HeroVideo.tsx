"use client";

import { useSyncExternalStore } from "react";

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
};

function getConnection() {
  return (navigator as Navigator & { connection?: NetworkInformation }).connection;
}

function subscribe(onChange: () => void) {
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  motionQuery.addEventListener("change", onChange);
  const connection = getConnection();
  connection?.addEventListener?.("change", onChange);
  return () => {
    motionQuery.removeEventListener("change", onChange);
    connection?.removeEventListener?.("change", onChange);
  };
}

function getSnapshot() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const connection = getConnection();
  const isDataSaver =
    connection?.saveData === true ||
    connection?.effectiveType === "slow-2g" ||
    connection?.effectiveType === "2g";
  return !prefersReducedMotion && !isDataSaver;
}

function getServerSnapshot() {
  return false;
}

export default function HeroVideo() {
  const canPlayVideo = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero-video-poster.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      {canPlayVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-video-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/hero-loop.mp4" type="video/mp4" />
        </video>
      )}
    </>
  );
}
