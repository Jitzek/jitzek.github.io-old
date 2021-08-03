import { Theme } from "$components/shared/Theme";
import { writable, Writable } from "svelte/store";

export const theme: Writable<Theme> = writable(Theme.Dark);