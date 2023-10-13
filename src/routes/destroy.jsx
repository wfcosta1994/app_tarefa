import { redirect } from "react-router-dom";
import { deleteTarefa } from "../tarefas";

export async function action({ params }) {
    await deleteTarefa(params.tarefaId);
    return redirect("/");
}