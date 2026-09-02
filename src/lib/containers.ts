import type { CartItem } from "@/lib/cart";

/**
 * Container-fill model. Tires are sold by the half-container (the MOQ), so each
 * tire cart unit is one "half slot". A 40' container holds two half slots, so a
 * container can mix at most two tire models (or two halves of the same one).
 */

export type ContainerSlot = {
  id: string;
  /** Spanish label, e.g. "Goma 12R22.5". */
  label: string;
  size?: string;
  /** Tires in this half-container slot (the model's MOQ). */
  tires: number;
};

/** Slots merged by model, so two halves of the same tire read as one line. */
export type ContainerGroup = {
  label: string;
  size?: string;
  /** Combined tire count for this model inside the container. */
  tires: number;
};

export type PackedContainer = {
  /** One or two half-container slots. */
  slots: ContainerSlot[];
  /** Slots merged by model (same tire twice becomes a single entry). */
  groups: ContainerGroup[];
  /** True when both half slots are filled. */
  full: boolean;
  /** Distinct model labels inside this container (1 or 2). */
  models: string[];
  /** Estimated tire count inside this container. */
  totalTires: number;
  /** 0..100, share of the container that is filled. */
  fillPercent: number;
};

/** Only the tire lines participate in container packing. */
export function tireItems(items: CartItem[]): CartItem[] {
  return items.filter((i) => i.kind === "tire" && i.perHalf);
}

/** Expand tire lines into one slot per half-container unit, in cart order. */
function toSlots(items: CartItem[]): ContainerSlot[] {
  const slots: ContainerSlot[] = [];
  for (const item of items) {
    for (let n = 0; n < item.qty; n++) {
      slots.push({
        id: item.id,
        label: item.label,
        size: item.size,
        tires: item.perHalf ?? 0,
      });
    }
  }
  return slots;
}

/** Pack half-container slots two-per-container, keeping cart order. */
export function packContainers(items: CartItem[]): PackedContainer[] {
  const slots = toSlots(tireItems(items));
  const containers: PackedContainer[] = [];

  for (let i = 0; i < slots.length; i += 2) {
    const group = slots.slice(i, i + 2);
    const models = Array.from(new Set(group.map((s) => s.label)));
    const totalTires = group.reduce((sum, s) => sum + s.tires, 0);
    // Merge same-model halves so a single-model container shows one line.
    const groups: ContainerGroup[] = [];
    for (const s of group) {
      const existing = groups.find((g) => g.label === s.label);
      if (existing) existing.tires += s.tires;
      else groups.push({ label: s.label, size: s.size, tires: s.tires });
    }
    containers.push({
      slots: group,
      groups,
      full: group.length === 2,
      models,
      totalTires,
      fillPercent: (group.length / 2) * 100,
    });
  }

  return containers;
}

export type ContainerStats = {
  containers: PackedContainer[];
  /** Fully packed containers. */
  fullCount: number;
  /** True if the last container is only half filled. */
  hasPartial: boolean;
  /** Total tires across every tire line. */
  totalTires: number;
  /** Total half-container units. */
  totalHalves: number;
};

export function containerStats(items: CartItem[]): ContainerStats {
  const containers = packContainers(items);
  const fullCount = containers.filter((c) => c.full).length;
  const hasPartial = containers.some((c) => !c.full);
  const totalTires = containers.reduce((sum, c) => sum + c.totalTires, 0);
  const totalHalves = containers.reduce((sum, c) => sum + c.slots.length, 0);
  return { containers, fullCount, hasPartial, totalTires, totalHalves };
}
