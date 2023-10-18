import React from 'react'
import { Form, useNavigate } from "react-router-dom";

export default function Deletar() {
    const navigate = useNavigate();

    return (
        <div>
            Deseja excluir ?
            <Form
                method="post"
                action="destroy"
            >
                <button type="submit">
                    Simm
                </button>
            </Form>
            <Form action="tarefaId">
                <button type="button"
                    onClick={() => {
                        navigate(-1);
                    }}>Não</button>
            </Form>
        </div>
    )
}