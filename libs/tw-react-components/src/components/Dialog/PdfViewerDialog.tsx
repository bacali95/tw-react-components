import { FC } from 'react';

import { Dialog, DialogProps } from './Dialog';

export const PdfViewerDialog: FC<
  { url?: string; data?: string } & Pick<DialogProps, 'title' | 'open' | 'onClose'>
> = ({ url, data, ...props }) => {
  return !(url || data) ? null : (
    <Dialog size="5xl" {...props}>
      <div style={{ height: '80vh' }}>
        {(url || data) && (
          <embed
            className="rounded-lg"
            src={url ?? `data:application/pdf;base64,${data}`}
            type="application/pdf"
            width="100%"
            height="100%"
          />
        )}
      </div>
    </Dialog>
  );
};
