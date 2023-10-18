import React from 'react'
import { Form, useNavigate } from "react-router-dom";

export const Editar = () => {
    const navigate = useNavigate();
    return (
        <div>
            Deseja editar ?
            <Form
                //method="post"
                action="edit"
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
