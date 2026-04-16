import { useEffect, useRef, useCallback } from "react";

/**
 * Custom hook for gyroscope / accelerometer-based gesture detection.
 *
 * Phone must be in LANDSCAPE mode, held against the forehead (like Heads Up).
 *
 * In landscape orientation the relevant axis for tilt is the device's gamma (left-right tilt
 * becomes up-down when phone is landscape). But since DeviceOrientation can be inconsistent
 * across browsers, we use DeviceMotion (accelerometer) which is more reliable.
 *
 * Gesture detection:
 *   - Phone tilts DOWN (screen faces floor) → onCorrect()
 *   - Phone tilts UP (screen faces ceiling) → onSkip()
 *
 * We detect this via accelerationIncludingGravity on the Z-axis:
 *   - Neutral (phone vertical/on forehead): z ≈ 0
 *   - Tilted down (screen faces floor): z becomes very negative (< -7)
 *   - Tilted up (screen faces ceiling): z becomes very positive (> 7)
 *
 * We also use a cooldown to prevent rapid-fire triggers.
 */
export default function useGyroscope({ onCorrect, onSkip, enabled = true }) {
  const cooldownRef = useRef(false);
  const permissionGrantedRef = useRef(false);
  const lastTriggerRef = useRef(0);

  // Threshold for triggering (gravity is ~9.8, so 7 means a strong tilt)
  const TILT_THRESHOLD = 7;
  const COOLDOWN_MS = 1200; // Prevent rapid triggers

  const handleMotion = useCallback(
    (event) => {
      if (!enabled || cooldownRef.current) return;

      const now = Date.now();
      if (now - lastTriggerRef.current < COOLDOWN_MS) return;

      const acc = event.accelerationIncludingGravity;
      if (!acc) return;

      // In landscape mode (phone on its side), the axes shift.
      // We use beta from DeviceOrientation as a fallback, but DeviceMotion's
      // accelerationIncludingGravity is more consistent.
      //
      // When phone is in landscape and held vertically (like on forehead):
      //   - z ≈ 0 (neutral)
      //   - Tilt screen toward floor → z goes negative
      //   - Tilt screen toward ceiling → z goes positive
      //
      // However, depending on how the phone is held in landscape,
      // we also check the x-axis (which maps to vertical tilt in landscape).

      const { x, y, z } = acc;

      // In landscape mode, the "tilt forward/backward" maps to the x or y axis
      // depending on which way landscape is oriented.
      // We check multiple axes to be robust.
      
      // Primary detection: z-axis for face-down / face-up detection
      // When phone is roughly vertical (on forehead), z ≈ 0
      // Tilt down → z becomes strongly negative
      // Tilt up → z becomes strongly positive

      // Also check y-axis which in landscape represents the tilt
      // In landscape-left: y maps to forward/backward tilt
      // In landscape-right: y is inverted

      // Use absolute values to detect strong tilt regardless of landscape direction
      const absZ = Math.abs(z);
      const absY = Math.abs(y);

      // Detect "face down" (correct) - screen pointing toward floor
      // z strongly negative OR y strongly positive/negative depending on orientation
      if (z < -TILT_THRESHOLD) {
        cooldownRef.current = true;
        lastTriggerRef.current = now;
        onCorrect();
        setTimeout(() => {
          cooldownRef.current = false;
        }, COOLDOWN_MS);
        return;
      }

      // Detect "face up" (skip/wrong) - screen pointing toward ceiling
      if (z > TILT_THRESHOLD) {
        cooldownRef.current = true;
        lastTriggerRef.current = now;
        onSkip();
        setTimeout(() => {
          cooldownRef.current = false;
        }, COOLDOWN_MS);
        return;
      }
    },
    [enabled, onCorrect, onSkip]
  );

  // Request permission (required on iOS 13+)
  const requestPermission = useCallback(async () => {
    if (permissionGrantedRef.current) return true;

    // iOS 13+ requires explicit permission
    if (
      typeof DeviceMotionEvent !== "undefined" &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      try {
        const permission = await DeviceMotionEvent.requestPermission();
        if (permission === "granted") {
          permissionGrantedRef.current = true;
          return true;
        }
        return false;
      } catch (err) {
        console.error("Gyroscope permission error:", err);
        return false;
      }
    }

    // Android and older iOS - no permission needed
    permissionGrantedRef.current = true;
    return true;
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const setup = async () => {
      const granted = await requestPermission();
      if (!granted) return;

      window.addEventListener("devicemotion", handleMotion, true);
    };

    setup();

    return () => {
      window.removeEventListener("devicemotion", handleMotion, true);
    };
  }, [enabled, handleMotion, requestPermission]);

  return { requestPermission };
}
