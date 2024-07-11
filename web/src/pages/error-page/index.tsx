import { ArrowLeft } from 'lucide-react';
import { Link, useRouteError } from 'react-router-dom';
import { NotFoundAnimation } from './not-found-animation';

interface RouteError {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-pattern">
      <div className="max-w-lg mx-auto text-center p-8">
        <div className='max-w-64 mx-auto pb-4'>
          <NotFoundAnimation />
        </div>
        <h1 className="text-4xl font-bold text-zinc-200 mb-5">
          Oops! Viagem não encontrada
        </h1>
        <p className="text-lg text-zinc-400 mb-8">
          A viagem que você está procurando pode ter sido removida, renomeada ou
          está temporariamente indisponível.
        </p>
        <Link
          to="/"
          className="bg-lime-300 text-lime-950 rounded-lg px-5 h-12 font-medium flex justify-center items-center gap-2 hover:bg-lime-400 transition-colors duration-300"
        >
          <ArrowLeft className="size-5" />
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
}
