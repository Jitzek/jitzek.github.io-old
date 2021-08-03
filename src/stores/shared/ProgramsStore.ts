import type { Program } from "$components/shared/program/Program";
import { writable, Writable } from "svelte/store";

export const programsStore: Writable<Array<Program>> = writable([]);