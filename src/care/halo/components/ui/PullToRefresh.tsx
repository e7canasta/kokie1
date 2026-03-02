/**
 * Component - PullToRefresh
 * Implementa pull-to-refresh para mobile
 */

import { ReactNode, useRef, useState, useEffect } from "react";

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh: () => Promise<void> | void;
  threshold?: number;
}

export function PullToRefresh({
  children,
  onRefresh,
  threshold = 80,
}: PullToRefreshProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef<number>(0);
  const currentY = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (container.scrollTop === 0) {
        startY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (startY.current === 0) return;
      
      currentY.current = e.touches[0].clientY;
      const distance = currentY.current - startY.current;

      if (distance > 0 && container.scrollTop === 0) {
        e.preventDefault();
        const pullAmount = Math.min(distance * 0.5, threshold * 1.5);
        setPullDistance(pullAmount);
      }
    };

    const handleTouchEnd = async () => {
      if (pullDistance >= threshold && !isRefreshing) {
        setIsRefreshing(true);
        await onRefresh();
        setIsRefreshing(false);
      }
      setPullDistance(0);
      startY.current = 0;
      currentY.current = 0;
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [pullDistance, threshold, isRefreshing, onRefresh]);

  const pullProgress = Math.min(pullDistance / threshold, 1);
  const shouldShowIndicator = pullDistance > 0 || isRefreshing;

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        height: "100%",
        overflow: "auto",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* Pull to refresh indicator */}
      {shouldShowIndicator && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            padding: "12px",
            opacity: pullProgress,
            transition: isRefreshing ? "none" : "opacity 0.2s",
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              border: "3px solid #2E7D6F",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: isRefreshing ? "spin 0.8s linear infinite" : "none",
            }}
          />
        </div>
      )}

      <div
        style={{
          transform: `translateY(${Math.max(0, pullDistance)}px)`,
          transition: isRefreshing ? "none" : "transform 0.2s ease-out",
        }}
      >
        {children}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
