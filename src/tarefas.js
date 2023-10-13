import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getTarefas(query) {
    await fakeNetwork(`getTarefas:${query}`);
    let tarefas = await localforage.getItem("tarefas");
    if (!tarefas) tarefas = [];
    if (query) {
        tarefas = matchSorter(tarefas, query, { keys: ["first", "last"] });
    }
    return tarefas.sort(sortBy("last", "createdAt"));
}

export async function createTarefa() {
    await fakeNetwork();
    let id = Math.random().toString(36).substring(2, 9);
    let tarefa = { id, createdAt: Date.now() };
    let tarefas = await getTarefas();
    tarefas.unshift(tarefa);
    await set(tarefas);
    return tarefa;
}

export async function getTarefa(id) {
    await fakeNetwork(`tarefa:${id}`);
    let tarefas = await localforage.getItem("tarefas");
    let tarefa = tarefas.find(tarefa => tarefa.id === id);
    return tarefa ?? null;
}

export async function updateTarefa(id, updates) {
    await fakeNetwork();
    let tarefas = await localforage.getItem("tarefas");
    let tarefa = tarefas.find(tarefa => tarefa.id === id);
    if (!tarefa) throw new Error("No tarefa found for", id);
    Object.assign(tarefa, updates);
    await set(tarefas);
    return tarefa;
}

export async function deleteTarefa(id) {
    let tarefas = await localforage.getItem("tarefas");
    let index = tarefas.findIndex(tarefa => tarefa.id === id);
    if (index > -1) {
        tarefas.splice(index, 1);
        await set(tarefas);
        return true;
    }
    return false;
}

function set(tarefas) {
    return localforage.setItem("tarefas", tarefas);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
    if (!key) {
        fakeCache = {};
    }

    if (fakeCache[key]) {
        return;
    }

    fakeCache[key] = true;
    return new Promise(res => {
        setTimeout(res, Math.random() * 800);
    });
}