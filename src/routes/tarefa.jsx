import { Form, useLoaderData, useFetcher, } from "react-router-dom";
import { getTarefa, updateTarefa } from "../tarefas";
import apagar from "../assets/delete.svg"
import editar from "../assets/editar.svg"

export async function action({ request, params }) {
    let formData = await request.formData();
    return updateTarefa(params.tarefaId, {
        favorite: formData.get("favorite") === "true",
    });
}

export async function loader({ params }) {
    const tarefa = await getTarefa(params.tarefaId);
    if (!tarefa) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }
    return { tarefa };
}

export default function Tarefa() {
    const { tarefa } = useLoaderData();

    return (
        <div id="tarefa">
            {/* <div>
                <img
                    key={tarefa.avatar}
                    src={tarefa.avatar || null}
                />
            </div> */}

            <div>
                <h1>
                    {tarefa.first || tarefa.last ? (
                        <>
                            {tarefa.first} {tarefa.last}
                        </>
                    ) : (
                        <i>Sem Nome</i>
                    )}{" "}
                    <Favorite tarefa={tarefa} />
                </h1>

                {tarefa.twitter && (
                    <p>
                        <a
                            target="_blank"
                            href={`https://twitter.com/${tarefa.twitter}`}
                        >
                            {tarefa.twitter}
                        </a>
                    </p>
                )}

                {tarefa.notes && <p>{tarefa.notes}</p>}

                <div>
                    <Form action="edit">
                        <button type="submit">
                            <img src={editar} alt="error" />
                        </button>
                    </Form>
                    <Form
                        method="post"
                        action="destroy"
                        onSubmit={(event) => {
                            if (
                                !confirm(
                                    "Please confirm you want to delete this record."
                                )
                            ) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">
                            <img src={apagar} alt="error" />
                        </button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

function Favorite({ tarefa }) {
    // yes, this is a `let` for later
    const fetcher = useFetcher();
    let favorite = tarefa.favorite;
    if (fetcher.formData) {
        favorite = fetcher.formData.get("favorite") === "true";
    }
    return (
        //<Form method="post">
        <fetcher.Form method="post">
            <button
                name="favorite"
                value={favorite ? "false" : "true"}
                aria-label={
                    favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
            >
                {favorite ? "★" : "☆"}
            </button>
        </fetcher.Form>
    );
}