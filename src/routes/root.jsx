import { useNavigation, Outlet, NavLink, useLoaderData, Form, redirect, useSubmit, } from "react-router-dom";
import { getTarefas, createTarefa } from "../tarefas";
import { useEffect } from "react";

export async function action() {
    const tarefa = await createTarefa();
    return redirect(`/tarefas/${tarefa.id}/edit`);
}
export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const tarefas = await getTarefas(q);
    return { tarefas, q };
}
export default function Root() {
    const { tarefas, q } = useLoaderData();
    const navigation = useNavigation();
    const submit = useSubmit();

    const searching =
        navigation.location &&
        new URLSearchParams(navigation.location.search).has(
            "q"
        );

    useEffect(() => {
        document.getElementById("q").value = q;
    }, [q]);

    return (
        <>
            <div id="sidebar">
                <h1>React Router Tarefas</h1>
                <div>
                    <Form id="search-form" role="search">
                        <input
                            id="q"
                            className={searching ? "loading" : ""}
                            aria-label="Search tarefas"
                            placeholder="Search"
                            type="search"
                            name="q"
                            defaultValue={q}
                            onChange={(event) => {
                                const isFirstSearch = q == null;
                                submit(event.currentTarget.form, {
                                    replace: !isFirstSearch,
                                });
                            }}
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            // hidden={true}
                            hidden={!searching}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </Form>
                    <Form method="post">
                        <button type="submit">Novo</button>
                    </Form>
                </div>
                <nav>
                    {tarefas.length ? (
                        <ul>
                            {tarefas.map((tarefa) => (
                                <li key={tarefa.id}>
                                    <NavLink
                                        to={`tarefas/${tarefa.id}`}
                                        className={({ isActive, isPending }) =>
                                            isActive
                                                ? "active"
                                                : isPending
                                                    ? "pending"
                                                    : ""
                                        }
                                    >
                                        {tarefa.first || tarefa.last ? (
                                            <>
                                                {tarefa.first} {tarefa.last}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}{" "}
                                        {tarefa.favorite && <span>★</span>}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No tarefas</i>
                        </p>
                    )}
                </nav>
            </div>
            <div id="detail" className={
                navigation.state === "loading" ? "loading" : ""
            }
            >
                <Outlet />
            </div>
        </>
    );
}