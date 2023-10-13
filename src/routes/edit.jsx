import { Form, useLoaderData, redirect, useNavigate, } from "react-router-dom";
import { updateTarefa } from "../tarefas";

export async function action({ request, params }) {
    const formData = await request.formData();
    const firstName = formData.get("first");
    const lastName = formData.get("last");
    const updates = Object.fromEntries(formData);
    updates.first; // "Some"
    updates.last; // "Name"
    await updateTarefa(params.tarefaId, updates);
    return redirect(`/tarefas/${params.tarefaId}`);
}

export default function EditTarefa() {
    const { tarefa } = useLoaderData();
    const navigate = useNavigate();

    return (
        <Form method="post" id="tarefa-form">
            <p>
                <span>Nome</span>
                <input
                    placeholder="Nome"
                    aria-label="First name"
                    type="text"
                    name="first"
                    defaultValue={tarefa.first}
                />
                <input
                    placeholder="Sobre Nome"
                    aria-label="Last name"
                    type="text"
                    name="last"
                    defaultValue={tarefa.last}
                />
            </p>
            <label>
                <span>Twitter</span>
                <input
                    type="text"
                    name="twitter"
                    placeholder="@jack"
                    defaultValue={tarefa.twitter}
                />
            </label>
            <label>
                <span>Avatar URL</span>
                <input
                    placeholder="https://example.com/avatar.jpg"
                    aria-label="Avatar URL"
                    type="text"
                    name="avatar"
                    defaultValue={tarefa.avatar}
                />
            </label>
            <label>
                <span>Nota</span>
                <textarea
                    name="notes"
                    defaultValue={tarefa.notes}
                    rows={6}
                />
            </label>
            <p>
                <button type="submit">Salvar</button>
                <button type="button"
                    onClick={() => {
                        navigate(-1);
                    }}>Cancelar</button>
            </p>
        </Form>
    );
}