import { Program } from "$objects/shared/program/Program";
import { Window } from "$objects/shared/program/Window";
import { writable, Writable } from "svelte/store";
import { getCategoryByName, categoryFavourites } from "$stores/shared/CategoriesStore";
import { Category } from "$objects/shared/program/Category";
import  BrowserContent from "$components/desktop/window/content/browser/BrowserContent.svelte";

let _programsStore: Array<Program> = [];
export const programsStore: Writable<Array<Program>> = writable([
    new Program(
        'Croma',
        'Official website for the Croma Robot made in Webots.',
        [getCategoryByName(Category.Name.CATEGORY_1), categoryFavourites],
        '/images/program-icons/croma.png',
        new Window(BrowserContent, { title: 'Croma', url: 'https://jitzek.github.io/croma-web-site/' }, 800, 1000)
    ),
    new Program(
        'LocalHost 3000',
        '',
        [getCategoryByName(Category.Name.CATEGORY_2)],
        '/images/program-icons/utilities-terminal.svg',
        new Window(BrowserContent, { title: 'Croma', url: 'http://localhost:3000/' }, 800, 600)
    )
]);
programsStore.subscribe(programs => _programsStore = programs);

export function addProgram(program: Program) {
    programsStore.update(programs => programs.concat(program));
}

export function removeProgram(program: Program) {
    programsStore.update(programs => {
        programs.splice(programs.indexOf(program), 1);
        return programs;
    });
}

export function removeProgramById(id: number) {
    programsStore.update(programs => programs.filter(program => program.id !== id));
}

export function getProgramById(id: number): Program | undefined {
    return _programsStore.find(_program => _program.id === id);
}