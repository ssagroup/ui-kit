import { PointerEvent, RefObject, useEffect, useRef, useState } from 'react';
import { getHeaderCells } from '@components/Table/utils';

/** A drag in progress: the column held, and the column it would drop on. */
export interface ColumnDrag {
  id: string;
  overId: string | null;
}

interface UseColumnReorderOptions {
  tableRef: RefObject<HTMLTableElement | null>;
  /** Whether `id` may be dropped where `targetId` is. */
  canDrop: (id: string, targetId: string) => boolean;
  onDrop: (id: string, targetId: string) => void;
}

const setDragCursor = (active: boolean) => {
  const { style } = document.body;
  style.cursor = active ? 'grabbing' : '';
  style.userSelect = active ? 'none' : '';
};

/**
 * Drag-to-reorder for header grips. The pointer is captured by the grip, and
 * the drop target is whichever header cell is under it horizontally, so the
 * pointer can wander above or below the header. Escape cancels.
 *
 * State changes only when the target does, not on every move, so a drag
 * re-renders the table a handful of times rather than once per frame.
 */
export const useColumnReorder = ({
  tableRef,
  canDrop,
  onDrop,
}: UseColumnReorderOptions) => {
  const [drag, setDrag] = useState<ColumnDrag | null>(null);
  const dragRef = useRef<ColumnDrag | null>(null);
  const update = (next: ColumnDrag | null) => {
    dragRef.current = next;
    setDrag(next);
  };

  const end = () => {
    if (!dragRef.current) return;
    update(null);
    setDragCursor(false);
  };

  const dragging = drag !== null;
  useEffect(() => {
    if (!dragging) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      dragRef.current = null;
      setDrag(null);
      setDragCursor(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [dragging]);

  useEffect(() => () => setDragCursor(false), []);

  const getGripProps = (id: string) => ({
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      // Primary button only.
      if (event.button !== 0) return;
      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      update({ id, overId: null });
      setDragCursor(true);
    },
    onPointerMove: (event: PointerEvent<HTMLElement>) => {
      const current = dragRef.current;
      if (current?.id !== id) return;
      const cell = getHeaderCells(tableRef.current).find((header) => {
        const { left, right } = header.getBoundingClientRect();
        return event.clientX >= left && event.clientX < right;
      });
      const targetId = cell?.dataset.columnId;
      const overId =
        targetId !== undefined && targetId !== id && canDrop(id, targetId)
          ? targetId
          : null;
      if (overId !== current.overId) update({ id, overId });
    },
    onPointerUp: () => {
      const current = dragRef.current;
      end();
      if (current?.overId) onDrop(current.id, current.overId);
    },
    onPointerCancel: end,
    // Capture can be lost without a pointerup, e.g. when the grip unmounts.
    onLostPointerCapture: end,
  });

  return { drag, getGripProps };
};
