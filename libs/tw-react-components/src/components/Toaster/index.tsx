import { useToast } from '../../hooks';
import { Toast } from '../Toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <Toast.Provider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast.Root key={id} {...props}>
            <div className="grid gap-1">
              {title && <Toast.Title>{title}</Toast.Title>}
              {description && <Toast.Description>{description}</Toast.Description>}
            </div>
            {action}
            <Toast.Close />
          </Toast.Root>
        );
      })}
      <Toast.Viewport />
    </Toast.Provider>
  );
}
