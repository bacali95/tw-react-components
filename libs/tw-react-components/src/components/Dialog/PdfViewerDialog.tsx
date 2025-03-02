import type { FC, ReactNode } from 'react';

import { Dialog } from './Dialog';

type Props = {
  open: boolean;
  title: ReactNode;
  url?: string;
  data?: string;
  onClose: () => void;
  dataTestId?: string;
};

export const PdfViewerDialog: FC<Props> = ({
  open,
  title,
  url,
  data,
  onClose,
  dataTestId = 'pdf-viewer-dialog',
}) => {
  return !(url || data) ? null : (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <Dialog.Content className="h-[95dvh] max-w-[95dvw]" dataTestId={`${dataTestId}-content`}>
        <Dialog.Header dataTestId={`${dataTestId}-header`}>
          <Dialog.Title dataTestId={`${dataTestId}-title`}>{title}</Dialog.Title>
        </Dialog.Header>
        {(url || data) && (
          <embed
            className="rounded-lg"
            src={url ?? `data:application/pdf;base64,${data}`}
            type="application/pdf"
            width="100%"
            height="100%"
            data-testid={`${dataTestId}-embed`}
          />
        )}
      </Dialog.Content>
    </Dialog>
  );
};
