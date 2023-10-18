import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import ErrorPage from "./error-page";
import Tarefa, { loader as tarefaLoader, action as tarefaAction, } from "./routes/tarefa";
import Root, { loader as rootLoader, action as rootAction, } from "./routes/root";
import EditTarefa, { action as editAction, } from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes/index";
import Deletar from './routes/deletar';
import { Editar } from './routes/editar';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "tarefas/:tarefaId",
            element: <Tarefa />,
            loader: tarefaLoader,
            action: tarefaAction,
          },
          /* the rest of the routes */
        ],
      },
      { index: true, element: <Index /> },
      {
        path: "tarefas/:tarefaId/:deletar/tarefaId",
        element: <Tarefa />,
        loader: tarefaLoader,
        action: tarefaAction,
      },
      {
        path: "tarefas/:tarefaId/edit",
        element: <EditTarefa />,
        loader: tarefaLoader,
        action: editAction,
      },
      {
        path: "tarefas/:tarefaId/:deletar/destroy",
        action: destroyAction,
        errorElement: <div>Oops! There was an error.</div>,
      },
      {
        path: "tarefas/:tarefaId/Editar/edit",
        element: <EditTarefa />,
        loader: tarefaLoader,
        action: editAction,
      },
      {
        path: "tarefas/:tarefaId/deletar",
        element: <Deletar />,
      },
      {
        path: "tarefas/:tarefaId/Editar",
        element: <Editar />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
