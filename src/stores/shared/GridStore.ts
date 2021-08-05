import type { Program } from "$components/shared/program/Program";
import { writable, Writable } from "svelte/store";

export let gridStore: Writable<Array<Program>> = writable([]);