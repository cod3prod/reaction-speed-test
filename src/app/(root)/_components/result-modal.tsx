"use client";

import { ResultModalHandle } from "@/types/modal";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";
import 'animate.css';

const ResultModal = forwardRef<ResultModalHandle, { history: number[] }>(
  ({ history }, ref) => {

    const dialogRef = useRef<HTMLDialogElement>(null);
    const result = history.reduce((prev, curr) => prev + curr, 0);
    
    const [portalComponent, setPortalComponent] = useState<HTMLElement | null>(null);

    useImperativeHandle(ref, () => ({
      open: () => dialogRef.current?.showModal(),
    }));
    
    useEffect(()=>{
      setPortalComponent(document.body);
    },[])

    if (!portalComponent) {
      return null;
    }

    return createPortal(
      <dialog
        ref={dialogRef}
        className="w-full max-w-[300px] rounded-lg p-6 bg-white shadow-lg text-center animate__animated animate__zoomIn"
      >
        <form method="dialog" className="space-y-4">
          <p className="text-lg font-bold">RESULT</p>
          <p className="text-xl">{`${result / 5} ms`}</p>
          <button
            onClick={() => dialogRef.current?.close()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition"
          >
            Close
          </button>
        </form>
      </dialog>,
      document.body
    );
  }
);

ResultModal.displayName = "ResultModal";

export default ResultModal;
