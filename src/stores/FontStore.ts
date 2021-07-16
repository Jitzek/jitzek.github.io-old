import { Font } from "$components/shared/Font";
import { writable, Writable } from "svelte/store";

export const font: Writable<Font> = writable(Font.Default);