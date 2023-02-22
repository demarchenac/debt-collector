import type { RefObject } from "react";
import { useEffect } from "react";

/**
 * Node assertion
 * @param e Mouse event
 */
function assertIsNode(e: EventTarget | null): asserts e is Node {
  if (!e || !("nodeType" in e)) {
    throw new Error(`Node expected`);
  }
}

export function useOutsideClickWatcher(
  inRef: boolean,
  ref: RefObject<HTMLInputElement>,
  callback: () => void,
  optionalRef?: RefObject<HTMLInputElement>,
  { comesFromDatepicker = false }: { comesFromDatepicker: boolean } = {
    comesFromDatepicker: false,
  }
) {
  useEffect(() => {
    // "click" event handler
    const handleOutsideClick = (event: MouseEvent) => {
      if (!ref.current) {
        return;
      }

      assertIsNode(event.target);

      const targetIsRef = ref.current.contains(event.target);

      if (inRef && !targetIsRef) {
        if (!optionalRef) {
          callback();
        } else {
          const previousMonth = document.getElementById(
            "datepicker-nav-previous"
          );
          const nextMonth = document.getElementById("datepicker-nav-next");

          const targetAsHTMLElement = event.target as HTMLElement;

          const isPreviousMonth =
            targetAsHTMLElement.id === "datepicker-nav-previous";
          const isNextMonth = targetAsHTMLElement.id === "datepicker-nav-next";

          const optionalContainsPreviousMonth =
            previousMonth &&
            optionalRef.current &&
            optionalRef.current.contains(previousMonth);

          const optionalContainsNextMont =
            nextMonth &&
            optionalRef.current &&
            optionalRef.current.contains(nextMonth);

          const isNavigationButton =
            comesFromDatepicker &&
            (isPreviousMonth || isNextMonth) &&
            optionalContainsPreviousMonth &&
            optionalContainsNextMont;

          const targetIsOptionalRef =
            optionalRef.current && optionalRef.current.contains(event.target);

          if (!targetIsOptionalRef && !isNavigationButton) {
            callback();
          }
        }
      }
    };

    // Event listener
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [ref, inRef, callback, comesFromDatepicker, optionalRef]);
}
