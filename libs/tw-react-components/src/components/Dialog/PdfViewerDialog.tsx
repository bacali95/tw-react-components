import { FC, ReactNode } from 'react';

import { Dialog } from './Dialog';

type Props = {
  open: boolean;
  title: ReactNode;
  url?: string;
  data?: string;
  onClose: () => void;
};

export const PdfViewerDialog: FC<Props> = ({ open, title, url, data, onClose }) => {
  return !(url || data) ? null : (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <Dialog.Content className="h-[95dvh] max-w-[95dvw]">
        <Dialog.Header>
          <Dialog.Title>{title}</Dialog.Title>
        </Dialog.Header>
        {(url || data) && (
          <embed
            className="rounded-lg"
            src={url ?? `data:application/pdf;base64,${data}`}
            type="application/pdf"
            width="100%"
            height="100%"
          />
        )}
      </Dialog.Content>
    </Dialog>
  );
};
