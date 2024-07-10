import { Link2, Plus } from "lucide-react";
import { Button } from "../../../components/Button";
import { MouseEvent, useState } from "react";
import { Toast } from "../../../components/Toast";

export function ImportantLinks() {
  const [toastVisible, setToastVisible] = useState(false);
  const [copyUrl, setCopyUrl] = useState(false);

  const handleCopyToClipboard = (event: MouseEvent<HTMLButtonElement>) => {
    const url = event.currentTarget.getAttribute('data-url');
    if (url) {
      navigator.clipboard.writeText(url)
        .then(() => {
          setToastVisible(true);
          setCopyUrl(true);
          setTimeout(() => {
            setToastVisible(false);
            setCopyUrl(false);
          }, 1500); // Mostra o toast por 1.5 segundos
        })
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4 relative">
          <div className="space-y-1.5 flex-1">
            <span className="block font-medium text-zinc-100">Reserva do AirBNB</span>
            <a href="#" className="block text-sm text-zinc-400 truncate transition-colors duration-300 hover:text-zinc-200">https://www.airbnb.com.br/rooms/104700011104700011</a>
          </div>
          <Toast visible={toastVisible}>URL copiada</Toast>
          <Button
            variant="blank"
            size="blank"
            onClick={handleCopyToClipboard}
            data-url="https://www.airbnb.com.br/rooms/104700011104700011"
            disabled={copyUrl}
          >
            <Link2 className="size-5 text-zinc-400 transition-colors duration-300 hover:text-zinc-200" />
          </Button>
        </div>
      </div>

      <Button variant="secondary" size="full">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  )
}